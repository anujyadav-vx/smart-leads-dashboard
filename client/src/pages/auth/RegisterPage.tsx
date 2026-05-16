import {
  useForm
} from "react-hook-form";

import { registerSchema } from "../../validations/auth.validation";

import {
  zodResolver
} from "@hookform/resolvers/zod";

import type { RegisterFormData } from "../../types/auth.types";

import Input
from "../../components/ui/Input";

import Button
from "../../components/ui/Button";

import {
  registerUser
} from "../../services/auth.service";

import toast
from "react-hot-toast";

import {
  useNavigate
} from "react-router-dom";

const RegisterPage = () => {

  const navigate =
    useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<RegisterFormData>({
    resolver:
      zodResolver(
        registerSchema
      )
  });

  const onSubmit = async (
    data: RegisterFormData
  ) => {

    try {

      await registerUser(data);

      toast.success(
        "Registration successful"
      );

      navigate("/login");

    }  catch (error: unknown) {

      toast.error(
       error instanceof Error
    ? error.message
    : "Something went wrong"
);
    }
  };

  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
    "
    >

      <div
        className="
        bg-white
        p-8
        rounded-lg
        shadow-md
        w-full
        max-w-md
      "
      >

        <h1
          className="
          text-2xl
          font-bold
          mb-6
          text-center
        "
        >
          Register
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
        >

          <Input
            label="Name"
            type="text"
            placeholder="Enter name"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mb-2">
              {errors.name.message}
            </p>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mb-2">
              {errors.email.message}
            </p>
          )}

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mb-4">
              {errors.password.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
          >

            {
              isSubmitting
                ? "Loading..."
                : "Register"
            }

          </Button>

        </form>

      </div>

    </div>
  );
};

export default RegisterPage;