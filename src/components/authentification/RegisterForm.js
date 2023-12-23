import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRef } from "react";
import Input from "../utils/InputBlock";

const RegisterForm = ({ performRegister, loading }) => {
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
    performRegister(form);
    reset();
  };
  return (
    <>
      <div className="p-10 bg-white rounded-xl w-full shadow-lg space-x-4">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between space-x-4 mb-5">
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
          <div className="flex justify-between space-x-4 mb-5">
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

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your gender
            </label>
            <select
              className={`flex border ${
                formState?.errors?.gender ? "border-red-500" : "border-gray-400"
              } rounded w-full h-196 text-gray-500 p-1 leading-tight focus:outline-none`}
              {...register("gender", { required: "Please select a gender" })}
            >
              <option value="">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            <span className="text-red-500">
              {formState?.errors?.gender?.message}
            </span>
          </div>

          <div>
            <button type="submit" disabled={loading} className="btn btn-lg w-full rounded-lg mb-2">
              send
            </button>
          </div>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
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
