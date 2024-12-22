import React from "react";

const BasvuruFormPage = () => {
    return (
        <div>
            <h1>Başvuru Formu</h1>
            <form>
                <label>
                    Adı Soyadı:
                    <input type="text" name="name" />
                </label>
                <label>
                    E-posta:
                    <input type="email" name="email" />
                </label>
                <label>
                    Telefon Numarası:
                    <input type="tel" name="phone" />
                </label>
                <label>
                    Mesaj:
                    <textarea name="message" />
                </label>                
                <button type="submit">Gönder</button>
            </form>
        </div>
    );
};

export default BasvuruFormPage;