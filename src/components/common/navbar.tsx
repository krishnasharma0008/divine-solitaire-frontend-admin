import React from "next";
import Image from "next/image";
import { TriangleDownIcon } from "../icons";
import { useState } from "react";
import { deleteToken } from "@/local-storage";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { push } = useRouter();
  const openUserDropdown = () => setOpen((oldVal) => !oldVal);

  const logout = () => {
    deleteToken();
    push("/login");
  };

  return (
    <div className="h-12 flex border-b-2 border-b-stone-200 border-solid items-center text-sm text-neutral-600 bg-white mb-10 rounded">
      <div className="w-full p-5 flex items-center justify-between">
        <div className="p-5 flex items-center p-1">Dashboard</div>
        <div className="flex items-center">
          <div className="mr-5 relative">Users</div>
          <div className="mr-5 relative">
            <Image
              src="https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
              alt=""
              className="w-8 h-8 rounded-full"
              width={30}
              height={30}
            />
          </div>
          <span onClick={openUserDropdown}>
            <TriangleDownIcon className="w-4" />
          </span>
          {open && (
            <div className="fixed w-24 h-12 bg-white p-1.5 float-right top-12 right-0 border-2">
              <button
                className=" hover:bg-white-700 font-bold py-2 px-4 rounded shadow"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
