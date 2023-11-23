#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

if [ $# -ge 1 ] && [ $1 == "local" ]; then
    export RPC_URL="http://localhost:5050"
else
    export RPC_URL="https://api.cartridge.gg/x/ryo/katana"
fi

export WORLD_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.world.address')

export LOBBY_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.contracts[] | select(.name == "lobby" ).address')
export TRAVEL_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.contracts[] | select(.name == "travel" ).address')
export DECIDE_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.contracts[] | select(.name == "decide" ).address')
export TRADE_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.contracts[] | select(.name == "trade" ).address')
export SHOP_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.contracts[] | select(.name == "shop" ).address')
export RYO_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.contracts[] | select(.name == "ryo" ).address')

echo "---------------------------------------------------------------------------"
echo rpc : $RPC_URL
echo world : $WORLD_ADDRESS
echo " "
echo lobby : $LOBBY_ADDRESS
echo travel: $TRAVEL_ADDRESS
echo decide: $DECIDE_ADDRESS
echo trade : $TRADE_ADDRESS
echo shop : $SHOP_ADDRESS
echo ryo : $RYO_ADDRESS
echo "---------------------------------------------------------------------------"

# enable system -> component authorizations
LOBBY_COMPONENTS=("Game" "Market" "Player" "Leaderboard" "RyoMeta")
TRAVEL_COMPONENTS=("Player" "Market" "Encounter")
DECIDE_COMPONENTS=("Player" "Drug" "Market" "Encounter" "Leaderboard" "RyoMeta")
TRADE_COMPONENTS=("Drug" "Market" "Player")
SHOP_COMPONENTS=("Player" "Item" "Market")
RYO_COMPONENTS=("RyoMeta" "Leaderboard")

for component in ${LOBBY_COMPONENTS[@]}; do
    sozo auth writer $component $LOBBY_ADDRESS --world $WORLD_ADDRESS --rpc-url $RPC_URL
    sleep 0.1
done

for component in ${TRAVEL_COMPONENTS[@]}; do
    sozo auth writer $component $TRAVEL_ADDRESS --world $WORLD_ADDRESS --rpc-url $RPC_URL
    sleep 0.1
done

for component in ${DECIDE_COMPONENTS[@]}; do
    sozo auth writer $component $DECIDE_ADDRESS --world $WORLD_ADDRESS --rpc-url $RPC_URL
    sleep 0.1
done

for component in ${TRADE_COMPONENTS[@]}; do
    sozo auth writer $component $TRADE_ADDRESS --world $WORLD_ADDRESS --rpc-url $RPC_URL
    sleep 0.1
done

for component in ${SHOP_COMPONENTS[@]}; do
    sozo auth writer $component $SHOP_ADDRESS --world $WORLD_ADDRESS --rpc-url $RPC_URL
    sleep 0.1
done

for component in ${RYO_COMPONENTS[@]}; do
    sozo auth writer $component $RYO_ADDRESS --world $WORLD_ADDRESS --rpc-url $RPC_URL
    sleep 0.1
done

echo "Default authorizations have been successfully set."

echo "Initializing..."
sozo execute $RYO_ADDRESS initialize
echo "Initialized!"

