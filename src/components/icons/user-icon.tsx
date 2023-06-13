import { SvgIconProps } from './icon-props'

const UserIcon: React.FC<SvgIconProps> = () => (
  <svg width="24" height="24" fill="none" stroke="#fff">
    <path d="M12 15a6 6 0 1 0 0-12 6 6 0 1 0 0 12z" stroke-miterlimit="10" />
    <path d="M2.906 20.25A10.5 10.5 0 0 1 12 14.999a10.5 10.5 0 0 1 9.094 5.251" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
)

export default UserIcon
