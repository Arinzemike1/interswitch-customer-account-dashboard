"use client";

import { useState } from "react";
import clsx from "clsx";

interface SensitiveFieldProps {
  value: string;
  maskChar?: string;
  showLast?: number;
  className?: string;
}

const SensitiveField = ({
  value,
  maskChar = "*",
  showLast = 0,
  className,
}: SensitiveFieldProps) => {
  const [show, setShow] = useState(false);
  const maskAllButLast = (val: string, last: number) => {
    if (val.length <= last) return val;
    const maskLength = val.length - last;
    return maskChar.repeat(maskLength) + val.slice(-last);
  };
  const displayValue = show ? value : maskAllButLast(value, showLast);
  return (
    <span className={clsx("inline-flex items-center", className)}>
      <span>{displayValue}</span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShow((prev) => !prev);
        }}
        className="ml-1 text-xs text-[#777] underline focus:outline-none cursor-pointer"
      >
        {show ? "Hide" : "Show"}
      </button>
    </span>
  );
};

export default SensitiveField;
