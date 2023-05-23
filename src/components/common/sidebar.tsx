import Image from "next/image";
import { SvgIconProps } from "../icons/";
import Link from "next/link";
interface SidebarItem {
  title: string;
  url?: string;
  icon: string | React.FC<SvgIconProps>;
  onClick?:()=> void;
}

export interface SidebarProps {
  items: Array<SidebarItem>;
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <div className="w-1/6 fixed sidebar bg-black min-h-screen	w-64 font-body">
      <div className="flex h-32 items-center justify-center">
        <span className="font-bold text-sm">
          <Link href="/">
            <Image
              src="/Logowhite 1.svg"
              alt="Divine Logo"
              height={"36"}
              width={"102"}
              className="hover:cursor-pointer"            
            />
          </Link>
        </span>
      </div>
      <hr />
      <div className="center font-normal max-h-[calc(100vh_-_64px)] overflow-y-auto ">
        <ul className="">
          {items.map(({ title, icon: Icon, url, onClick: onclick }) => {
            return (
              <Link href={url || "#"} key={url}  onClick={onclick}>
                <li className="flex p-4 cursor-pointer text-white h-16 text-left align-middle  hover:text-black hover:bg-white hover:align-middle items-center [&>svg]:hover:stroke-black">
                  {Icon && <Icon />}
                  <span className="ml-6 text-base leading-5" >{title}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
