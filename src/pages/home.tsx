import { Navbar } from "@/components/myUi/navbar";

export function Home() {
  return (
    <div className="h-[100vh]">
      <Navbar />
      <div className="h-full bg-[url('/aus-gate.png')] bg-no-repeat bg-cover bg-center"></div>
    </div>
  );
}
