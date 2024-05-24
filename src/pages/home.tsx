import { useAuth } from "@/auth/authProvider";
import { Layout } from "@/components/myUi/layout";

export function Home() {
  const auth = useAuth();
  console.log(auth);
  return (
    <Layout className="bg-[url('/aus-gate.png')] bg-no-repeat bg-cover bg-center">
      <div className="cursor-pointer bg-primary p-5 px-8 rounded-lg drop-shadow-2xl hover:p-6 hover:px-10 transition-all duration-200 ease-in-out">
        <h2 className="text-[3rem] text-primary-foreground">
          Assam University Alumni Association
        </h2>
      </div>
    </Layout>
  );
}
