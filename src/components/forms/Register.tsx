import * as React from "react";
import Input from "../inputs/input";
import { CiUser } from "react-icons/ci";

interface IRegisterFromProps {}

const RegisterForm: React.FunctionComponent<IRegisterFromProps> = (props) => {
  return (
    <form className="my-8 text-sm">
      <div className="gap-2 md:flex">
        <Input
          name="first_name"
          label="First name"
          type="text"
          icon={<CiUser />}
          placeholder="example"
        />
      </div>
    </form>
  );
};

export default RegisterForm;
