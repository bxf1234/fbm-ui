import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const DivideIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path
      fillRule="evenodd"
      d="M12,15.75 C12.6903559,15.75 13.25,16.3096441 13.25,17 C13.25,17.6903559 12.6903559,18.25 12,18.25 C11.3096441,18.25 10.75,17.6903559 10.75,17 C10.75,16.3096441 11.3096441,15.75 12,15.75 Z M18,11 C18.55,11 19,11.45 19,12 C19,12.55 18.55,13 18,13 L6,13 C5.45,13 5,12.55 5,12 C5,11.45 5.45,11 6,11 L18,11 Z M12,5.75 C12.6903559,5.75 13.25,6.30964406 13.25,7 C13.25,7.69035594 12.6903559,8.25 12,8.25 C11.3096441,8.25 10.75,7.69035594 10.75,7 C10.75,6.30964406 11.3096441,5.75 12,5.75 Z"
    />
  </SvgIcon>
);

export default DivideIcon;
