import { ReactNode, MouseEvent } from "react";
interface ButtonProps {
  className?: string;
  children?: ReactNode;
  primary?: boolean;
  plain?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  className,
  children,
  type,
  primary,
  plain,
  disabled,
  onClick,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center cursor-pointer rounded-lg h-10 text-sm py-3 px-5 disabled:cursor-no-drop font-semibold transition-all ${
        className && `${className}`
      } ${primary && "bg-primary text-white hover:text-white"} ${plain && "bg-transparent border border-primary"} ${
        disabled && "bg-primary/40 hover:bg-primary/50"
      }`}
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
