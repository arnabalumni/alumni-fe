import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "@/pages/home";
import { AlumniDetails } from "@/pages/alumniDetails";
import { LoginPage } from "@/pages/login";
import { Panel } from "@/pages/panel";
import { useAuth } from "./auth/authProvider";

function App() {
  const auth = useAuth();
  console.log(auth);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alumnidetails" element={<AlumniDetails />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/adminpanel" element={<Panel />} />
      </Routes>
    </>
  );
}

export default App;
