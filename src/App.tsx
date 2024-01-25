import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "@/pages/home";
import { AlumniDetails } from "@/pages/alumnidetails";
import { LoginPage } from "@/pages/login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alumnidetails" element={<AlumniDetails />} />
        <Route path="/loginpage" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
