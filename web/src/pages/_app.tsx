import RegisterEntities from "@/components/RegisterEntities";
import { MakeItRain } from "@/components/layout";
import { StarknetProvider } from "@/components/wallet";
import { initializeInPage } from "@/components/wallet/inpage";
import { DojoContextProvider } from "@/dojo/context/DojoContext";
import { dojoContextConfig } from "@/dojo/setup/config";
import useKonamiCode, { starkpimpSequence } from "@/hooks/useKonamiCode";
import Fonts from "@/theme/fonts";
import GlobalStyles from "@/theme/global";
import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import { useEffect } from "react";
import theme from "../theme";

export default function App({ Component, pageProps }: AppProps) {
  const { setSequence, isRightSequence, setIsRightSequence } = useKonamiCode(starkpimpSequence);

  useEffect(() => {
    if (isRightSequence) {
      // stop rain after 20s
      setTimeout(() => {
        isRightSequence && setIsRightSequence(false);
        setSequence([]);
      }, 20_000);
    }
  }, [isRightSequence, setIsRightSequence, setSequence]);

  useEffect(() => {
    console.log("initializeInPage")
    initializeInPage();
  }, []);

  return (
    <>
      <DojoContextProvider dojoContextConfig={dojoContextConfig}>
        <StarknetProvider>
          <RegisterEntities />
          <ChakraProvider theme={theme}>
            <Fonts />
            <GlobalStyles />
            <NextHead>
              <title>Roll your Own</title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
              />
            </NextHead>
            {isRightSequence && <MakeItRain />}
            <Component {...pageProps} />
            <Analytics />
            {/* <Debug /> */}
          </ChakraProvider>
        </StarknetProvider>
      </DojoContextProvider>
    </>
  );
}
