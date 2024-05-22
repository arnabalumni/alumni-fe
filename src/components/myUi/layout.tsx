import React from "react";
import { Navbar } from "./navbar";
import { cn } from "@/lib/utils";
import { Footer } from "./footer";

export function Layout({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex flex-col gap-4">
      <Navbar />
      <div className={cn("flex min-h-[80vh]", className)}>{children}</div>
      <Footer />
    </div>
  );
}
