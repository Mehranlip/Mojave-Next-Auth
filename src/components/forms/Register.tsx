import * as React from "react";
import Input from "../inputs/input";
import { CiUser } from "react-icons/ci";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IRegisterFromProps {}
const FormSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be atleast 2 characters.")
    .max(32, "First name must be lass than 32 characters.")
    .regex(new RegExp("^[a-zA-z]+$^"), "No special characters allowed."),
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
          placeholder="example"
          register={register}
          error={errors?.first_name?.message}
          disabled={isSubmitting}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default RegisterForm;
