import * as React from "react";
import Input from "../inputs/input";
import { CiUser } from "react-icons/ci";
import { FiLock, FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { BsTelephone } from "react-icons/bs";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";

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
    // accept: z.literal(true, {
    //   errorMap: () => ({
    //     message:
    //       "Please agree to all the terms and conditions before continuing.",
    //   }),
    // }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;
const RegisterForm: React.FunctionComponent<IRegisterFromProps> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: any) => console.log(data);

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
      <button
        className="signout w-full mt-4  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
