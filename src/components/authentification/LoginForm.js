import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../utils/InputBlock";

const LoginForm = ({ loading, performLogin }) => {
  const { register, handleSubmit, formState, reset } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = (formData) => {
    performLogin(formData);
    reset();
    alert("Form submitted!");
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <Input
                  name="email"
                  type="email"
                  label="Your email"
                  register={register}
                  formState={formState}
                  regex={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
                />
              </div>
              <div className="mb-5">
                <Input
                  name="password"
                  type="password"
                  label="Your password"
                  register={register}
                  formState={formState}
                />
              </div>
              <div className="mb-1">
                <a
                  href="#"
                  className="text-sm font-medium text-black hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  send
                </button>
              </div>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to={"/sign-up"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
