import { ReactNode } from "react";
import Image from "next/image";

const AuthLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="grid md:grid-cols-[1.5fr_2fr] min-h-screen">
      <div className="hidden md:flex flex-col items-center justify-center bg-[#f8f8f8]">
        <Image src="/logo.svg" alt="Logo" width={130} height={34} />
        <h3 className="font-semibold text-lg text-black pt-5">
          Core-banking Customer Accounts Dashboard
        </h3>
      </div>

      <div className="flex flex-col md:justify-center px-6 md:px-48 pt-10 md:pt-0 bg-primary">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
