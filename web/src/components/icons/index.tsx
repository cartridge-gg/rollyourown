import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
} from "@chakra-ui/react";
import { ThemingProps } from "@chakra-ui/styled-system";
import React from "react";

export interface IconProps extends ChakraIconProps, ThemingProps {}

export const Icon = ({
  children,
  ...rest
}: { children: React.ReactElement<SVGPathElement> } & IconProps) => {
  return (
    <ChakraIcon viewBox="0 0 36 36" fill="currentColor" {...rest}>
      {children}
    </ChakraIcon>
  );
};

export * from "./Car";
export * from "./Bag";
export * from "./Gem";
export * from "./Chat";
export * from "./Home";
export * from "./Link";
export * from "./Event";
export * from "./Arrow";
export * from "./ArrowEnclosed";
export * from "./ArrowInput";
export * from "./Clock";
export * from "./Sound";
export * from "./Music";
export * from "./Dots";
export * from "./SendMessage";
export * from "./Sparkles";
export * from "./Trophy";
export * from "./User";
export * from "./Warning";
export * from "./Cart";
export * from "./Alert";
export * from "./Pistol";
export * from "./Arrest";
export * from "./Roll";
export * from "./Close";
export * from "./ExternalLink";
export * from "./Heart";
export * from "./Skull";
export * from "./Siren";
export * from "./Truck";
export * from "./Starknet";
export * from "./Ethereum";
export * from "./Paper";
export * from "./Disconnect";

// Template for adding new icons. When copying svg from figma, viewBox is assumed
// to be 36x36, otherwise override within individual icons.
//
// import { Icon, IconProps } from ".";
//
// export const IconName = (props: IconProps) => {
//   return (
//     <Icon {...props}>
//       <path />
//     </Icon>
//   );
// };
