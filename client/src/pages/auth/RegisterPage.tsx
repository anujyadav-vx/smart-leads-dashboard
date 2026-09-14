import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterFormData } from "../../types/auth.types";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { registerUser } from "../../services/auth.service";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, Eye, EyeOff } from "lucide-react";

interface ExtendedRegisterData extends RegisterFormData {
  role?: "sales" | "admin";
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExtendedRegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "sales",
    },
  });

  const onSubmit = async (data: ExtendedRegisterData) => {
    try {
      await registerUser(data);
      toast.success("Account created successfully! Please sign in.");
      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          (error instanceof Error ? error.message : "Registration failed")
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 transition-colors">
      <div className="w-full max-w-md">
        {/* Brand Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/25 mb-3">
            <Sparkles size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Join SmartLeads CRM
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create an account to start managing your pipeline
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="e.g. Jordan Bennett"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Work Email"
              type="email"
              placeholder="name@company.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 6 characters"
                error={errors.password?.message}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-[38px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className="mt-2"
            >
              Create Account
            </Button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;