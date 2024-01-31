use starknet::ContractAddress;
use dojo::database::introspect::{
    Enum, Member, Ty, Struct, Introspect, serialize_member, serialize_member_type
};
use dojo::world::{IWorld, IWorldDispatcher, IWorldDispatcherTrait};

use rollyourown::models::item::{Item};

use rollyourown::config::{
    locations::Locations,
    items::{ItemSlot, ItemLevel}
};

// #[derive(Model, Copy, Drop, Serde)]
// struct ProfileRegistry {
//     #[key]
//     player_id: ContractAddress,
//     profile_id: u32,
//     name: felt252,

// }

// #[derive(Model, Copy, Drop, Serde)]
// struct GamePacked {
//   #[key]
//   game_id: u32,
//   profile_id: u32,
// }

// #[derive(Model, Copy, Drop, Serde)]
// struct PlayerPacked {
//     #[key]
//     game_id: u32,
//     #[key]
//     player_id: ContractAddress,
//     packed: felt252  
// }




// rename GameState
#[derive(Model, Copy, Drop, Serde)]
struct Player {
    #[key]
    game_id: u32,
    #[key]
    player_id: ContractAddress,
    name: felt252,                        // name registry or event
    avatar_id: u8,                        // 2 bits = 4
    status: PlayerStatus,                 // 2 bits = 4 ( + ?)
    location_id: Locations,            // 3 bits = 8 
    next_location_id: Locations,       // 3 bits  = 8 ( maybe can remove)
    turn: u8,                          // 6 bits = 64 ( max 64 turn looks fine ?)  
    cash: u32,                           // 30 bits = 1.xxx.xxx.xxx
    health: u8,                           // 7 bits = 128
    drug_count: u8,                    // probly remove
    attack: u8,                        // computed
    defense: u8,                       // computed
    transport: u8,                     // computed
    speed: u8,                         // computed
    wanted: u8,                           // 7 bits = 128
    leaderboard_version: u32,             // probly remove
    game_over: bool,                      // 1 bit
}


#[derive(Copy, Drop, Serde, PartialEq, Introspect)]
enum PlayerStatus {
    Normal: (),
    BeingMugged: (),
    BeingArrested: (),
    AtPawnshop: (),
}

impl PlayerStatusIntoFelt252 of Into<PlayerStatus, felt252> {
    fn into(self: PlayerStatus) -> felt252 {
        match self {
            PlayerStatus::Normal => 'Normal',
            PlayerStatus::BeingMugged => 'BeingMugged',
            PlayerStatus::BeingArrested => 'BeingArrested',
            PlayerStatus::AtPawnshop => 'AtPawnshop',
        }
    }
}

#[generate_trait]
impl PlayerImpl of PlayerTrait {
    #[inline(always)]
    fn can_continue(self: Player) -> bool {
        if self.game_over {
            return false;
        }
        if self.health == 0 {
            return false;
        }
        if self.status != PlayerStatus::Normal {
            return false;
        }


        // TODO
        // let game = get!()
        // let max_turns = game.max_turns
        let max_turns = 30;

        if self.turn == max_turns {
            return false;
        }

        true
    }


    fn get_attack(self: Player, world: IWorldDispatcher) -> u8 {
        let item = get!(world, (self.game_id, self.player_id, ItemSlot::Attack), (Item));
        self.attack + item.value
    }

    fn get_defense(self: Player, world: IWorldDispatcher) -> u8 {
        let item = get!(world, (self.game_id, self.player_id, ItemSlot::Defense), (Item));
        self.defense + item.value
    }

    fn get_transport(self: Player, world: IWorldDispatcher) -> u8 {
        let item = get!(world, (self.game_id, self.player_id, ItemSlot::Transport), (Item));
        self.transport + item.value
    }

    fn get_speed(self: Player, world: IWorldDispatcher) -> u8 {
        let item = get!(world, (self.game_id, self.player_id, ItemSlot::Speed), (Item));
        self.speed + item.value
    }
}


// impl PlayerStatusIntrospectionImpl of Introspect<PlayerStatus> {
//     #[inline(always)]
//     fn size() -> usize {
//         1
//     }

//     #[inline(always)]
//     fn layout(ref layout: Array<u8>) {
//         layout.append(8);
//     }

//     #[inline(always)]
//     fn ty() -> Ty {
//         Ty::Enum(
//             Enum {
//                 name: 'PlayerStatus',
//                 attrs: array![].span(),
//                 children: array![
//                     ('Normal', serialize_member_type(@Ty::Tuple(array![].span()))),
//                     ('BeingMugged', serialize_member_type(@Ty::Tuple(array![].span()))),
//                     ('BeingArrested', serialize_member_type(@Ty::Tuple(array![].span()))),
//                     ('AtPawnshop', serialize_member_type(@Ty::Tuple(array![].span()))),
//                 ]
//                     .span()
//             }
//         )
//     }
// }


