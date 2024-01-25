import { GraphQLClient, gql } from "graphql-request";
import { Client } from "graphql-ws";
import { createStore, useStore } from "zustand";
import { getEntityIdFromKeys } from "@dojoengine/utils";

import { PlayerEntity } from "@/dojo/queries/usePlayerEntity";
import {
  World__EntityEdge,
  Player,
  Drug,
  Item,
  PlayerEntityDocument,
  PlayerEntityRelatedDataSubscriptionDocument,
  PlayerEntityQuery,
  PlayerEntitySubscriptionDocument,
  World__Subscription,
  Encounter,
  MarketPacked,
} from "@/generated/graphql";
import { isUint16Array } from "util/types";
import { useRef, createContext, useContext } from "react";

export const PlayerContext = createContext<PlayerStore | null>(null);

///////////////////////////////////////

type PlayerStoreProviderProps = React.PropsWithChildren<BearProps>;

export const PlayerStoreProvider = ({ children, ...props }: PlayerStoreProviderProps) => {
  const storeRef = useRef<PlayerStore>();
  if (!storeRef.current) {
    storeRef.current = createPlayerStore(props);
  }
  return <PlayerContext.Provider value={storeRef.current}>{children}</PlayerContext.Provider>;
};

///////////////////////////////////////

export const usePlayerStore = () : PlayerStore => {
  const store = useContext(PlayerContext);
  if (!store) throw new Error("Missing PlayerContext.Provider in the tree");
  return useStore<PlayerStore>(store);
};

///////////////////////////////////////

export interface PlayerStore {
  client: GraphQLClient;
  wsClient: Client;
  id: string | null;
  unsubscribers: Array<() => void>;
  playerEntity: PlayerEntity | null;
  initPlayerEntity: (gameId: string, playerId: string) => void;
  subscribe: (gameId: string, playerId: string) => void;
  executeQuery: (gameId: string, playerId: string) => void;
  reset: () => void;
}

type PlayerStoreProps = {
  client: GraphQLClient;
  wsClient: Client;
};

export const createPlayerStore = ({ client, wsClient }: PlayerStoreProps) => {
  return createStore<PlayerStore>((set, get) => ({
    client,
    wsClient,
    id: null,
    playerEntity: null,
    unsubscribers: [],
    initPlayerEntity: (gameId: string, playerId: string) => {
      if (get().id === null) {
        get().subscribe(gameId, playerId);
      }
    },
    reset: () => {
      for (let unsubscribe of get().unsubscribers) {
        unsubscribe();
      }
      const wsClient = get().wsClient;
      wsClient && wsClient.dispose();
      set({ id: null, playerEntity: null, unsubscribers: [] });
    },
    subscribe: async (gameId: string, playerId: string) => {
      const { wsClient, unsubscribers } = get();
      const id = getEntityIdFromKeys([BigInt(gameId), BigInt(playerId)]);

      //load playerEntity
      await get().executeQuery(gameId, playerId);

      //subscribe to playerEntity changes / Markets changes
      unsubscribers.push(
        wsClient.subscribe(
          {
            query: PlayerEntitySubscriptionDocument,
            variables: {
              id,
            },
          },
          {
            next: ({ data }) => {
              return onPlayerEntityData({ set, data });
            },
            error: (error) => console.log({ error }),
            complete: () => console.log("complete"),
          },
        ),
      );

      //subscribe to player Drug / Items / Encounter
      for (let drugId of [0, 1, 2, 3, 4, 5]) {
        const id = getEntityIdFromKeys([BigInt(gameId), BigInt(playerId), BigInt(drugId)]);

        unsubscribers.push(
          wsClient.subscribe(
            {
              query: PlayerEntityRelatedDataSubscriptionDocument,
              variables: {
                id,
              },
            },
            {
              next: ({ data }) => {
                return onPlayerEntityRelatedData({  set, data });
              },
              error: (error) => console.log({ error }),
              complete: () => console.log("complete"),
            },
          ),
        );
      }
      
      set({ id: id, unsubscribers: unsubscribers });
    },
    executeQuery: async (gameId: string, playerId: string) => {
      const data = (await client.request(PlayerEntityDocument, {
        gameId: gameId,
        playerId: playerId,
      })) as PlayerEntityQuery;

      const edges = data!.entities!.edges as World__EntityEdge[];

      if (edges && edges[0] && edges[0].node) {
        const player = PlayerEntity.create(data?.entities?.edges as World__EntityEdge[]);
        set({ playerEntity: player });
      }
    },
  }));
};

const onPlayerEntityData = ({  set, data }: { data: World__Subscription }) => {
  if (!data?.entityUpdated?.models) return;
  // update player
  let playerUpdate = data?.entityUpdated?.models.find((i) => i?.__typename === "Player") as Player;
  if (playerUpdate) {
    set((state) => ({
      playerEntity: state.playerEntity?.update(playerUpdate),
    }));
  }

  // update markets
  let marketUpdate = data?.entityUpdated?.models.find((i) => i?.__typename === "MarketPacked") as MarketPacked;
  if (marketUpdate && marketUpdate.packed) {
    set((state) => ({
      playerEntity: state.playerEntity?.updateMarkets(marketUpdate),
    }));
  }

  //console.log("updated : Player");
};

const onPlayerEntityRelatedData = ({  set, data }: { data: World__Subscription }) => {
  if (!data?.entityUpdated?.models) return;

  for (let model of data?.entityUpdated?.models) {
    if (model && model.__typename === "Drug") {
      set((state) => ({
        playerEntity: state.playerEntity?.updateDrug(model as unknown as Drug),
      }));
      // console.log(`updated : Drug`);
    }

    if (model && model.__typename === "Item") {
      set((state) => ({
        playerEntity: state.playerEntity?.updateItem(model as unknown as Item),
      }));
      // console.log(`updated : Item`);
    }

    if (model && model.__typename === "Encounter") {
      set((state) => ({
        playerEntity: state.playerEntity?.updateEncounter(model as unknown as Encounter),
      }));
      // console.log(`updated : Encounter`);
    }
  }
};
