import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
} from "@chakra-ui/react";

export const ScrollDown = ({ ...props }: IconProps) => {
  return (
    <ChakraIcon viewBox="0 0 40 40" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.0033 5V6.99935H29.002V8.9987H31.0013V10.998H33.0007V14.9967H35V25.0033H33.0007V29.002H31.0013V31.0013H29.002V33.0007H25.0033V35H14.9967V33.0007H10.998V31.0013H8.9987V29.002H6.99935V25.0033H5V14.9967H6.99935V10.998H8.9987V8.9987H10.998V6.99935H14.9967V5H25.0033ZM11.0078 30.9915H15.0065V32.9909H24.9935V30.9915H28.9922V28.9922H30.9915V24.9935H32.9909V15.0065H30.9915V11.0078H28.9922V9.00846H24.9935V7.00911H15.0065V9.00846H11.0078V11.0078H9.00846V15.0065H7.00911V24.9935H9.00846V28.9922H11.0078V30.9915Z"
      />
      <path d="M14 20.0703H15.7216V21.7834H17.4347V23.4964H19.1478V25.2095H20.8522V23.4964H22.5653V21.7834H24.2784V20.0703H26V21.7919H24.2869V23.505H22.5739V25.2181H20.8608V26.9311H19.1392V25.2181H17.4261V23.505H15.7131V21.7919H14V20.0703Z" />
      <path d="M14 13.0703H15.7216V14.7834H17.4347V16.4964H19.1478V18.2095H20.8522V16.4964H22.5653V14.7834H24.2784V13.0703H26V14.7919H24.2869V16.505H22.5739V18.2181H20.8608V19.9311H19.1392V18.2181H17.4261V16.505H15.7131V14.7919H14V13.0703Z" />
    </ChakraIcon>
  );
};
