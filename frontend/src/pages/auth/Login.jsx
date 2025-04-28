
import { LoginForm } from "@/components/login-form";
import loginImg from "/student.jpg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <h1>
            <Link
              className={
                "bg-gradient-to-r font-bold font-montserrat from-blue-900 to-red-500 inline-block text-transparent bg-clip-text text-xl "
              }
              to="/"
            >
              <div className="flex items-center gap-x-2">
                {/* <img src={logo} alt="" className="w-8" /> */}
                <span>
                  E-LearningSYS
                  <span className="italic font-black text-2xl">!</span>
                </span>
              </div>
            </Link>
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={loginImg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
