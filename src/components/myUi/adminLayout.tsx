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
import { Footer } from "./footer";
import { Header } from "./header";
interface AdminLayoutProps extends ChildrenProp {
  className?: ClassValue;
}

export default function AdminLayout({ children, className }: AdminLayoutProps) {
  const { toasts } = useToast();
  return (
    <ToastProvider>
      <Header />
      <AdminNavbar />
      <div
        className={cn(
          "flex w-full min-h-[80vh] flex-col items-center gap-[7rem] justify-center",
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
      <Footer />
    </ToastProvider>
  );
}
