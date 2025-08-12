import Link from "next/link";
import Icon from "./Icons/Icon";
import Image from "next/image";
import Cookies from "js-cookie";

interface SidebarProps {
  openSidebar: boolean;
  setOpenSidebar: (visibility: boolean) => void;
}

const logoutUser = () => {
  Cookies.remove("access_token");
  window.location.href = "/auth/login";
};

const Sidebar: React.FC<SidebarProps> = ({ openSidebar, setOpenSidebar }) => {
  return (
    <>
      {openSidebar && (
        <div
          className="absolute left-0 top-0 z-10 h-screen w-screen opacity-5 md:h-0 md:w-0"
          onClick={() => setOpenSidebar(false)}
        ></div>
      )}
      <aside
        className={`fixed z-20 flex h-screen w-[224px] flex-col overflow-y-auto overflow-x-hidden border-r-[0.5px] border-primary bg-white ${
          openSidebar ? "flex" : "hidden md:flex"
        }`}
      >
        <ul className="flex list-none flex-col px-4">
          <li className="pb-20 pt-5 font-semibold mx-auto">
            <Link href="/dashboard" aria-label="Brand Logo">
              <Image src="/logo.svg" alt="Logo" width={130} height={34} />
            </Link>
          </li>

          <ul className="list-none p-0">
            <li
              className="mb-3 font-semibold"
              onClick={() => setOpenSidebar(false)}
            >
              <Link
                href="/accounts-overview"
                className="relative flex h-12 items-center font-medium gap-3 pl-4 z-10 bg-primary text-white rounded-lg"
              >
                <Icon name="overview" />
                <span className="mt-0.5 text-sm">Overview</span>
              </Link>
            </li>
          </ul>
        </ul>

        <div className="mt-auto mb-12 border-t pl-5 border-[#fbfbfb78] pt-10">
          <div className="flex items-center gap-3">
            <Icon name="logout" />
            <span
              className="text-sm font-semibold text-red-500 cursor-pointer"
              onClick={logoutUser}
            >
              Logout
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
