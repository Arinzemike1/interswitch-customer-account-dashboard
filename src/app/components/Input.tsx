"use client";

import { ChangeEvent, useState } from "react";
import { FormikProps } from "formik";
import Icon from "./Icons/Icon";

interface InputProps {
  type: string;
  label?: string;
  id?: string;
  className?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  formik?: FormikProps<any>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  label,
  id,
  className,
  name,
  value,
  placeholder,
  formik,
  onChange,
  ...restProps
}: InputProps) => {
  const errorMessage = formik && name && formik.errors[name];
  const hasError = errorMessage && formik.touched[name];

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${label && "pb-6"}`}>
      {label && (
        <label className="flex justify-start pb-2 text-sm/[13px] tracking-tight font-semibold">
          {label}
        </label>
      )}

      <div className={`${type === "password" && "relative"}`}>
        <input
          className={`rounded-lg text-sm bg-transparent box-border placeholder:text-sm font-medium placeholder:tracking-normal placeholder:text-[#94ABBF] outline-none focus:border-primary px-5 h-[50px] w-full disabled:bg-[#F4F5F6] ${
            hasError ? "border border-error" : "border-all"
          } ${className}`}
          id={id}
          type={showPassword ? "text" : type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          {...restProps}
        />

        {type === "password" && (
          <Icon
            name={showPassword ? "eye-off" : "eye-on"}
            className="cursor-pointer absolute top-[27%] left-[85%] md:left-[89%]"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>

      <div>
        {hasError && (
          <span className="text-error inline-block text-sm font-medium pt-1">
            {typeof errorMessage === "string" && errorMessage}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
