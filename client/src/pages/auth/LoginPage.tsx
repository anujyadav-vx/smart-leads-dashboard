import {
  useForm
} from "react-hook-form";
import { loginSchema } from "../../validations/auth.validation";

import {
  zodResolver
} from "@hookform/resolvers/zod";

import type { LoginFormData } from "../../types/auth.types";

import Input
from "../../components/ui/Input";

import Button
from "../../components/ui/Button";

import {
  loginUser
} from "../../services/auth.service";

import toast
from "react-hot-toast";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../../store/AuthContext";

const LoginPage = () => {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<LoginFormData>({
    resolver:
      zodResolver(
        loginSchema
      )
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {

    try {

      const response =
        await loginUser(data);

      const {
        token,
        user
      } = response.data;

      login(token, user);

      toast.success(
        "Login successful"
      );

      navigate("/dashboard");

    } catch (error: unknown) {

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
          Login
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
        >

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
                : "Login"
            }

          </Button>

        </form>

      </div>

    </div>
  );
};

export default LoginPage;