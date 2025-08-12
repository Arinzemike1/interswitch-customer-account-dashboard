import { MouseEvent } from "react";

interface iconProps {
  name:
    | string
    | {
        [key: number]: string;
      }
    | undefined;
  className?: string;
  color?: string;
  size?: string;
  width?: string;
  height?: string;
  onClick?: (
    e?: MouseEvent<HTMLSpanElement>
  ) => void | Promise<void> | undefined;
}

const Icon = ({
  name,
  className,
  color,
  size,
  width,
  height,
  onClick,
  ...restProps
}: iconProps) => {
  if (name === "" || color === "") {
    return null;
  }

  try {
    const Image = require(`./stock/${name}`).default;
    if (Image) {
      return (
        <span className={`flex items-center ${className}`} onClick={onClick}>
          <Image
            aria-label={name}
            color={color}
            size={size}
            width={width}
            height={height}
            {...restProps}
          />
        </span>
      );
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default Icon;
