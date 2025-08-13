"use client";

import { ReactNode, Fragment } from "react";
import Icon from "./Icons/Icon";

interface ModalProps {
  isOpen: boolean;
  title: string;
  subTitle: string;
  icon: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  title,
  subTitle,
  icon,
  children,
}: 
ModalProps) {
  if (!isOpen) return null;
  return (
    <Fragment>
      <div className="bg-black opacity-70 fixed top-0 left-0 z-50 w-full h-full"></div>
      <div className="fixed inset-0 z-50 overflow-auto flex">
        <div className="relative p-5 md:p-8 bg-white w-[400px] flex flex-col rounded-xl m-auto mx-4 md:mx-auto">
          <div className="flex flex-col gap-3 justify-center items-center">
            <Icon name={icon} />
            <h3 className="text-light text-lg md:text-xl font-semibold">
              {title}
            </h3>
            <p className="text-light text-sm font-normal pt-1">{subTitle}</p>
          </div>
          <div className="mt-3">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}
