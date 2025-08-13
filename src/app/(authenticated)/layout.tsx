"use client";

import { Fragment, ReactNode, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AuthenticatedLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Fragment>
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      <div className="flex min-h-screen w-full gap-5 bg-[#F6F6F8] px-4 pb-[60px] pt-24 xl:pb-5">
        <main className="relative box-border md:ml-[224px] w-full">
          {children}
        </main>
      </div>
    </Fragment>
  );
};

export default AuthenticatedLayout;
