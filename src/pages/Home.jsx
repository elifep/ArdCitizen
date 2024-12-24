import React from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "../components/Welcome"; // Yeni Welcome componentini içe aktarıyoruz

const Home = () => {
    const navigate = useNavigate();

    const handleProceed = () => {
        navigate("/basvuru-ekle-vatandas");
    };

    return <Welcome onProceed={handleProceed} />;
};

export default Home;