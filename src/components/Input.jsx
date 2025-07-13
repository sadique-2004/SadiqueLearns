import React, { useId } from "react";

const Input = React.forwardRef(
  ({ input, label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block mb-2 text-sm font-medium text-gray-700 pl-1"
          >
            {label}
          </label>
        )}

        <input
          id={id}
          ref={ref}
          type={type}
          className={`block w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          {...props}  // Spread props for additional attributes
        />
      </div>
    );
  }
);

export default Input;
