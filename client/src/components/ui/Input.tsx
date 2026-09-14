import React, { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="mb-4 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          {...props}
          className={`
            w-full
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-white
            border ${
              error
                ? "border-rose-500 focus:ring-rose-500 focus:border-rose-500"
                : "border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
            }
            rounded-xl
            px-4
            py-2.5
            text-sm
            outline-hidden
            focus:ring-2
            transition duration-150
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            ${className}
          `}
        />

        {error && (
          <p className="text-rose-500 dark:text-rose-400 text-xs mt-1.5 font-medium">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1.5">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;