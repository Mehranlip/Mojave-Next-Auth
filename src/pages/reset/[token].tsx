import ForgotForm from "@/components/forms/Forgot";
import ResetForm from "@/components/forms/Reset";
import { NextPageContext } from "next";

export default function Reset({ token }: { token: string }) {
  return (
    <div className="auth ">
      <div className="h-screen w-screen flex items-center justify-center sm:pt-4 md:pt-0 ">
        <div className="box-home p-5 flex">
          <div className="text-login">
            {/* forgot FORM */}
            <ResetForm token={token} />
          </div>
        </div>
      </div>
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
