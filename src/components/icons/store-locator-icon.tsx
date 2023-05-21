import { SvgIconProps } from "./icon-props";

const StoreLocatorIcon: React.FC<SvgIconProps> = () => (
  <svg width="24" height="24" fill="none" stroke="#fff" stroke-linejoin="round">
    <path d="M5.25 21.75h13.5" stroke-linecap="round" />
    <path d="M12 12.75a3 3 0 1 0 0-6 3 3 0 1 0 0 6z" />
    <path d="M19.5 9.75c0 6.75-7.5 12-7.5 12s-7.5-5.25-7.5-12a7.5 7.5 0 0 1 7.5-7.5 7.5 7.5 0 0 1 7.5 7.5z" />
  </svg>
);

export default StoreLocatorIcon;
