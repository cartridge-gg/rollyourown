#[system]
mod SpawnSystem {
    use dojo::commands::Spawn;

    use rollyourown::components::player::Name;
    use rollyourown::components::player::INameDispatcher;
    use rollyourown::components::player::INameDispatcherTrait;
    use rollyourown::components::player::Location;
    use rollyourown::components::player::ILocationDispatcher;
    use rollyourown::components::player::ILocationDispatcherTrait;
    use rollyourown::components::player::Inventory;
    use rollyourown::components::player::IInventoryDispatcher;
    use rollyourown::components::player::IInventoryDispatcherTrait;
    use rollyourown::components::player::Stats;
    use rollyourown::components::player::IStatsDispatcher;
    use rollyourown::components::player::IStatsDispatcherTrait;

    fn execute(game_id: felt252, name: felt252) {
        let player_id = Spawn::bundle((game_id), (
            Name { name: name },
            Location { id: 0_u32 },
            Inventory { gun: 69_u8 },
            Stats { health: 100_u8 },
        ));
        return ();
    }
}
