"use client";

import "@rainbow-me/rainbowkit/styles.css";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
  AvatarComponent,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, optimism, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Avatar } from "./avatar/Avatar";
import { genAvatarFromAddress } from "./avatar/avatars";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    // optimism,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()],
);

const projectId = "YOUR_PROJECT_ID";

const { wallets } = getDefaultWallets({
  appName: "RYO",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "RYO",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      // trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Web3Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={demoAppInfo}
        avatar={CustomAvatar}
        modalSize="compact"
        theme={darkTheme({
          accentColor: "#11ed83",
          accentColorForeground: "black",
        })}
        coolMode
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return <Avatar name={genAvatarFromAddress(address)} w="60px" height="60px" />;

  // return ensImage ? (
  //   <img
  //     src={ensImage}
  //     width={size}
  //     height={size}
  //     style={{ borderRadius: 999 }}
  //     alt="ensAvatar"
  //   />
  // ) : (
  //   <Avatar name={genAvatarFromAddress(address)} w="60px" height="60px" />
  // );
};
