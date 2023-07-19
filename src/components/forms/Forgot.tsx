import * as React from "react";
import Input from "../inputs/input";
import { FiLock, FiMail } from "react-icons/fi";
import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SlideButton from "../buttons/SlideButton";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Link from "next/link";
import axios from "axios";

interface IForgotFormProps {}
const FormSchema = z.object({
  email: z.string().email("Please enter a valid email adress."),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const ForgotForm: React.FunctionComponent<IForgotFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.post("/api/auth/forgot", {
        email: values.email,
      });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h5 className="login-text">Forgot password</h5>
      <p className="text-white mt-2 space-x-2">
        Sign in instead &nbsp;
        <Link
          href="/auth"
          className="text-blue-300 hover:text-blue-700 hover:opacity-90 cursor-pointer"
        >
          Sing in
        </Link>
      </p>
      <form className="my-8 text-sm w-96" onSubmit={handleSubmit(onSubmit)}>
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

        <SlideButton
          type="submit"
          text="send email"
          slide_text="Secure"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default ForgotForm;
