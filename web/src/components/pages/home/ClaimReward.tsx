import { Gem } from "@/components/icons";
import { MakeItRain } from "@/components/layout";
import { useConfigStore, useRyoStore } from "@/dojo/hooks";
import { Leaderboard } from "@/generated/graphql";
import { Button } from "@chakra-ui/react";
import { useAccount } from "@starknet-react/core";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ClaimModal } from "./ClaimModal";

export const ClaimReward = observer(() => {
  const { config } = useConfigStore();
  const ryoStore = useRyoStore();
  const { hallOfFame } = ryoStore;

  const { account } = useAccount();

  const [claimable, setClaimable] = useState<Leaderboard[]>([]);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  const [isRainning, setIsRainning] = useState(false);

  useEffect(() => {
    if (!hallOfFame) {
      setClaimable([]);
    } else {
      const _claimable = hallOfFame.filter(
        (i) => i.player_id === account?.address && !i.claimed && i.version !== config?.ryo.leaderboard_version,
      );
      setClaimable(_claimable);
    }
  }, [account?.address, hallOfFame]);

  const onClose = () => {
    setIsRainning(true);
    setIsClaimModalOpen(false);

    setTimeout(() => {
      setIsRainning(false);
    }, 20_000);
  };

  const test = async () => {
    const res = await account?.getStateUpdate(32);
    console.log(res);
  };

  return (
    <>
      <Button onClick={test}>test</Button>
      {claimable.length > 0 && (
        <>
          <Button
            h="48px"
            variant="pixelated"
            bg="yellow.600"
            borderColor="yellow.600"
            color="yellow.400"
            _hover={{
              bg: "yellow.500",
            }}
            onClick={() => setIsClaimModalOpen(true)}
          >
            <Gem /> Claim
          </Button>
          <ClaimModal claimable={claimable[0]} isOpen={isClaimModalOpen} onClose={onClose} />
        </>
      )}
      {isRainning && <MakeItRain />}
    </>
  );
});
