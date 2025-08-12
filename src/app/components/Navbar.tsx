"use client";
import React, { useEffect, useState } from "react";
import Icon from "./Icons/Icon";

interface NavbarProps {
  openSidebar: boolean;
  setOpenSidebar: (visibility: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ openSidebar, setOpenSidebar }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-white px-6 py-5 md:left-[224px]">
      <div className="flex items-center gap-3">
        <Icon name="overview" color="#1B4A41" />
        <p className="text-xl font-semibold">Accounts Overview</p>
      </div>

      <div className="flex items-center gap-5">
        <Icon
          name={openSidebar ? "close" : "hamburger"}
          className="md:hidden"
          onClick={() => setOpenSidebar(!openSidebar)}
        />

        <div className="hidden items-center gap-3 md:flex">
          <Icon name="avatar" />

          <div className="flex items-center gap-5 !leading-none">
            {isClient && (
              <p className="text-sm font-semibold !capitalize !text-black">
                Hi, Arinze
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
