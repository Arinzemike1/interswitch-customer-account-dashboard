import { ReactNode, MouseEvent } from "react";
interface ButtonProps {
  className?: string;
  children?: ReactNode;
  danger?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: (e?:MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  className,
  children,
  type,
  disabled,
  onClick,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center cursor-pointer rounded-lg h-12 w-full text-sm py-3 px-5 bg-primary text-white hover:text-white disabled:cursor-no-drop font-semibold transition-all ${
        className && `${className}`
      } ${disabled && "bg-primary/40 hover:bg-primary/50"}`}
      type={type || "submit"}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
