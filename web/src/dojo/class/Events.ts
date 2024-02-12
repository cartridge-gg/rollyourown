import { Game, World__Event } from "@/generated/graphql";
import { computed, makeObservable, observable } from "mobx";
import { BaseEventData, GameCreatedEventData, parseEvent } from "../events";
import { ConfigStore } from "../stores/config";

type DojoEvent = {
    idx: number;
    blocknumber: number;
    eventIdx: number;
    raw: any;
    parsed: BaseEventData;
}

//
//
//

export class EventClass {
    gameInfos: Game;

    events: Array<DojoEvent>;

    constructor(configStore: ConfigStore, gameInfos: Game, events: World__Event[]) {
        this.gameInfos = gameInfos;
        //

        this.events = events.map(i => EventClass.parseWorldEvent(i))

        makeObservable(this, {
            events: observable,
            playerName: computed,
            sortedEvents: computed
        })

        console.log("Events", this)
    }

    public static parseWorldEvent(event: World__Event): DojoEvent {
        const id = event.id?.split(":");
        const blocknumber = Number(id[0])
        const eventIdx = Number(id[2])
        const idx = blocknumber * 10_000 + eventIdx

        return {
            idx,
            blocknumber,
            eventIdx,
            raw: event,
            parsed: parseEvent(event)
        }
    }

    //
    //
    //

    get playerName() {
        const game_created = this
            .events
            .find((i: DojoEvent) => i.parsed.eventName === "GameCreated")
        return (game_created.parsed as GameCreatedEventData).playerName
    }

    get sortedEvents() {
        return this.events.sort((a, b) => a.idx - b.idx)
    }

    //
    //
    //

    addEvent(event: World__Event) {
        this.events.push(EventClass.parseWorldEvent(event))
    }


    getLastEncounter() {
        return this
            .sortedEvents
            .reverse()
            .find((i: DojoEvent) => i.parsed.eventName === "TravelEncounter")
    }

}


















