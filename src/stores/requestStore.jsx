import { create } from "zustand";
import axios from "../config/axios.config";
import { VITE_API_URL } from "../config/environment";

const useCreateRequestStore = create((set) => ({
  loading: false,
  error: null,
  message: null,
  validationErrors: null,

  // Yeni Başvuru Oluştur
  createRequest: async (requestData) => {
    set({ loading: true, error: null, message: null, validationErrors: null });

    try {
      const formData = new FormData();

      // Submissions Dosyaları
      if (requestData.submissions) {
        requestData.submissions.forEach((submission, index) => {
          formData.append(`submissions`, submission.document); // Belge
          formData.append(
            `submissions[${index}][documentDescription]`,
            submission.documentDescription // Açıklama
          );
        });
      }

      // Incident Dosyaları
      if (requestData.Incidents?.files) {
        requestData.Incidents.files.forEach((file) => {
          formData.append("incidentFiles", file.document);
        });
      }

      // Incident Verileri
      if (requestData.Incidents) {
        formData.append("Incidents", JSON.stringify(requestData.Incidents));
      }

      // Diğer Veriler
      Object.keys(requestData).forEach((key) => {
        if (key !== "submissions" && key !== "Incidents") {
          formData.append(key, requestData[key]);
        }
      });

      const response = await axios.post(
        `${VITE_API_URL}/api/requests`,
        formData
      );
      console.log("Response data:", response.data);
      console.log("Form data:", formData);

      set({
        message: "Request created successfully.",
        loading: false,
        validationErrors: null,
      });

      return response.data; // Başarılı sonucu döndür
    } catch (error) {
      if (error.response?.status === 400 && error.response.data.errors) {
        // Backend doğrulama hatalarını ele al
        set({
          validationErrors: error.response.data.errors,
          loading: false,
        });
      } else {
        set({
          error: error.response?.data?.error || "Error creating request.",
          loading: false,
        });
      }
    }
  },
}));

export default useCreateRequestStore;