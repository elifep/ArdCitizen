import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Token'ı al
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Authorization başlığı ekle
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"]; // FormData kullanıyorsanız Content-Type kaldırılır
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // Token temizle
      window.location.href = "/admin-login"; // Giriş ekranına yönlendir
    }
    return Promise.reject(error);
  }
);

export default instance;

export const setAuthRedirect = (navigate) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Token geçersiz, kullanıcıyı admin-login sayfasına yönlendir
        navigate("/admin-login"); // useNavigate ile yönlendirme
      }
      return Promise.reject(error);
    }
  );
};