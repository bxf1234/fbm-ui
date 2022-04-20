import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const DocumentIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path
      fillRule="evenodd"
      d="M14.1093,4 C14.3806576,4 14.6403641,4.11027766 14.8288155,4.30552362 L18.7195155,8.33650152 C18.8994448,8.52291808 19,8.77189166 19,9.0309779 L19,18 C19,19.1045695 18.1045695,20 17,20 L7,20 C5.8954305,20 5,19.1045695 5,18 L5,5 C5,4.44771525 5.44771525,4 6,4 L14.1093,4 Z M13.684,6 L7,6 L7,18 L17,18 L17,9.435 L13.684,6 Z M15.1182372,14.1809254 L15.1182372,15.9809254 L8.9,15.9809254 L8.9,14.1809254 L15.1182372,14.1809254 Z M15.1182372,11.1809254 L15.1182372,12.9809254 L8.9,12.9809254 L8.9,11.1809254 L15.1182372,11.1809254 Z"
    />
  </SvgIcon>
);

export default DocumentIcon;
