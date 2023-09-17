import React from 'react'

import { SvgIconProps } from './icon-props'

interface DownloadProps extends SvgIconProps {
  strokeColor: string
}

const Download: React.FC<DownloadProps> = ({ strokeColor }) => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="8666778_download_down_save_icon 1">
      <g id="Group 14">
        <path
          id="Vector"
          d="M36.4118 27.5294V33.1765C36.4118 33.9254 36.1143 34.6435 35.5848 35.173C35.0553 35.7026 34.3371 36 33.5882 36H13.8235C13.0747 36 12.3565 35.7026 11.827 35.173C11.2975 34.6435 11 33.9254 11 33.1765V27.5294"
          stroke={strokeColor} // Use the passed stroke color
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path id="Vector_2" d="M16.647 21.8824L23.7058 28.9412L30.7646 21.8824" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round" />
        <path id="Vector_3" d="M23.7061 28.9412V12" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </g>
  </svg>
)

export default Download
