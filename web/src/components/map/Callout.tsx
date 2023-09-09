import { Location } from "@/dojo/types";
import { Icon } from "@chakra-ui/react";

export const Callout = ({ location }: { location: Location }) => {
  return (
    <Icon
      layerStyle="fill"
      zIndex="overlay"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g visibility={Location.Central == location ? "visible" : "hidden"}>
        <path d="M125.01 115.997H124V117.007H125.01V115.997Z" fill="#0CA85D" />
        <path
          d="M120 109.997H124.01V110.997H125.01V115.007H124.01V116.007H123.01V118.007H121V116.007H120V115.007H119V110.997H120V109.997ZM123 114.997V114.007H121.01V114.997H123ZM124 113.997V112.007H123.01V113.997H124ZM120.01 113.997H121V112.007H120.01V113.997ZM123 111.007V111.997H121.01V111.007H123Z"
          fill="#0F380F"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M121 110.997H123.01V111.997H124.01V114.007H123.01V115.007H121V114.007H120V111.997H121V110.997ZM123 113.997H121.01V112.007H123V113.997Z"
          fill="#11ED83"
        />
        <path
          d="M120 108.997H124.01V109.997H125.01V110.997H126.01V115.007H125.01V116.007H124.01V118.007H123.01V119.007H121V118.007H120V116.007H119V115.007H118V110.997H119V109.997H120V108.997ZM123 117.997V115.997H124V114.997H125V111.007H124V110.007H120.01V111.007H119.01V114.997H120.01V115.997H121.01V117.997H123Z"
          fill="#11ED83"
        />
      </g>
      <g visibility={Location.Brooklyn == location ? "visible" : "hidden"}>
        <path d="M122.01 181.995H121V183.005H122.01V181.995Z" fill="#0CA85D" />
        <path
          d="M117 175.995H121.01V176.995H122.01V181.005H121.01V182.005H120.01V184.005H118V182.005H117V181.005H116V176.995H117V175.995ZM120 180.995V180.005H118.01V180.995H120ZM121 179.995V178.005H120.01V179.995H121ZM117.01 179.995H118V178.005H117.01V179.995ZM120 177.005V177.995H118.01V177.005H120Z"
          fill="#0F380F"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M118 176.995H120.01V177.995H121.01V180.005H120.01V181.005H118V180.005H117V177.995H118V176.995ZM120 179.995H118.01V178.005H120V179.995Z"
          fill="#11ED83"
        />
        <path
          d="M117 174.995H121.01V175.995H122.01V176.995H123.01V181.005H122.01V182.005H121.01V184.005H120.01V185.005H118V184.005H117V182.005H116V181.005H115V176.995H116V175.995H117V174.995ZM120 183.995V181.995H121V180.995H122V177.005H121V176.005H117.01V177.005H116.01V180.995H117.01V181.995H118.01V183.995H120Z"
          fill="#11ED83"
        />
      </g>
      <g visibility={Location.Coney == location ? "visible" : "hidden"}>
        <path d="M196.019 203H195.009V204.01H196.019V203Z" fill="#0CA85D" />
        <path
          d="M191.009 197H195.019V198H196.019V202.01H195.019V203.01H194.019V205.01H192.009V203.01H191.009V202.01H190.009V198H191.009V197ZM194.009 202V201.01H192.019V202H194.009ZM195.009 201V199.01H194.019V201H195.009ZM191.019 201H192.009V199.01H191.019V201ZM194.009 198.01V199H192.019V198.01H194.009Z"
          fill="#0F380F"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M192.009 198H194.019V199H195.019V201.01H194.019V202.01H192.009V201.01H191.009V199H192.009V198ZM194.009 201H192.019V199.01H194.009V201Z"
          fill="#11ED83"
        />
        <path
          d="M191.009 196H195.019V197H196.019V198H197.019V202.01H196.019V203.01H195.019V205.01H194.019V206.01H192.009V205.01H191.009V203.01H190.009V202.01H189.009V198H190.009V197H191.009V196ZM194.009 205V203H195.009V202H196.009V198.01H195.009V197.01H191.019V198.01H190.019V202H191.019V203H192.019V205H194.009Z"
          fill="#11ED83"
        />
      </g>
      <g visibility={Location.Queens == location ? "visible" : "hidden"}>
        <path
          d="M193.014 134.994H192.004V136.004H193.014V134.994Z"
          fill="#0CA85D"
        />
        <path
          d="M188.004 128.994H192.014V129.994H193.014V134.004H192.014V135.004H191.014V137.004H189.004V135.004H188.004V134.004H187.004V129.994H188.004V128.994ZM191.004 133.994V133.004H189.014V133.994H191.004ZM192.004 132.994V131.004H191.014V132.994H192.004ZM188.014 132.994H189.004V131.004H188.014V132.994ZM191.004 130.004V130.994H189.014V130.004H191.004Z"
          fill="#0F380F"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M189.004 129.994H191.014V130.994H192.014V133.004H191.014V134.004H189.004V133.004H188.004V130.994H189.004V129.994ZM191.004 132.994H189.014V131.004H191.004V132.994Z"
          fill="#11ED83"
        />
        <path
          d="M188.004 127.994H192.014V128.994H193.014V129.994H194.014V134.004H193.014V135.004H192.014V137.004H191.014V138.004H189.004V137.004H188.004V135.004H187.004V134.004H186.004V129.994H187.004V128.994H188.004V127.994ZM191.004 136.994V134.994H192.004V133.994H193.004V130.004H192.004V129.004H188.014V130.004H187.014V133.994H188.014V134.994H189.014V136.994H191.004Z"
          fill="#11ED83"
        />
      </g>

      <g visibility={Location.Bronx == location ? "visible" : "hidden"}>
        <path d="M141.01 43.9948H140V45.0048H141.01V43.9948Z" fill="#0CA85D" />
        <path
          d="M136 37.9948H140.01V38.9948H141.01V43.0048H140.01V44.0048H139.01V46.0048H137V44.0048H136V43.0048H135V38.9948H136V37.9948ZM139 42.9948V42.0048H137.01V42.9948H139ZM140 41.9948V40.0048H139.01V41.9948H140ZM136.01 41.9948H137V40.0048H136.01V41.9948ZM139 39.0048V39.9948H137.01V39.0048H139Z"
          fill="#0F380F"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M137 38.9948H139.01V39.9948H140.01V42.0048H139.01V43.0048H137V42.0048H136V39.9948H137V38.9948ZM139 41.9948H137.01V40.0048H139V41.9948Z"
          fill="#11ED83"
        />
        <path
          d="M136 36.9948H140.01V37.9948H141.01V38.9948H142.01V43.0048H141.01V44.0048H140.01V46.0048H139.01V47.0048H137V46.0048H136V44.0048H135V43.0048H134V38.9948H135V37.9948H136V36.9948ZM139 45.9948V43.9948H140V42.9948H141V39.0048H140V38.0048H136.01V39.0048H135.01V42.9948H136.01V43.9948H137.01V45.9948H139Z"
          fill="#11ED83"
        />
      </g>
      <g visibility={Location.Jersey == location ? "visible" : "hidden"}>
        <path d="M75.0161 96.99H74.0061V98H75.0161V96.99Z" fill="#0CA85D" />
        <path
          d="M70.0061 90.99H74.0161V91.99H75.0161V96H74.0161V97H73.0161V99H71.0061V97H70.0061V96H69.0061V91.99H70.0061V90.99ZM73.0061 95.99V95H71.0161V95.99H73.0061ZM74.0061 94.99V93H73.0161V94.99H74.0061ZM70.0161 94.99H71.0061V93H70.0161V94.99ZM73.0061 92V92.99H71.0161V92H73.0061Z"
          fill="#0F380F"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M71.0061 91.99H73.0161V92.99H74.0161V95H73.0161V96H71.0061V95H70.0061V92.99H71.0061V91.99ZM73.0061 94.99H71.0161V93H73.0061V94.99Z"
          fill="#11ED83"
        />
        <path
          d="M70.0061 89.99H74.0161V90.99H75.0161V91.99H76.0161V96H75.0161V97H74.0161V99H73.0161V100H71.0061V99H70.0061V97H69.0061V96H68.0061V91.99H69.0061V90.99H70.0061V89.99ZM73.0061 98.99V96.99H74.0061V95.99H75.0061V92H74.0061V91H70.0161V92H69.0161V95.99H70.0161V96.99H71.0161V98.99H73.0061Z"
          fill="#11ED83"
        />
      </g>
    </Icon>
  );
};
