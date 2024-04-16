import { ChildrenProp } from "@/lib/types";
import AdminNavbar from "./adminNavbar";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import { ToastProvider } from "../ui/toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
interface AdminLayoutProps extends ChildrenProp {
  className?: ClassValue;
}

export default function AdminLayout({ children, className }: AdminLayoutProps) {
  const { toasts } = useToast();
  return (
    <ToastProvider>
      <AdminNavbar />
      <div
        className={cn(
          "flex w-full min-h-[70vh] flex-col items-center gap-[7rem] py-[10rem]",
          className
        )}
      >
        {children}
      </div>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex flex-col items-start gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
