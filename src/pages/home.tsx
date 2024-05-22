import { useAuth } from "@/auth/authProvider";
import { Layout } from "@/components/myUi/layout";

export function Home() {
  const auth = useAuth();
  console.log(auth);
  return (
    <Layout className="bg-[url('/aus-gate.png')] bg-no-repeat bg-cover bg-center"></Layout>
  );
}
