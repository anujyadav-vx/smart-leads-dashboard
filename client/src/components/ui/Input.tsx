interface InputProps
extends
React.InputHTMLAttributes<
  HTMLInputElement
> {

  label: string;
}

const Input = ({
  label,
  ...props
}: InputProps) => {

  return (

    <div className="mb-4">

      <label
        className="
        block
        mb-2
        text-sm
        font-medium
      "
      >
        {label}
      </label>

      <input
        {...props}
        className="
        w-full
        border
        rounded-lg
        px-4
        py-2
        outline-none
        focus:ring-2
        focus:ring-black
      "
      />

    </div>
  );
};

export default Input;