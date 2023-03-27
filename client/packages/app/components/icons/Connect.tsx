import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const Connect = (props: SvgProps) => (
  <Svg width={24} height={24} fill="currentColor" {...props}>
    <Path d="M18.507 12.283a3.6 3.6 0 0 0-5.09-5.09l-.283.282 1.133 1.132.282-.282c.78-.78 2.048-.78 2.828 0 .78.78.78 2.048 0 2.828l-2.83 2.828a2.001 2.001 0 0 1-3.173-2.366 1.7 1.7 0 0 1 .157-.245l-1.28-.96a3.6 3.6 0 0 0 .338 4.703 3.6 3.6 0 0 0 5.09 0l2.828-2.83Zm-13.012-.565a3.6 3.6 0 0 0 5.091 5.09l.283-.282-1.133-1.133-.283.283a2 2 0 0 1-2.827 0 2.001 2.001 0 0 1 0-2.828l2.83-2.828a2.001 2.001 0 0 1 3.173 2.366 1.705 1.705 0 0 1-.158.245l1.28.96a3.6 3.6 0 0 0-5.428-4.703l-2.828 2.83Z" />
  </Svg>
);