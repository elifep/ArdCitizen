import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import ExistingDataArchive from "./pages/ExistingDataArchive"; // MevcutVeriArsivi için
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Basvurular from "./pages/Basvurular";
import CaseTracking from "./pages/CaseTracking";
import React from "react";

import { useEffect } from "react";
import { setAuthRedirect } from "./config/axios.config";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setAuthRedirect(navigate); // Handle 401 redirect
  }, [navigate]);

  return (
    <>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <Routes>
            {/* Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/ExistingDataArchive" element={<ExistingDataArchive />} />
            <Route path="/CaseTracking" element={<CaseTracking />} />
            <Route path="/Basvurular" element={<Basvurular />} />
            {/* <Route path="*" element={<NotFound />} /> 404 sayfası */}
          </Routes>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;