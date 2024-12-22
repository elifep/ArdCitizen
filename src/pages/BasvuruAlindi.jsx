import React from "react";

const BasvuruAlindi = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <h1 className="text-4xl font-bold text-green-600 mb-4">
                    Başvurunuz Alınmıştır!
                </h1>
                <p className="text-gray-700 mb-6">
                    Başvurunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçilecektir.
                </p>
                <button
                    onClick={() => window.location.href = 'https://www.sanliurfabarosu.org.tr/'}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
                >
                    Çıkış Yap!
                </button>
            </div>
        </div>
    );
};

export default BasvuruAlindi;