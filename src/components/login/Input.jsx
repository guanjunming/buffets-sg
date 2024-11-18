const Input = ({ id, type, label, placeholder, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded border-2 border-gray-300 p-2 text-sm font-medium shadow-sm focus:outline-none"
        {...props}
        required
      />
    </div>
  );
};

export default Input;
