import SocialButton from "@/components/buttons/SocialButton";
import Loginform from "@/components/forms/Login";
import RegisterForm from "@/components/forms/Register";
import { NextPageContext } from "next";
import { getCsrfToken, getProviders } from "next-auth/react";

export default function auth({
  tab,
  callbackUrl,
  csrfToken,
  providers,
}: {
  tab: string;
  callbackUrl: string;
  csrfToken: string;
  providers: any;
}) {
  return (
    <div className="auth ">
      <div className="h-screen w-screen flex items-center justify-center sm:pt-4 md:pt-0 ">
        <div className="box-home p-5 flex">
          <div className="text-login">
            {/* SIGN UP FORM */}
            {tab == "signin" ? (
              <Loginform callbackUrl={callbackUrl} csrfToken={csrfToken} />
            ) : (
              <RegisterForm />
            )}
            <div className="flex items-center justify-between">
              <div className="w-full h-[1px] bg-gray-300"></div>
              <span className="text-sm uppercase mx-6 text-white">Or</span>
              <div className="w-full h-[1px] bg-gray-300"></div>
            </div>
            {/* coustom providers */}
            <div className="mt-2  grid grid-cols-2 gap-2 m-0">
              {providers.map((provider: any) => {
                if (provider.name == "Credentials") return;
                return (
                  <SocialButton
                    key={provider.id}
                    id={provider.id}
                    text={
                      tab == "signup"
                        ? `Sign up with ${provider.name}`
                        : `Sign in with ${provider.name}`
                    }
                    csrfToken={csrfToken}
                  />
                );
              })}
            </div>
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
  const providers = await getProviders();
  return {
    props: {
      providers: Object.values(providers!),
      tab: JSON.parse(JSON.stringify(tab)),
      callbackUrl,
      csrfToken,
    },
  };
}
