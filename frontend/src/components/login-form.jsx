import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AppContext } from "@/context/AppContext";

export function LoginForm() {
  const { setToken, setUser, setUserRole } = useContext(AppContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setErrors] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault();

    let url = "http://localhost:8000/api/v1/auth/login";

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const res = await fetch(url, options);

      const data = await res.json();

      if (data.status == 200) {
        localStorage.setItem("token", data.result.token);
        localStorage.setItem("userRole", data.role);
        setToken(data.result.token);
        setUserRole(data.role)
        setUser({id:data.id, username:data.username})
        localStorage.setItem(
          "user",
          JSON.stringify({ id: data.id, username: data.username })
        );
        if (data.role === "ADMIN") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }

        toast.success("Login successful!");
        console.log(data);
        // console.log(user);
        
        
      }else{
        setErrors(data.errors)
        
      }
    } catch (error) {
      console.log(error.message);
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
        <div>
          {error && <p className="text-xs text-red-500 text-center">{error.authentication}</p>}
        </div>
        <p className="text-sm text-right">
          Don&apos;t have an account?{" "}
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
