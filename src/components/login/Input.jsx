import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { name, label, placeholder, styles, ...props },
  ref,
) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold text-black">
        {label}
      </label>
      <input
        ref={ref}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`${
          styles || ""
        }w-full rounded border-2 border-gray-200 px-2 py-3 text-sm font-medium text-black shadow-sm focus:outline-none`}
        {...props}
        required
      />
    </div>
  );
});

export default Input;
