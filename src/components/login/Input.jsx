const Input = ({ id, type, label, placeholder }) => {
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
        className="w-full rounded border-2 border-gray-200 px-2 py-3 text-sm font-medium shadow-sm focus:outline-none"
        required
      />
    </div>
  );
};

export default Input;
