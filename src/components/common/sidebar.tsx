import Image from "next/image";
import { SvgIconProps } from "../icons/";

interface SidebarItem {
  title: string;
  url?: string;
  icon: string | React.FC<SvgIconProps>;
}

export interface SidebarProps {
  items: Array<SidebarItem>;
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <div className="sidebar bg-black min-h-screen	w-64 font-body">
      <div className="flex h-32 items-center justify-center">
        <span className="font-bold text-sm">
          
          <Image
            src="/Logowhite 1.svg"
            alt="Divine Logo"
            height={"36"}
            width={"102"}
            className="hover:cursor-pointer"            
          />
        </span>
      </div>
      <hr />
      <div className="center font-normal">
        <ul className="">
          {items.map(({ title, icon: Icon, url }) => {
            return (
              <a href={url || "#"} key={url}>
                <li className="flex p-4 cursor-pointer text-white h-16 text-left align-middle  hover:text-black hover:bg-white hover:align-middle items-center [&>svg]:hover:stroke-black">
                  {Icon && <Icon />}
                  <span className="ml-6 text-base leading-5">{title}</span>
                </li>
              </a>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
