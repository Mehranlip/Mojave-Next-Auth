import Loginform from "@/components/forms/Login";
import RegisterForm from "@/components/forms/Register";
import { NextPageContext } from "next";

export default function auth({ tab }: { tab: string }) {
  console.log(tab);

  return (
    <div className="auth">
      <div className="h-screen w-screen flex items-center justify-center sm:pt-4 md:pt-0 ">
        <div className="box-home p-5 flex">
          <div className="text-login">
            {/* SIGN UP FORM */}
            {tab == "signin" ? <Loginform /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { req, query } = ctx;
  const tab = query.tab ? query.tab : "signin";

  return {
    props: {
      tab: JSON.parse(JSON.stringify(tab)),
    },
  };
}
