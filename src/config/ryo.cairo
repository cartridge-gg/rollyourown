use starknet::ContractAddress;
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

const RYO_CONFIG_KEY: u8 = 0;

#[derive(Model, Copy, Drop, Serde)]
struct RyoConfig {
    #[key]
    key: u8,
    initialized: bool,
    paused: bool,
    //
    leaderboard_version: u16,
    leaderboard_duration: u32,
    //
    paper_fee: u16,
    treasury_fee_pct: u8,
    treasury_balance: u32,
}

#[derive(Copy, Drop)]
struct RyoConfigManager {
    world: IWorldDispatcher
}

#[generate_trait]
impl RyoConfigImpl of RyoConfigManagerTrait {
    fn new(world: IWorldDispatcher) -> RyoConfigManager {
        RyoConfigManager { world }
    }

    fn get(self: RyoConfigManager) -> RyoConfig {
        get!(self.world, (RYO_CONFIG_KEY), RyoConfig)
    }

    fn set(self: RyoConfigManager, ryo_config: RyoConfig) {
        set!(self.world, (ryo_config));
    }

}