import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm({
    email: "",
    password: "",
  });
  const onSubmit = () => {
    alert("Form submitted!");
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="mb-5">
            <input
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalide email format",
                },
              })}
              className={`border ${
                formState.errors.email ? `border-red-500` : `border-gray-400`
              } rounded w-full text-gray-500 mr-3 py-3 px-2 leading-tight focus:outline-none`}
              type="email"
              placeholder="Email"
            />
            <span className="text-red-500">
              {formState.errors.email?.message}
            </span>
          </div>
          <div className="mb-5">
            <input
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
              className={`border ${
                formState.errors.password ? `border-red-500` : `border-gray-400`
              } rounded w-full text-gray-500 mr-3 py-3 px-2 leading-tight focus:outline-none`}
              type="password"
              placeholder="Password"
            />
            <span className="text-red-500">
              {formState.errors.password?.message}
            </span>
          </div>
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            send
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
