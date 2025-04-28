import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { AppContext } from "@/context/AppContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function LoginForm() {
  // const { setUser, setToken } = useContext(AppContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8080/v1/blog/auth/login", {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(formData);

      const data = await res.json();
      console.log(data);
      if (data.status) {
        // setUser(data.user);
        // console.log(data.user);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // setToken(data.token);
        navigate("/feed");
        toast.success("Login successful!");
      } else {
        toast.error(`${data.message}: Please try again : (`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className={cn("flex flex-col gap-6")} onSubmit={handleLogin}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Username</Label>
          <Input
            id="text"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            type="text"
            placeholder="John Doe"
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
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
          Don't have an account?{" "}
          <Link to={"/register"} className="underline font-bold">
            Register
          </Link>
        </p>
        <Button type="submit" className="w-full cursor-pointer">
          Login
        </Button>
      </div>
    </form>
  );
}
