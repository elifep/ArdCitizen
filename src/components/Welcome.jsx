import React from "react";
import { FaExclamationCircle, FaFileAlt, FaPhoneAlt } from "react-icons/fa"; // Örnek ikonlar
import { MdWarning } from "react-icons/md"; // Daha fazla ikon için farklı setler kullanılabilir

const Welcome = ({ onProceed }) => {
    return (
        <div
            className="flex justify-center items-center h-screen bg-cover bg-center bg-opacity-90"
            style={{ backgroundImage: "url('/src/images/justice-background.jpg')" }}
        >
            {/* Şeffaf Arka Planlı Modal */}
            <div className="bg-white bg-opacity-95 shadow-lg rounded-lg max-w-lg w-full p-8 text-center">
                {/* Başlık */}
                <h1 className="text-3xl font-bold mb-4 text-[#800000] flex items-center justify-center">
                    <MdWarning className="text-[#800000] w-8 h-8 mr-2" />
                    Hoş Geldiniz!
                </h1>

                {/* Açıklama */}
                <p className="text-base text-gray-700 mb-6">
                    Başvurularınızı güvenli ve hızlı bir şekilde tamamlamak için aşağıdaki
                    bilgileri dikkatlice okuyun. Formu doldurmadan önce lütfen belgelerinizi
                    hazırlayın.
                </p>

                {/* Uyarı ve Bilgilendirme Listesi */}
                <div className="mb-6 text-left">
                    <div className="flex items-center mb-4 text-gray-800">
                        <FaExclamationCircle className="text-yellow-500 w-6 h-6 mr-2" />
                        <span>Formu eksiksiz doldurduğunuzdan emin olun.</span>
                    </div>
                    <div className="flex items-center mb-4 text-gray-800">
                        <FaFileAlt className="text-blue-500 w-6 h-6 mr-2" />
                        <span>Belgeler: PDF, JPEG veya PNG formatında olmalıdır.</span>
                    </div>
                    <div className="flex items-center text-gray-800">
                        <FaPhoneAlt className="text-red-500 w-6 h-6 mr-2" />
                        <span>Başvurunuzda sorun varsa bizimle iletişime geçin.</span>
                    </div>
                </div>

                {/* Buton */}
                <button
                    onClick={onProceed}
                    className="bg-[#800000] text-white py-2 px-6 rounded-lg hover:bg-[#a00000] transition"
                >
                    Başvuruya Geç
                </button>
            </div>
        </div>
    );
};

export default Welcome;