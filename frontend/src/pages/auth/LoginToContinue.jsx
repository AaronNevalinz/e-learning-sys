import { LoginForm } from "@/components/login-form";
import loginImg from "/student.jpg";

export default function LoginToContinue() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 items-center flex-col-reverse gap-x-10 px-20">
      <div>
        <h1 className="text-center text-2xl">To continue;</h1>
        <LoginForm />
      </div>

      <div className="relative hidden h-[80%] bg-muted lg:block">
        <img
          src={loginImg}
          alt="Image"
          className="absolute inset-0 h-full rounded-md w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
