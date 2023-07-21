import * as React from "react";
import Input from "../inputs/input";
import { FiLock, FiMail } from "react-icons/fi";
import { SubmitHandler, useForm } from "react-hook-form";

import { useState, useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import SlideButton from "../buttons/SlideButton";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";

interface IResetFormProps {
  token: string;
}
const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be atleast 6 characters.")
      .max(52, "Password must be less than 52 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;

const ResetForm: React.FunctionComponent<IResetFormProps> = (props) => {
  const { token } = props;
  const [passwordScore, setPasswordScore] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.post("/api/auth/reset", {
        password: values.password,
        token,
      });
      reset();
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const validatePasswordStrength = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePasswordStrength());
  }, [watch().password]);

  return (
    <div>
      <h5 className="login-text">Reset password</h5>
      <p className="text-white mt-2 space-x-2">
        Sign in instead ? &nbsp;
        <Link
          className="text-blue-300 hover:text-blue-700 hover:opacity-90 cursor-pointer"
          href="/auth"
        >
          Sing in
        </Link>
      </p>
      <form className="my-8 text-sm w-96" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="password"
          label="Password"
          type="password"
          icon={<FiLock />}
          placeholder="***********"
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
        />
        {watch().password?.length > 0 && (
          <div className="flex mt-2">
            {Array.from(Array(5).keys()).map((span, i) => (
              <span className="w-1/5 px-1" key={i}>
                <div
                  className={`h-2 rounded-xl b ${
                    passwordScore <= 2
                      ? "bg-red-400 opacity-70"
                      : passwordScore < 4
                      ? "bg-yellow-400 opacity-70"
                      : "bg-green-500 opacity-70"
                  }`}
                ></div>
              </span>
            ))}
          </div>
        )}
        <Input
          name="confirmPassword"
          label="Confirm password"
          type="password"
          icon={<FiLock />}
          placeholder="***********"
          register={register}
          error={errors?.confirmPassword?.message}
          disabled={isSubmitting}
        />

        <SlideButton
          type="submit"
          text="Change password"
          slide_text="Secure "
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default ResetForm;
