import * as React from "react";
import Input from "../inputs/input";
import { CiUser } from "react-icons/ci";
import { FiLock, FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { BsTelephone } from "react-icons/bs";

import { useState, useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";
import zxcvbn from "zxcvbn";
import SlideButton from "../buttons/SlideButton";
import { toast } from "react-toastify";

interface IRegisterFromProps {}
const FormSchema = z
  .object({
    first_name: z
      .string()
      .min(2, "First name atleast 2 characters")
      .max(32, "First name less than 32 characters")
      .regex(new RegExp("^[a-zA-z]+$"), "No special characters allowed."),
    last_name: z
      .string()
      .min(2, "Last name atleast 2 characters")
      .max(32, "Last name less than 32 characters")
      .regex(new RegExp("^[a-zA-z]+$"), "No special characters allowed."),
    email: z.string().email("Please enter a valid email adress."),
    phone: z.string().refine(validator.isMobilePhone, {
      message: "Please enter a valid phone number",
    }),
    password: z
      .string()
      .min(6, "Password must be atleast 6 characters.")
      .max(52, "Password must be less than 52 characters."),
    confirmPassword: z.string(),
    accept: z.literal(true, {
      errorMap: () => ({
        message:
          "Please agree to all the terms and conditions before continuing.",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;
const RegisterForm: React.FunctionComponent<IRegisterFromProps> = (props) => {
  const [passwordScore, setPasswordScore] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: any) => console.log(data);

  const validatePasswordStrength = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePasswordStrength());
  }, [watch().password]);

  return (
    <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="gap-2 md:flex">
        <Input
          name="first_name"
          label="First name"
          type="text"
          icon={<CiUser />}
          placeholder="Mehran"
          register={register}
          error={errors?.first_name?.message}
          disabled={isSubmitting}
        />
        <Input
          name="last_name"
          label="Last name"
          type="text"
          icon={<CiUser />}
          placeholder="Asadi"
          register={register}
          error={errors?.last_name?.message}
          disabled={isSubmitting}
        />
      </div>
      <Input
        name="email"
        label="Email"
        type="text"
        icon={<FiMail />}
        placeholder="contact@email.ir"
        register={register}
        error={errors?.email?.message}
        disabled={isSubmitting}
      />
      <Input
        name="phone"
        label="Phone number"
        type="text"
        icon={<BsTelephone />}
        placeholder="+(xxx) xxx-xx-xx"
        register={register}
        error={errors?.phone?.message}
        disabled={isSubmitting}
      />
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
      <div className="flex items-center mt-3">
        <input
          type="checkbox"
          id="accept"
          className="mr-2 focus:ring-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
          {...register("accept")}
        />
        <label htmlFor="accept" className="text-white">
          I accept the&nbsp;{" "}
          <a
            href=""
            className="text-blue-200 hover:text-blue-700 hover:underline"
            target="_blank"
          >
            terms
          </a>
          &nbsp;and&nbsp;
          <a
            href=""
            className="text-blue-200 hover:text-blue-700 hover:underline"
            target="_blank"
          >
            privacy policy
          </a>
        </label>
      </div>
      <div>
        {errors.accept && (
          <p className="text-sm text-[#f53737] mt-1">
            {errors?.accept?.message}
          </p>
        )}
      </div>
      <SlideButton
        type="submit"
        text="Sign up"
        slide_text="Secure sign up"
        icon={<FiLock />}
        disabled={isSubmitting}
      />
    </form>
  );
};

export default RegisterForm;
