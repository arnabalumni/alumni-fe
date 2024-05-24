import { Layout } from "@/components/myUi/layout";

export function About() {
  // const [alumni, setAlumni] = useState<Alumni[]>([]);

  return (
    <Layout className="flex-col">
      <div className="flex flex-row items-center gap-20 max-w-7xl">
        <div className="text-left">
          <h2 className="text-4xl">About Assam University</h2>
          <p>
            Assam University came into existence in 1994 after enactment of the
            Assam (Central) University Act 1989. Through its pursuit, Assam
            University is in the process of making itself an institute of
            excellence. Assam University main campus is situated at Dargakona,
            about 20 kms away from Silchar. The campus is set amid sprawling
            hillocks and typical landscape of north east. The campus is spread
            over 600 acres and provide an ideal environment for the researchers,
            students and the people interested in academic excellence. The other
            campus of the university is situated at Diphu in the district of
            Karbi Anglong, Assam. The university has the territorial
            jurisdiction over the five districts of Assam viz., Cachar,
            Karimganj, Hailakandi, Dima Hasao (erstwhile North Cachar Hills) and
            Karbi Anglong. Assam University being a central university hosts a
            national characteristics of unity in diversity. Faculties, staff and
            students hail from all over the country. International students also
            find this institution an ideal centre for pursuing their academic
            endeavour.
          </p>
        </div>
        <div className="overflow-hidden w-[500rem] h-64 transition duration-500 hover:rounded-sm">
          <img
            src="/aus.webp"
            className="w-[500rem] transform hover:scale-110 hover:rounded-sm transition-all duration-500 "
            alt=""
          />
        </div>
      </div>
    </Layout>
  );
}
