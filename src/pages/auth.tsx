import Loginform from "@/components/forms/Login";
import RegisterForm from "@/components/forms/Register";
import { NextPageContext } from "next";
import { getCsrfToken } from "next-auth/react";

export default function auth({
  tab,
  callbackUrl,
  csrfToken,
}: {
  tab: string;
  callbackUrl: string;
  csrfToken: string;
}) {
  return (
    <div className="auth">
      <div className="h-screen w-screen flex items-center justify-center sm:pt-4 md:pt-0 ">
        <div className="box-home p-5 flex">
          <div className="text-login">
            {/* SIGN UP FORM */}
            {tab == "signin" ? (
              <Loginform callbackUrl={callbackUrl} csrfToken={csrfToken} />
            ) : (
              <RegisterForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { req, query } = ctx;
  const tab = query.tab ? query.tab : "signin";
  const callbackUrl = query.callbackUrl
    ? query.callbackUrl
    : process.env.NEXTAUTH_URL;

  const csrfToken = await getCsrfToken(ctx);
  return {
    props: {
      tab: JSON.parse(JSON.stringify(tab)),
      callbackUrl,
      csrfToken,
    },
  };
}
