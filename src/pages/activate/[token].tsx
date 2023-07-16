import axios from "axios";
import { NextPageContext } from "next";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Activate({ token }: { token: string }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    activateAccount();
  }, [token]);
  const activateAccount = async () => {
    try {
      const { data } = await axios.put("/api/auth/activate", { token });
      setSuccess(data.message);
    } catch (error: any) {
      setError((error?.response?.data as Error).message);
    }
  };
  return (
    <div className="home  h-screen flex items-center justify-center text-center">
      {error && (
        <div className=" box-home p-5">
          <p className="text-white text-xl font-bold ">{error}</p>
          <button
            className="text-white signout relative w-full inline-flex items-center justify-center  mt-4 overflow-hidden bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => signIn()}
          >
            Sign in instead
          </button>
        </div>
      )}
      {success && (
        <div className=" box-home p-5">
          <p className="text-white text-xl font-bold">{success}</p>
          <button
            className="text-white signout relative w-full inline-flex items-center justify-center  mt-4 overflow-hidden bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { query } = ctx;
  const token = query.token;
  return {
    props: { token },
  };
}
