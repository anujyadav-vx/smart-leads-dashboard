interface ButtonProps
extends
React.ButtonHTMLAttributes<
  HTMLButtonElement
> {

  children: React.ReactNode;
}

const Button = ({
  children,
  ...props
}: ButtonProps) => {

  return (

    <button
      {...props}
      className="
      w-full
      bg-black
      text-white
      py-2
      rounded-lg
      hover:opacity-90
      transition
    "
    >
      {children}
    </button>
  );
};

export default Button;