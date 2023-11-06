"use client";

import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Link from "next/link";
import {
  Card,
  Container,
  VStack,
  HStack,
  Text,
  Box,
  Button,
  Heading,
  Input,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { Arrow, Starknet, Ethereum, Paper } from "@/components/icons";

import { Web3Providers } from "@/components/Web3Providers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";

import {
  connect,
  ConnectOptions,
  disconnect,
  DisconnectOptions,
  type StarknetWindowObject,
} from "get-starknet";
import { Contract, Provider, constants, uint256 } from "starknet";
import { formatEther } from "viem";

import SnEthAbi from "@/abis/sn_eth.json";
import { play } from "@/hooks/media";
import { playSound, Sounds } from "@/hooks/sound";

const eth_snmainnet_address =
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
const paper_mainnet_address = "0x7aE1D57b58fA6411F32948314BadD83583eE0e8C";

const frenlyAddress = (address: string) => {
  return (
    address.substring(0, 4) +
    "..." +
    address.substring(address.length - 4, address.length)
  );
};

const provider = new Provider({
  sequencer: { network: constants.NetworkName.SN_MAIN },
});
const snEth = new Contract(SnEthAbi, eth_snmainnet_address, provider);

export default function BridgePage() {
  return (
    <Web3Providers>
      <BridgeContent />
    </Web3Providers>
  );
}

function BridgeContent() {
  const router = useRouter();

  const { isConnected: isConnectedEth, address: ethAddress } = useAccount();
  const ethPaperBalanceInfos = useBalance({
    address: ethAddress,
    token: paper_mainnet_address,
  });

  const [snWalletInfos, setSnWalletInfos] =
    useState<StarknetWindowObject | null>(null);

  const [bridgeAmount, setBridgeAmount] = useState("0");

  const [snEthBalance, setSnEthBalance] = useState(0);
  const [ethPaperBalance, setEthPaperBalance] = useState("0");
  const [snPaperBalance, setSnPaperBalance] = useState(0);

  useEffect(() => {
    setEthPaperBalance(ethPaperBalanceInfos.data?.formatted || "0");
  }, [ethPaperBalanceInfos]);

  // starknet wallet
  const handleConnectSN = async (options?: ConnectOptions) => {
    const res = await connect(options);
    setSnWalletInfos(res);

    if (res?.isConnected) {
      const { balance } = await snEth.balanceOf(res?.selectedAddress);
      const frenlyBalance = Number(formatEther(uint256.uint256ToBN(balance)));
      setSnEthBalance(frenlyBalance);

      // TODO : retrieve $PAPER balance
      setSnPaperBalance(420.69);
    } else {
      setSnEthBalance(0);
      setSnPaperBalance(0);
    }
  };

  const handleDisconnectSN = async (options?: DisconnectOptions) => {
    const res = await disconnect(options);
    setSnWalletInfos(null);
  };

  return (
    <Web3Providers>
      <Layout CustomLeftPanel={BridgeLeftPanel}>
        <VStack
          w="full"
          h="full"
          display="flex"
          justifyContent={"center"}
          mt={["100px", "0"]}
        >
          <HStack
            w="full"
            display="flex"
            gap="20px"
            justifyContent={"center"}
            mb={3}
            flexDir={["column", "row"]}
          >
            <CustomConnectMainnet flex="1" />

            <Box flex="1">
              {!snWalletInfos && (
                <Button
                  onClick={() => handleConnectSN({ modalTheme: "dark" })}
                  w="full"
                >
                  Connect starknet
                </Button>
              )}
              {snWalletInfos && (
                <Button
                  onClick={() => handleDisconnectSN({ clearLastWallet: true })}
                  w="full"
                  p="0"
                  variant="pixelated"
                  fontSize="14px"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Starknet />
                  <Text>
                    {frenlyAddress(snWalletInfos.selectedAddress || "")}
                  </Text>
                  <Text opacity={0.35}>|</Text>
                  <Text>
                    {Number(snEthBalance).toFixed(3)}
                    <Ethereum w="20px" h="20px" />
                  </Text>
                </Button>
              )}
            </Box>
          </HStack>

          <Card variant="pixelated" p="6">
            <VStack boxSize="full" gap="10px" justify="center">
              <Card variant="pixelated" bg="neon.900">
                <VStack w="full" p="20px" gap="10px" justify="center">
                  <Text fontFamily="broken-console">FROM </Text>
                  <HStack
                    w="full"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-end"
                  >
                    <Box>
                      <Ethereum /> Mainnet
                    </Box>
                    <VStack
                      gap="0"
                      onClick={() => setBridgeAmount(ethPaperBalance)}
                      cursor="pointer"
                      fontSize="12px"
                      alignItems="flex-end"
                    >
                      <Text>Available</Text>
                      <Text>{ethPaperBalance}</Text>
                    </VStack>
                  </HStack>
                  <Input
                    p="2"
                    bg="neon.700"
                    placeholder="0.00"
                    type="number"
                    textAlign={"right"}
                    value={bridgeAmount}
                    onChange={(e) => setBridgeAmount(e.target.value)}
                  />
                </VStack>
              </Card>

              <Button variant="pixelated" bg="neon.900">
                <Arrow transform={"rotate(-90deg)"} />
              </Button>

              <Card variant="pixelated" bg="neon.900">
                <VStack w="full" p="20px" gap="10px" justify="center">
                  <Text fontFamily="broken-console">TO </Text>
                  <HStack
                    w="full"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Starknet /> Starknet
                    </Box>
                    <Box> Balance </Box>
                  </HStack>
                  <Card
                    w="full"
                    p="2"
                    variant="pixelated"
                    alignItems={"flex-end"}
                  >
                    {snPaperBalance}
                  </Card>
                </VStack>
              </Card>

              <Button
                w="full"
                mt="2"
                onClick={() => {
                  alert("wen bridge?");
                  playSound(Sounds.Magnum357, 0.5);
                }}
                isDisabled={
                  !(
                    isConnectedEth &&
                    snWalletInfos?.isConnected &&
                    Number(bridgeAmount) > 0
                  )
                }
              >
                Bridge
              </Button>
            </VStack>
          </Card>
          <Box w="full" display={["flex", "none"]}>
            <PaperLink />
          </Box>
        </VStack>
      </Layout>
    </Web3Providers>
  );
}

const CustomConnectMainnet = ({ ...props }) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            {...props}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} w="full">
                    Connect Ethereum
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} w="full" color="red">
                    Wrong network
                  </Button>
                );
              }

              return (
                <HStack w="full">
                  {/* <Button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button> */}

                  <Button
                    onClick={openAccountModal}
                    w="full"
                    p="0"
                    variant="pixelated"
                    fontSize="14px"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Ethereum />
                    <Text>{account.displayName.replace("…", "...")}</Text>
                    <Text opacity={0.35}>|</Text>
                    <Text>
                      {account.displayBalance
                        ? ` ${account.displayBalance.replace("ETH", "")}`
                        : ""}
                      <Ethereum w="20px" h="20px" />
                    </Text>
                  </Button>
                </HStack>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};

const BridgeLeftPanel = () => {
  return (
    <>
      <VStack my="auto" flex={["0", "1"]} position="relative">
        <Text textStyle="subheading" fontSize="11px">
          $PAPER
        </Text>
        <Heading fontSize={["24px", "48px"]} fontWeight="normal">
          Bridge
        </Heading>

        <Image
          src={"/images/moneysuitcase.png"}
          w="320px"
          alt="bridge"
          my={16}
          display={["none", "flex"]}
        />

        <PaperLink display={["none", "flex"]} />
      </VStack>
    </>
  );
};

const PaperLink = ({ ...props }) => {
  return (
    <Card w="auto" p={2} mx="auto" mt={2} variant="pixelated" {...props}>
      <Text fontSize="12px">
        <Paper /> PAPER :{" "}
        <Link
          href={`https://etherscan.io/token/${paper_mainnet_address}`}
          target="_blank"
        >
          {paper_mainnet_address}
        </Link>
      </Text>
    </Card>
  );
};
