import React from "react";
import { Navbar } from "./navbar";
import { cn } from "@/lib/utils";
import { Footer } from "./footer";
import { Header } from "./header";

export function Layout({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <Navbar />
      <div
        className={cn(
          "flex min-h-[74vh] items-center justify-center",
          className
        )}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
