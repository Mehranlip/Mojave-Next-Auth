import { signIn } from "next-auth/react";
import * as React from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { SiAuth0 } from "react-icons/si";

interface ISocialButtonProps {
  id: string;
  text: string;
  csrfToken: string;
}

const colors: any = {
  auth0: "#eb5424",
  github: "#333",
  discord: "#7289da",
};
const SocialButton: React.FunctionComponent<ISocialButtonProps> = (props) => {
  const { id, text, csrfToken } = props;
  const createIconJsx = () => {
    switch (id) {
      case "auth0":
        return <SiAuth0 />;
      case "github":
        return <FaGithub />;
      case "discord":
        return <FaDiscord />;
      default:
        return;
    }
  };

  return (
    <form method="post" action={`/api/auth/signin/${id}`}>
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
      <button
        className=" w-full mb-2 py-2 px-1 flex  justify-center items-center gap-2 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
        type="button"
        onClick={() => signIn(id)}
        style={{ background: `${colors[id]}` }}
      >
        {createIconJsx()}
        {text}
      </button>
    </form>
  );
};

export default SocialButton;
