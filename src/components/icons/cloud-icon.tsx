import { SvgIconProps } from "./icon-props";

const CloudIcon: React.FC<SvgIconProps> = ({ className }) => (
  <svg fill="none" viewBox="0 0 32 33" className={className}>
    <g
      clip-path="url(#a)"
      stroke="#161616"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m12 26.5h-3c-0.99255-0.0012-1.9735-0.2135-2.8777-0.6228-0.90424-0.4093-1.7111-1.0061-2.3671-1.751-0.65595-0.7449-1.146-1.6208-1.4376-2.5696-0.29162-0.9487-0.37814-1.9486-0.25382-2.9334 0.12432-0.9847 0.45664-1.9317 0.9749-2.7782s1.2106-1.5732 2.0311-2.1317 1.7504-0.9361 2.728-1.1078c0.97758-0.1717 1.9805-0.1335 2.9422 0.112" />
      <path d="m10 16.5c0-1.5845 0.3765-3.1464 1.0986-4.5568 0.722-1.4105 1.7689-2.6291 3.0543-3.5556 1.2854-0.92649 2.7726-1.5342 4.339-1.7732s3.1672-0.10227 4.6704 0.3988 2.8658 1.3522 3.9755 2.4832c1.1098 1.131 1.9349 2.5096 2.4073 4.022 0.4725 1.5125 0.5788 3.1155 0.3101 4.6771-0.2686 1.5616-0.9045 3.037-1.8552 4.3046" />
      <path d="m15 20.5 4-4 4 4" />
      <path d="m19 26.5v-10" />
    </g>
    <defs>
      <clipPath id="a">
        <rect transform="translate(0 .5)" width="32" height="32" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);

export default CloudIcon;
