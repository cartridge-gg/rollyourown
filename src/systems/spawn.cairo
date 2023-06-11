#[system]
mod SpawnPlayer {
    use traits::Into;
    use box::BoxTrait;
    use array::ArrayTrait;
    use dojo_core::integer::{u250, ContractAddressIntoU250};

    use rollyourown::components::{game::Game, player::{Cash, Stats}, location::Location};
    use rollyourown::constants::SCALING_FACTOR;

    #[event]
    fn PlayerJoined(partition: u250, player_id: u250) {}

    fn execute(ctx: Context, partition: u250) -> u250 {
        let block_info = starknet::get_block_info().unbox();
        let player_id: u250 = ctx.caller_account.into();

        let game = commands::<Game>::entity(partition.into());
        assert(!game.is_finished, 'game is finished');
        assert(game.max_players > game.num_players, 'game is full');
        assert(game.start_time >= block_info.block_timestamp, 'already started');

        // spawn player into game
        commands::set_entity(
            (partition, (player_id)).into_partitioned(),
            (
                Stats {
                    health: 100, respect: 0, arrested: false, turns_remaining: game.max_turns
                    }, Cash {
                    amount: 100 * SCALING_FACTOR // $100
                    }, Location {
                    id: 0.into()
                }
            )
        );

        // update num players joined
        commands::set_entity(
            partition.into(),
            (Game {
                start_time: game.start_time,
                max_players: game.max_players,
                num_players: game.num_players + 1,
                max_turns: game.max_turns,
                is_finished: false,
                creator: game.creator,
                max_locations: game.max_locations
            })
        );

        PlayerJoined(partition, player_id);
        player_id
    }
}

#[system]
mod SpawnLocation {
    use traits::Into;
    use box::BoxTrait;
    use array::ArrayTrait;
    use debug::PrintTrait;
    use dojo_core::integer::{u250, ContractAddressIntoU250, U32IntoU250};

    use rollyourown::components::risks::Risks;
    use rollyourown::components::game::Game;
    use rollyourown::components::location::Location;
    use rollyourown::components::market::Market;
    use rollyourown::components::drug::Drug;
    use rollyourown::constants::SCALING_FACTOR;

    const MAX_PRODUCTS: u32 = 6;

    #[event]
    fn LocationCreated(partition: u250, location_id: u32) {}

    fn execute(
        ctx: Context,
        partition: usize,
        travel_risk: u8,
        hurt_risk: u8,
        killed_risk: u8,
        mugged_risk: u8,
        arrested_risk: u8
    ) -> u32 {
        let block_info = starknet::get_block_info().unbox();
        let player_id: u250 = ctx.caller_account.into();

        let game = commands::<Game>::entity(partition.into());
        assert(game.creator == player_id, 'only creator');
        assert(game.start_time >= block_info.block_timestamp, 'already started');

        let location_id = commands::uuid();
        commands::set_entity(
            (partition, (location_id)).into_partitioned(),
            (
                Location {
                    id: location_id.into()
                    }, Risks {
                    travel: travel_risk,
                    hurt: hurt_risk,
                    killed: killed_risk,
                    mugged: mugged_risk,
                    arrested: arrested_risk,
                }
            )
        );

        let mut i: u32 = 0;
        loop {
            if i >= MAX_PRODUCTS {
                break ();
            }
            let quantity = 1000;
            let cash = 100 * SCALING_FACTOR;
            commands::set_entity(
                (partition, (location_id, i)).into_partitioned(), (Market { cash, quantity })
            );
            i += 1;
        }

        LocationCreated(partition.into(), location_id);
        location_id
    }
}


#[system]
mod SpawnGame {
    use array::ArrayTrait;
    use traits::Into;
    use dojo_core::integer::{u250, ContractAddressIntoU250, U32IntoU250};

    use rollyourown::components::game::Game;
    use rollyourown::components::player::Cash;
    use rollyourown::components::player::Stats;
    use rollyourown::components::location::Location;
    use rollyourown::constants::SCALING_FACTOR;

    #[event]
    fn GameCreated(
        partition: u250,
        creator: u250,
        start_time: u64,
        max_turns: usize,
        max_players: usize,
        max_locations: usize
    ) {}

    fn execute(
        ctx: Context, start_time: u64, max_players: usize, max_turns: usize, max_locations: usize
    ) -> (u250, u250) {
        let player_id: u250 = ctx.caller_account.into();

        let partition = commands::uuid();
        commands::set_entity(
            partition.into(),
            (Game {
                start_time,
                max_players,
                num_players: 1, // caller auto joins
                max_turns,
                is_finished: false,
                creator: player_id,
                max_locations
            })
        );

        commands::set_entity(
            (partition, (player_id)).into_partitioned(),
            (
                Stats {
                    health: 100, respect: 0, arrested: false, turns_remaining: max_turns
                    }, Cash {
                    amount: 100 * SCALING_FACTOR // $100
                    }, Location {
                    id: 0.into()
                }
            )
        );

        GameCreated(partition.into(), player_id, start_time, max_players, max_turns, max_locations);
        (partition.into(), player_id)
    }
}
