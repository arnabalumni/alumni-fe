import { useState } from "react";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "@/auth/authProvider";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    axios
      .post(`${import.meta.env.VITE_APP_LOCAL_SERVER_URL}/api/v1/login`, {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        if (!response.data.token) {
          throw new Error("Invalid Username or Password");
        }
        login(response.data.token);
        setErrorMessage("");
        navigate("/adminpanel");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setErrorMessage("Try Again, Invalid Username or Password");
      });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-20 h-[100vh] justify-center">
        <div className="relative w-full gap-10 flex flex-col items-center">
          <h1 className="text-5xl">Login</h1>
          <div className="flex flex-col items-center absolute bottom-[-13px]">
            <User
              className="bg-primary rounded-full p-4"
              size={60}
              color="white"
            />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <hr className="border-x rounded-full border-primary w-[20rem]" />
            <hr className="border-x rounded-full border-primary w-[25rem]" />
            <hr className="border-x rounded-full border-primary w-[20rem]" />
          </div>
        </div>
        <div className="flex flex-col gap-10 items-center w-[25rem]">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="username" className="px-3">
                Username
              </Label>
              <Input
                type="text"
                placeholder="Username"
                id="username"
                className="rounded-full"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="password" className="px-3">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                className="rounded-full"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-[15rem]">
          <Button className="rounded-full" onClick={handleLogin}>
            Login
          </Button>
          <Button className="rounded-full" variant={"outline"}>
            Forgot Password
          </Button>
        </div>
      </div>
      <h1 className="text-red-600">{errorMessage}</h1>
    </>
  );
}
