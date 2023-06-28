import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Spacer,
  Divider,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  SimpleGrid,
} from "@chakra-ui/react";
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Content from "@/components/Content";
import { Footer } from "@/components/Footer";
import {
  Ludes,
  Weed,
  Acid,
  Speed,
  Heroin,
  Cocaine,
} from "@/components/icons/drugs";
import { ArrowEnclosed, Bag } from "@/components/icons";
import Image from "next/image";
import { DrugProps, useUiStore } from "@/hooks/ui";

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import { Sounds } from "@/hooks/sound";
import {
  useGameStore,
  travelTo,
  trade,
  TradeDirection,
  Drugs,
  InventoryType,
  getInventoryInfos,
} from "@/hooks/state";
import { Inventory } from "@/components/Inventory";

enum MarketMode {
  Buy,
  Sell,
}

export default function Market() {
  const router = useRouter();
  const [drug, setDrug] = useState<DrugProps>();
  const [marketMode, setMarketMode] = useState(MarketMode.Buy);

  const [quantityBuy, setQuantityBuy] = useState(0);
  const [quantitySell, setQuantitySell] = useState(0);

  const [canBuy, setCanBuy] = useState(false);
  const [canSell, setCanSell] = useState(false);

  const locationMenu = useGameStore((state) => state.menu);
  const inventory = useGameStore((state) => state.inventory);
  const inventoryInfos = getInventoryInfos();

  useEffect(() => {
    const { getDrugBySlug } = useUiStore.getState();
    const drugSlug = router.query.drugSlug?.toString() || "";
    const drug = getDrugBySlug(drugSlug);
    setDrug(drug);

    // if menu not initialized force travel to this location
    //   if(!locationMenu){
    //     travelTo
    //   }
  }, [router.query]);

  useEffect(() => {
    if (!drug || !locationMenu) return;
    const drugPrice = locationMenu[drug.name].price;
    const can =
      quantityBuy <= inventoryInfos.left &&
      quantityBuy * drugPrice <= inventory.cash &&
      quantityBuy > 0;
    setCanBuy(can);
  }, [quantityBuy, drug, locationMenu, inventoryInfos.left, inventory.cash]);

  useEffect(() => {
    if (!drug) return;
    const inBag = inventory.drugs[drug.name].quantity;
    const can = quantitySell <= inBag && quantitySell > 0;
    setCanSell(can);
  }, [quantitySell, inventory, inventory.drugs, drug]);

  const onTabsChange = (index: number) => {
    setMarketMode(index as MarketMode);
  };

  const onBuy = () => {
    drug && trade(TradeDirection.Buy, drug.name, quantityBuy);

    //todo: replace by push
    router.back();
  };

  const onSell = () => {
    drug && trade(TradeDirection.Sell, drug.name, quantitySell);

    //todo: replace by push
    router.back();
  };

  return (
    drug &&
    locationMenu && (
      <Layout
        title={drug.name}
        prefixTitle="The market"
        headerImage="/images/dealer.png"
      >
        <Content>
          <VStack w="100%" h="100%">
            {/* <Inventory pb="20px" /> */}
            <VStack w="100%" rounded={6} bg="neon.700" p={6} mb={6}>
              <Box position="relative" my={6}>
                <Image
                  src={`/images/drugs/${drug.slug}.png`}
                  alt={drug.name}
                  width={200}
                  height={200}
                  objectFit="contain"
                  style={{ margin: "auto", width: "auto", height: "auto" }}
                />
              </Box>
              <HStack w="100%" justifyContent="space-between">
                <Text>${drug ? locationMenu[drug.name].price : "???"}</Text>
                <Text>
                  <Bag />
                  {drug ? locationMenu[drug.name].available : "???"}
                </Text>
              </HStack>
            </VStack>

            <Tabs
              w="100%"
              isFitted
              variant="unstyled"
              index={marketMode}
              onChange={onTabsChange}
            >
              <TabList>
                <Tab
                  color="neon.500"
                  _selected={{ color: "neon.300", bg: "neon.700" }}
                  rounded={6}
                >
                  BUY
                </Tab>
                <Tab
                  color="neon.500"
                  _selected={{ color: "neon.300", bg: "neon.700" }}
                  rounded={6}
                >
                  SELL
                </Tab>
              </TabList>

              <TabPanels mt={6}>
                <TabPanel>
                  <QuantitySelector
                    type={TradeDirection.Buy}
                    price={locationMenu[drug.name].price}
                    inventory={inventory}
                    inventoryInfos={inventoryInfos}
                    drug={drug}
                    onChange={setQuantityBuy}
                  />
                </TabPanel>
                <TabPanel>
                  <QuantitySelector
                    type={TradeDirection.Sell}
                    price={locationMenu[drug.name].price}
                    inventory={inventory}
                    inventoryInfos={inventoryInfos}
                    drug={drug}
                    onChange={setQuantitySell}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Content>
        <Footer>
          {marketMode === MarketMode.Buy && (
            <Button w={["50%", "auto"]} onClick={onBuy} isDisabled={!canBuy}>
              Buy ({quantityBuy})
            </Button>
          )}
          {marketMode === MarketMode.Sell && (
            <Button w={["50%", "auto"]} onClick={onSell} isDisabled={!canSell}>
              Sell ({quantitySell})
            </Button>
          )}
        </Footer>
      </Layout>
    )
  );
}

