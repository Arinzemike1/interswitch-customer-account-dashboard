import { ReactNode, ChangeEvent } from "react";
import { FormikProps } from "formik";

interface InputProps {
  label?: string;
  id?: string;
  className?: string;
  name?: string;
  value?: string;
  children: ReactNode;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  formik?: FormikProps<any>;
}

const Select = ({
  label,
  id,
  className,
  name,
  value,
  children,
  onChange,
  disabled = false,
  ...restProps
}: InputProps) => {
  return (
    <div className={`${label && "pb-6"}`}>
      {label && (
        <label className="flex justify-start pb-2 font-semibold text-[14px]/[13px] tracking-tight">
          {label}
        </label>
      )}

      <select
        className="rounded-md bg-transparent text-sm box-border border-all placeholder:text-sm placeholder:tracking-normal outline-none focus:border-primary px-2 h-10 w-full"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
