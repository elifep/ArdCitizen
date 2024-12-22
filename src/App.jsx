import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import BasvuruEkle from "./pages/BasvuruEkle";
import BasvuruAlindi from "./pages/BasvuruAlindi";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BasvuruEkle />} />
        <Route path="/basarili" element={<BasvuruAlindi />} />

      </Routes>
    </Router>
  );
}

export default App;