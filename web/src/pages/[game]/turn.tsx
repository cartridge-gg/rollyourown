import Content from "@/components/Content";
import { Footer } from "@/components/Footer";
import { Event } from "@/components/icons";
import { Ludes, Weed } from "@/components/icons/drugs";
import { Manhattan } from "@/components/icons/locations";
import Layout from "@/components/Layout";
import {
  endTurn,
  TradeDirection,
  useGameStore,
  getDrugPrice,
} from "@/hooks/state";
import { useUiStore } from "@/hooks/ui";
import {
  Box,
  Button,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

export default function Turn() {
  const router = useRouter();

  const { getDrugByName, getLocationByName } = useUiStore();

  const turns = useGameStore((state) => state.turns);
  const location = useGameStore((state) => state.location);
  const locationConfig = getLocationByName(location || "");
  const pendingTrades = useGameStore((state) => state.pendingTrades);

  return (
    <Layout
      title={`Day ${turns.current}`}
      prefixTitle="End of"
      backgroundImage="url('https://static.cartridge.gg/games/dope-wars/ryo/end.png');"
    >
      <Content gap="30px">
        <VStack w="full">
          <Product product="Product" direction="Action" quantity="Qty" cost="Value" icon={undefined} isHeader />
          <UnorderedList w="full" variant="underline">
            {pendingTrades &&
              pendingTrades.map((trade, index) => {
                const drugConfig = getDrugByName(trade.drug.name);
                const price = getDrugPrice(trade.drug.name);
                const total = trade.quantity * price;

                return drugConfig &&(
                  <ListItem key={`trade-${index}`}>
                    <Product
                      icon={drugConfig?.icon}
                      product={drugConfig?.name}
                      direction={trade.direction === TradeDirection.Buy ? "BUY" : "SELL"}
                      quantity={trade.quantity}
                      cost={`$${total}`}
                    />
                  </ListItem>
                );
              })}
          </UnorderedList>
        </VStack>
        <VStack w="full" style={{marginTop:"30px"}}>
          <HStack w="full">
          <Box w="24px"></Box>
            <Text fontFamily="broken-console" fontSize="10px" color="neon.500">
              Travel To
            </Text>
          </HStack>
          <UnorderedList w="full" variant="underline">
            <ListItem>
              <HStack>
                {locationConfig && locationConfig.icon({})}
                <Text>{locationConfig?.name}</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <HStack flex="1">
                  <Event />
                  <Text>Mugged</Text>
                </HStack>
                <Text flex="1" color="yellow.400">
                  Lost 50% of supply
                </Text>
              </HStack>
            </ListItem>
          </UnorderedList>
        </VStack>
      </Content>
      <Footer>
        <Button
          w={["full", "auto"]}
          onClick={() => {
            endTurn();
            router.push("/0x123/travel");
          }}
        >
          Continue
        </Button>
      </Footer>
    </Layout>
  );
}

const Product = ({
  icon,
  product,
  direction,
  quantity,
  cost,
  isHeader,
}: {
  icon: React.FC | undefined;
  product: string;
  direction: string;
  quantity: number | string;
  cost: number| string;
  isHeader?: boolean;
}) => {
  const header = isHeader && {
    fontFamily: "broken-console",
    fontSize: "10px",
    color: "neon.500",
  };

  return (
    <HStack w="full" {...header}>
      <HStack flex="2">
        {icon ? icon({ boxSize: "24px" }) : <Box w="24px"></Box>}
        <Text>{product}</Text>
      </HStack>
      <Text flex="1" >{direction}</Text>
      <Text flex="1" textAlign="right">{quantity}</Text>
      <Text flex="1" textAlign="right">{cost}</Text>
    </HStack>
  );
};
