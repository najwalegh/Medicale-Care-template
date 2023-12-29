import { useForm, useWatch } from "react-hook-form";
import Input from "../utils/InputBlock";

const UserForm = ({ performRegister, loading, service }) => {
  const { register, handleSubmit, formState, control, reset } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    adress: "",
    gender: "",
    role: "",
  });

  const onSubmit = (formData) => {
    const formDataWithService = { ...formData, service };
    console.log("form data : ", formDataWithService);
    performRegister(formDataWithService);
    reset();
  };
  return (
    <>
      <div className="p-6 bg-white rounded-xl w-full shadow-lg space-x-4">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between space-x-4 mb-5">
            <div>
              <Input
                name="firstName"
                type="text"
                label="prenom"
                register={register}
                formState={formState}
              />
            </div>
            <div>
              <Input
                name="lastName"
                type="text"
                label="Nom"
                register={register}
                formState={formState}
              />
            </div>
          </div>
          <div className="mb-5">
            <Input
              name="email"
              type="email"
              label="Email"
              register={register}
              formState={formState}
              regex={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
            />
          </div>
          <div className="mb-5">
            <Input
              name="password"
              type="password"
              label="Mot de passe"
              register={register}
              formState={formState}
            />
          </div>
          <div className="mb-5">
            <Input
              name="phone"
              type="text"
              label="Tel"
              register={register}
              formState={formState}
              regex={/(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/}
            />
          </div>
          <div className="mb-5">
            <Input
              name="adress"
              type="text"
              label="Adresse"
              register={register}
              formState={formState}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Role: Medecin Ou Patient
            </label>
            <select
              className={`flex border ${
                formState?.errors?.gender ? "border-red-500" : "border-gray-400"
              } rounded w-full h-196 text-gray-500 p-1 leading-tight focus:outline-none`}
              {...register("role", { required: "SVP le role" })}
            >
              <option value="">Select</option>
              <option value="MEDECIN">Medecin</option>
              <option value="ASSISTANT">Assistant</option>
            </select>
            <span className="text-red-500">
              {formState?.errors?.role?.message}
            </span>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Genre
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
            <button
              type="submit"
              disabled={loading}
              className="btn btn-lg w-full rounded-lg mb-2"
            >
              enregistrez
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserForm;
