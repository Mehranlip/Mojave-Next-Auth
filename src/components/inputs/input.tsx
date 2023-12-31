import * as React from "react";
import { useState } from "react";

import { IoAlertCircle } from "react-icons/io5";
import { ImEyeBlocked, ImEye } from "react-icons/im";

interface InputProps {
  name: string;
  label: string;
  type: string;
  icon: JSX.Element;
  placeholder: string;
  register: any;
  error: any;
  disabled: boolean;
}

const Input: React.FunctionComponent<InputProps> = (props) => {
  const { name, label, type, icon, placeholder, register, error, disabled } =
    props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className=" w-[100%] mt-3">
      <label htmlFor={name} className="text-white ">
        {label}
      </label>
      <div className="relative mt-1 ">
        <div
          className="pointer-events-none absolute left-0 top-0.5 inset-y-0 flex items-center pl-1"
          style={{ transform: `${error ? "translateY(-10px)" : ""}` }}
        >
          <span className="text-lg text-gray-600 ">{icon}</span>
        </div>
        <input
          className="input-com w-full py-2 pr-7 pl-8 block outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-blue-500 focus:ring-2  "
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          {...register(name)}
          style={{
            borderColor: `${error ? "#ED4337" : ""}`,
          }}
        />
        {/* {show and hide password} */}
        {(name == "password" || name == "confirmPassword") && (
          <div
            className="absolute right-2 top-2.5 text-xl text-gray-400 cursor-pointer"
            style={{ right: `${error ? "2rem" : ""}` }}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <ImEye /> : <ImEyeBlocked />}
          </div>
        )}
        {error && (
          <div className="fill-red-500 absolute right-2 top-2.5 text-xl">
            <IoAlertCircle fill="#ED4337" />
          </div>
        )}
        {error && (
          <p className="text-sm text-[#c5c5c5] mt-1 w-fit rounded-xl px-1">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
