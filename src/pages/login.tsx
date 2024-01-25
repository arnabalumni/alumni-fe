import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-16 h-[80vh] justify-center">
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
            <Label htmlFor="userid" className="px-3">
              User ID
            </Label>
            <Input
              type="text"
              placeholder="User ID"
              id="userid"
              className="rounded-full"
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
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 w-1/2">
          <Button className="rounded-full">Login</Button>
          <Button className="rounded-full" variant={"outline"}>
            Forgot Password
          </Button>
        </div>
      </div>
    </div>
  );
}
