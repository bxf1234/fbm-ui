import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const LinearIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path
      fillRule="evenodd"
      d="M19.5,9.5 C18.47,9.5 17.6,10.12 17.21,11 L14.29,11 C13.9,10.12 13.03,9.5 12,9.5 C10.97,9.5 10.1,10.12 9.71,11 L6.79,11 C6.4,10.12 5.53,9.5 4.5,9.5 C3.12,9.5 2,10.62 2,12 C2,13.38 3.12,14.5 4.5,14.5 C5.53,14.5 6.4,13.88 6.79,13 L9.71,13 C10.1,13.88 10.97,14.5 12,14.5 C13.03,14.5 13.9,13.88 14.29,13 L17.21,13 C17.6,13.88 18.47,14.5 19.5,14.5 C20.88,14.5 22,13.38 22,12 C22,10.62 20.88,9.5 19.5,9.5 Z"
    />
  </SvgIcon>
);

export default LinearIcon;
