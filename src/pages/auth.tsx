import Loginform from "@/components/forms/Login";
import RegisterForm from "@/components/forms/Register";

export default function auth() {
  return (
    <div className="auth">
      <div className="h-screen w-screen flex items-center justify-center sm:pt-4 md:pt-0 ">
        <div className="box-home p-5 flex">
          <div className="text-login">
            {/* SIGN UP FORM */}
            {/* <RegisterForm /> */}
            <Loginform />
          </div>
        </div>
      </div>
    </div>
  );
}
