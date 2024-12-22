import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import BasvuruEkle from "./pages/BasvuruEkle";
import BasvuruAlindi from "./pages/BasvuruAlindi";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basvuru-ekle-vatandas" element={<BasvuruEkle />} />
        <Route path="/basarili" element={<BasvuruAlindi />} />

      </Routes>
    </Router>
  );
}

export default App;