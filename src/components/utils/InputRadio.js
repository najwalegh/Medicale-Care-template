import React from "react";

const InputRadio = ({ name, id, label, register }) => {
  const validationRules = {
    required: { value: true, message: `gender is required` },
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center ps-4 rounded dark:border-gray-700">
        <input
          id={id}
          type="radio"
          {...register(name, validationRules)}
          name={name}
          className="w-4 h-4 text-blue-600 bg-gray-100  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for={id}
          className="w-full py-4 ms-2 text-primary font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default InputRadio;
