import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import loginImg from "/student.jpg";


export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const url = '';

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.status) {
      toast.success("You have successfull register. Login now :)");
      navigate("/login");
    }
  };
  return (
    <>
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
                    E-LearningSYS<span className="italic font-black text-2xl">!</span>
                  </span>
                </div>
              </Link>
            </h1>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <form className="flex flex-col gap-6" onSubmit={handleRegister}>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Register an account</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your details below to register an account
                  </p>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="">Username:</Label>
                    <Input
                      id="text"
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      type="text"
                      placeholder="Enter a username"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email:</Label>
                    <Input
                      id="text"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password:</Label>
                    </div>
                    <Input
                      id="password"
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      type="password"
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password Confirmation:</Label>
                    </div>
                    <Input
                      id="password"
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      type="password"
                    />
                  </div>
                  <p className="text-sm text-right">
                    Already have an account?{" "}
                    <Link to={"/Login"} className="underline font-bold">
                      Login
                    </Link>
                  </p>
                  <Button type="submit" className="w-full cursor-pointer">
                    Register
                  </Button>
                </div>
              </form>
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
    </>
  );
}
