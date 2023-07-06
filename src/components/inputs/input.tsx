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
  return <></>;
};

export default Input;
