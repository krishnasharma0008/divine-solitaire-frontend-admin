import React from "next";
import Image from "next/image";

const Navbar: React.FC = () => (
  <div className="h-12 flex border-b-2 border-b-stone-200 border-solid items-center text-sm text-neutral-600 bg-white mb-10">
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
      </div>
    </div>
  </div>
);

export default Navbar;
