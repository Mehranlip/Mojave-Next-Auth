import * as React from "react";

interface IInputProps {
  name: string;
  label: string;
  type: string;
  icon: JSX.Element;
  placeholder: string;
}

const Input: React.FunctionComponent<IInputProps> = (props) => {
  const { name, label, type, icon, placeholder } = props;
  return (
    <div className="relative mt-1 ">
      <div className="pointer-events-none absolute left-0 inset-y-0 flex items-center pl-1">
        <span className="text-lg text-gray-600 ">{icon}</span>
      </div>
      <input
        className="input-com w-full py-2 pr-7 pl-8 block outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-blue-500 focus:ring-2  "
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
