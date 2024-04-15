import { ChildrenProp } from "@/lib/types";
import AdminNavbar from "./adminNavbar";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

interface AdminLayoutProps extends ChildrenProp {
  className?: ClassValue;
}

export default function AdminLayout({ children, className }: AdminLayoutProps) {
  return (
    <div>
      <AdminNavbar />
      <div
        className={cn(
          "flex w-full min-h-[70vh] flex-col items-center gap-[7rem] py-[10rem]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