const QuantitySelector = ({
  type,
  price,
  inventory,
  inventoryInfos,
  drug,
  onChange,
}: {
  type: TradeDirection;
  price: number;
  inventory: InventoryType;
  inventoryInfos: { capacity: number; used: number; left: number };
  drug: DrugProps;
  onChange: (quantity: number) => void;
}) => {
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [max, setMax] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, []);

  useEffect(() => {
    if (type === TradeDirection.Buy) {
      const maxBuyable = Math.floor(inventory.cash / price);
      const maxInventory = inventoryInfos.left;
      setMax(Math.max(1, Math.min(maxBuyable, maxInventory)));
    } else if (type === TradeDirection.Sell) {
      setMax(Math.max(1, inventory.drugs[drug.name].quantity));
    }
  }, [type, price, drug, inventory, inventoryInfos]);

  useEffect(() => {
    setTotalPrice(quantity * price);
    onChange(quantity);
  }, [quantity, price, onChange]);

  const onDown = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);

  const onUp = useCallback(() => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    }
  }, [quantity, max]);

  const onSlider = useCallback((value: number) => {
    setQuantity(value);
  }, []);

  const onMax = useCallback(() => {
    setQuantity(max);
  }, [max]);

  const on50 = useCallback(() => {
    setQuantity(Math.max(1, Math.floor(max / 2)));
  }, [max]);

  return (
    <VStack
      opacity={max === 0 ? "0.2" : "1"}
      pointerEvents={max === 0 ? "none" : "all"}
    >
      <HStack w="100%" justifyContent="space-between">
        <Text>
          {quantity} for ${totalPrice}
        </Text>

        <HStack gap="8px">
          <Text textDecoration="underline" cursor="pointer" onClick={on50}>
            50%
          </Text>
          <Text textDecoration="underline" cursor="pointer" onClick={onMax}>
            MAX
          </Text>
        </HStack>
      </HStack>

      <HStack w="100%">
        <ArrowEnclosed
          direction="down"
          size="lg"
          cursor="pointer"
          onClick={onDown}
          color="neon.500"
          _hover={{
            color: "neon.300",
          }}
        />

        <Slider
          aria-label="slider-quantity"
          w="100%"
          min={1}
          max={max}
          step={1}
          defaultValue={1}
          value={quantity}
          onChange={onSlider}
        >
          <SliderTrack bg="neon.700" height="30px" rounded={6}>
            <SliderFilledTrack
              height="20px"
              bg="linear-gradient(to right, #16c973 75%, #202f20 25%)"
              bgSize="16px 20px"
              bgRepeat="repeat-x"
            />
          </SliderTrack>
          {/* <SliderThumb bg="transparent" outline="none">
            <Box w="12px" h="20px" bg="neon.300" borderLeft="solid 2px #202f20"></Box>
          </SliderThumb> */}
        </Slider>

        <ArrowEnclosed
          direction="up"
          size="lg"
          cursor="pointer"
          onClick={onUp}
          color="neon.500"
          _hover={{
            color: "neon.300",
          }}
        />
      </HStack>
    </VStack>
  );
};
