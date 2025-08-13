export const Loader: React.FC<{ forButton?: boolean }> = ({ forButton }) => {
  return (
    <div
      className={`${
        !forButton &&
        "bg-black h-screen w-screen left-0 top-0 fixed z-40 opacity-70 flex items-center justify-center text-primary-100 overflow-hidden"
      }`}
    >
      <div
        className={`${
          forButton ? "h-4 w-4" : "h-16 w-16"
        } rounded-full border-t-4 border-white animate-spin`}
      ></div>
    </div>
  );
};

export default Loader;
