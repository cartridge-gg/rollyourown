import Button from "@/components/Button";
import { Footer } from "@/components/Footer";
import Layout from "@/components/Layout";
import { TravelEncounterData, TravelEncounterResultData } from "@/dojo/events";
import { getOutcomeInfo } from "@/dojo/helpers";
import { useConfigStore, useDojoContext, useGameStore, useRouterContext } from "@/dojo/hooks";
import { EncounterOutcomes } from "@/dojo/types";
import { Sounds, playSound } from "@/hooks/sound";
import { formatCash } from "@/utils/ui";
import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Consequence() {
  const { router, gameId } = useRouterContext();
  const { account } = useDojoContext();
  const configStore = useConfigStore();
  const { game, gameEvents } = useGameStore();

  const [isDead, setIsDead] = useState(false);
  const [encounterResult, setEncounterResult] = useState<TravelEncounterResultData | undefined>(undefined);
  const [outcomeInfos, setOutcomeInfos] = useState();

  //const response = useMemo(() => outcome?.getResponse(true), [outcome]);

  useEffect(() => {
    if (!(game && gameEvents)) return;

    const lastEncounter = gameEvents.getLastEncounter();
    const lastEncounterResult = gameEvents.getLastEncounterResult();
    lastEncounterResult && setEncounterResult(lastEncounterResult.parsed as TravelEncounterResultData);

    const outcome = getOutcomeInfo(
      (lastEncounter?.parsed as TravelEncounterData).encounterId as Encounters,
      (lastEncounterResult?.parsed as TravelEncounterResultData).outcome as EncounterOutcomes,
    );
    console.log(outcome);
    setOutcomeInfos(outcome);
  }, [gameEvents, gameEvents?.events]);

  useEffect(() => {
    if (encounterResult && encounterResult.outcome === EncounterOutcomes.Died) {
      setIsDead(true);
      playSound(Sounds.GameOver);
    }
  }, [encounterResult]);

  if (!router.isReady || !game || !gameEvents || !encounterResult) {
    return <></>;
  }

  return (
    <>
      <Layout
        isSinglePanel
        footer={
          <Footer>
            {!isDead ? (
              <Button
              w={["full", "auto"]}
                px={["auto", "20px"]}
                onClick={() => {
                  router.push(`/${gameId}/${game.player.location.location}`);
                }}
              >
                Continue
              </Button>
            ) : (
              <Button
              w={["full", "auto"]}
                px={["auto", "20px"]}
                onClick={() => {
                  router.push(`/${gameId}/end`);
                }}
              >
                Game Over
              </Button>
            )}
          </Footer>
        }
      >
        <VStack h="full">
          <VStack>
            <Text textStyle="subheading" fontSize={["10px", "11px"]} letterSpacing="0.25em">
              {outcomeInfos.title}
            </Text>
            <Heading fontSize={["36px", "48px"]} fontWeight="400" textAlign="center">
              {outcomeInfos.name}
            </Heading>
          </VStack>
          <Image alt={outcomeInfos.name} src={outcomeInfos.imageSrc} maxH="50vh" height="500px" />
          <VStack width="full" maxW="500px" h="100%" justifyContent="space-between">
            <VStack textAlign="center" gap={0}>
              {/* <Text>{response}</Text>*/}
              <Text>After {encounterResult.rounds} round(s)</Text>
              <Text color="yellow.400">{outcomeInfos.description && `* ${outcomeInfos.description} *`}</Text>
              {encounterResult.cashEarnt > 0 && (
                <Text color="yellow.400">{`You confiscated ${formatCash(encounterResult.cashEarnt)}`}</Text>
              )}
              {encounterResult.cashLoss > 0 && <Text color="yellow.400">Cash loss : {encounterResult.cashLoss}</Text>}
              {encounterResult.dmgTaken > 0 && <Text color="red">Lost {encounterResult.dmgTaken} HP</Text>}
              {encounterResult.dmgDealt > 0 && <Text color="neon.400">Dealt {encounterResult.dmgDealt} DMG</Text>}
              {encounterResult.drugLoss > 0 && (
                <Text color="yellow.400">
                  Lost {encounterResult.drugLoss} {configStore.getDrugById(encounterResult.drugId).name}
                </Text>
              )}

              {/* <Text>{JSON.stringify(encounterResult, null, 2)}</Text> */}
            </VStack>
          </VStack>
          <Box display="block" minH="70px" h="70px" w="full" />
        </VStack>
      </Layout>
    </>
  );
}
