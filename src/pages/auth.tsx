import RegisterForm from "@/components/forms/Register";

export default function auth() {
  return (
    <div className="auth">
      <div className="h-screen w-screen flex items-center justify-center sm:pt-4 md:pt-0 ">
        <div className="box-home w-96 p-5 flex">
          <div className="text-login">
            <h5 className="login-text">Sign up</h5>
            <p className="text-white mt-2 space-x-2">
              You already have an account ? &nbsp;
              <a
                className="text-blue-300 hover:text-blue-700 hover:opacity-90 cursor-pointer"
                href=""
              >
                Sing in
              </a>
            </p>
            {/* SIGN UP FORM */}
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
