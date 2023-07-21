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

interface ILoginformProps {
  callbackUrl: string;
  csrfToken: string;
}
const FormSchema = z.object({
  email: z.string().email("Please enter a valid email adress."),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters.")
    .max(52, "Password must be less than 52 characters."),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const Loginform: React.FunctionComponent<ILoginformProps> = (props) => {
  const { callbackUrl, csrfToken } = props;
  const router = useRouter();
  const path = router.pathname;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    const res: any = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl,
    });
    if (res.error) {
      return toast.error(res.error);
    } else {
      return router.push("/");
    }
  };

  return (
    <div>
      <h5 className="login-text">Sign in</h5>
      <p className="text-white mt-2 space-x-2">
        You do not have an account ? &nbsp;
        <a
          className="text-blue-300 hover:text-blue-700 hover:opacity-90 cursor-pointer"
          onClick={() => {
            router.push({
              pathname: path,
              query: {
                tab: "signup",
              },
            });
          }}
        >
          Sing up
        </a>
      </p>
      <form
        method="post"
        action="/api/auth/signin/email"
        className="my-8 text-sm md:w-96 sm:w-64"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
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
          name="password"
          label="Password"
          type="password"
          icon={<FiLock />}
          placeholder="***********"
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
        />
        <div className="mt-2 ">
          <Link className="text-white " href="/forgot">
            Forgot password ?
          </Link>
        </div>

        <SlideButton
          type="submit"
          text="Sign in"
          slide_text="Secure sign in"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default Loginform;
