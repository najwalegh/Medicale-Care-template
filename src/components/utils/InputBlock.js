import React from "react";

const Input = ({
  name,
  type,
  label,
  register,
  formState,
  regex,
  passwordRef,
}) => {
  const validationRules = {
    required: { value: true, message: `${label} is required` },
  };

  if (regex) {
    validationRules.pattern = {
      value: regex,
      message: `Invalid ${label} format`,
    };
  }
  if (name === "confirm_password") {
    validationRules.validate = (value) =>
      value === passwordRef.current || "Passwords do not match";
  }

  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        {...register(name, validationRules)}
        className={`border ${
          formState.errors[name] ? `border-red-500` : `border-gray-400`
        } rounded w-full text-gray-500 mr-3 py-3 px-2 leading-tight focus:outline-none`}
        type={type}
        placeholder={label}
      />
      <span className="text-red-500">{formState.errors[name]?.message}</span>
    </div>
  );
};

export default Input;
