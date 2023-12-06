import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRef } from "react";
import Input from "../utils/InputBlock";
import InputRadio from "../utils/InputRadio";

const RegisterForm = ({ loading, performRegister }) => {
  const { register, handleSubmit, formState, control, reset } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    adress: "",
    gender: "",
  });

  const passwordRef = useRef();
  passwordRef.current = useWatch({
    name: "password",
    control,
  });

  const onSubmit = (form) => {
    console.log("form : ", form);
    const { confirm_password, ...formDataWithoutConfirmPassword } = form;
    performRegister(formDataWithoutConfirmPassword);
    reset();
    alert("Form submitted!");
  };
  return (
    <>
      <div className="p-10 bg-white rounded-xl  shadow-lg space-x-4">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between mb-5">
            <div>
              <Input
                name="firstName"
                type="text"
                label="first Name"
                register={register}
                formState={formState}
              />
            </div>
            <div>
              <Input
                name="lastName"
                type="text"
                label="last Name"
                register={register}
                formState={formState}
              />
            </div>
          </div>
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
          <div className="flex justify-between mb-5">
            <div>
              <Input
                name="password"
                type="password"
                label="Your password"
                register={register}
                formState={formState}
              />
            </div>
            <div>
              <Input
                name="confirm_password"
                type="password"
                label="Password Confirmation"
                register={register}
                formState={formState}
                passwordRef={passwordRef}
              />
            </div>
          </div>
          <div className="mb-5">
            <Input
              name="phone"
              type="text"
              label="Your phone number"
              register={register}
              formState={formState}
              regex={/(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/}
            />
          </div>
          <div className="mb-5">
            <Input
              name="adress"
              type="text"
              label="Your adresse"
              register={register}
              formState={formState}
            />
          </div>

          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your gender
            </label>
            <div
              className={`flex border ${
                formState?.errors?.gender?.message
                  ? `border-red-500`
                  : `border-gray-400`
              } rounded w-full text-gray-500 p-1 leading-tight focus:outline-none`}
            >
              <InputRadio
                name="gender"
                id="female"
                label="FEMALE"
                register={register}
              />
              <InputRadio
                name="gender"
                id="Male"
                label="MALE"
                register={register}
              />
            </div>
            <span className="text-red-500">
              {formState?.errors?.gender?.message}
            </span>
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

          <p className="text-md font-light text-gray-500 dark:text-gray-400">
            Already have an account yet?{" "}
            <Link
              to={"/sign-in"}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
