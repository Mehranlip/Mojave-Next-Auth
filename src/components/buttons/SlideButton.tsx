import { BeatLoader } from "react-spinners";

interface ISlideButtonProps {
  type?: "submit" | "reset" | "button";
  text: string;
  slide_text: string;
  icon: JSX.Element;
  disabled: boolean;
}

const SlideButton: React.FunctionComponent<ISlideButtonProps> = (props) => {
  const { type, text, slide_text, icon, disabled } = props;
  return (
    <button
      type={type}
      disabled={disabled}
      className="signout relative w-full inline-flex items-center justify-center  mt-4 overflow-hidden bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 group"
    >
      {disabled ? (
        <BeatLoader color="#fff" size={15} />
      ) : (
        <>
          <span className="signout absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease">
            {icon}&nbsp;{slide_text}
          </span>
          <span className="signout absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
            {text}
          </span>
          <span className="signout relative invisible">{text}</span>
        </>
      )}
    </button>
  );
};

export default SlideButton;
