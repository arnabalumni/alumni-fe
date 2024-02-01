import { ChildrenProp } from "@/lib/types";

export default function AdminLayout({ children }: ChildrenProp) {
  return (
    <div className="flex w-full h-[100vh] flex-col items-center gap-[7rem] py-[10rem]">
      {children}
    </div>
  );
}
