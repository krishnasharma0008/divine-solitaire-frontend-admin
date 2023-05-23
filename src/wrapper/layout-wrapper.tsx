import React, { useEffect, useState } from "react";

import Sidebar, { SidebarProps } from "@/components/common/sidebar";
import Navbar from "@/components/common/navbar";
import {
  ActiveNotificationsIcon,
  EcomOrdersIcon,
  InsuranceIcon,
  PYDSIcon,
  QuestionIcon,
  ResaleIcon,
  SecondarySaleIcon,
  SignOutIcon,
  SpecialProductsIcon,
  StoreLocatorIcon,
  UserIcon,
} from "@/components/icons";
import PriceRequestIcon from "@/components/icons/price-request-icon";
import { getToken,deleteToken } from "@/local-storage";
import { useRouter } from "next/router";

const sidebarProps: SidebarProps = {
  items: [
    { title: "Users", url: "/admin/user", icon: UserIcon },
    { title: "Secondary Sale", icon: SecondarySaleIcon },
    { title: "Insurance", url: "/admin/insurance", icon: InsuranceIcon },
    { title: "Price Request", icon: PriceRequestIcon },
    { title: "Resale", url: "/admin/resale", icon: ResaleIcon },
    { title: "Ecom Orders", icon: EcomOrdersIcon },
    { title: "Store Locator", icon: StoreLocatorIcon },
    { title: "Special Products", icon: SpecialProductsIcon },
    { title: "Active Notifications", icon: ActiveNotificationsIcon },
    { title: "PYDS", icon: PYDSIcon },
    { title: "Log Out" , url: "/login", icon: SignOutIcon , onClick:(()=> deleteToken()) },
    { title: "Help", icon: QuestionIcon },
  ],
};

export interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { asPath } = useRouter();

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true);
    }
  }, [asPath]);

  if (!isLoggedIn || asPath === "/login") {
    return <>{children}</>;
  }
  return (
    <>
      <div className="flex">
        <Sidebar {...sidebarProps} />
        <div className="w-5/6 fixed right-0 flex-initial p-5 bg-gray-100 overflow-y-auto	h-full">
          <Navbar />
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutWrapper;
