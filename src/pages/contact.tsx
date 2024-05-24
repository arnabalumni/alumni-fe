import { Layout } from "@/components/myUi/layout";

export function Contact() {
  // const [alumni, setAlumni] = useState<Alumni[]>([]);

  return (
    <Layout className="flex-col">
      <div className="flex flex-row items-center gap-20 max-w-7xl">
        <div className="text-left">
          <h2 className="text-4xl">Phone No</h2>
          <p>+91-03842-270806</p>
        </div>
        <div className="text-left">
          <h2 className="text-4xl">Postal Address:</h2>
          <p>Assam University</p>
          <p>Silchar - 788011, Assam, India</p>
        </div>
        <div className="text-left">
          <h2 className="text-4xl">Email:</h2>
          <a href="mailto:vc@aus.ac.in">vc@aus.ac.in</a>
          <br></br>
          <a href="mailto:registrar@aus.ac.in">registrar@aus.ac.in</a>
        </div>
        <div className="text-left">
          <h2 className="text-4xl">Fax:</h2>
          <p>+91-03842-270802</p>
        </div>
      </div>
    </Layout>
  );
}
