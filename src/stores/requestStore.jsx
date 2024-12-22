import { create } from "zustand";
import { VITE_API_URL } from "../config/environment";

const useRequestStore = create((set, get) => ({
    requests: [],
    request: null,
    cachedRequests: null, // Tüm requestlerin cache'i
    cachedRequestsById: {}, // Tekil requestlerin cache'i
    loading: false,
    error: null,
    message: null, // Bilgilendirme mesajı

    // Tüm Başvuruları Getir
    fetchRequests: async () => {
        set({ loading: true, error: null, message: null });
        try {
            const response = await axios.get(`${VITE_API_URL}/api/requests`);
            const requests = response.data.map((req) => ({
                ...req,
                assignedLawyer: req.assignedLawyer || {
                    _id: null,
                    fullName: "Not Assigned",
                },
                receivedBy: req.receivedBy || { _id: null, fullName: "Not Assigned" },
            }));

            set({
                requests,
                cachedRequests: requests, // Cache'i güncelle
                message: null,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.error || "Error fetching requests.",
                message: null,
                loading: false,
            });
        }
    },

    // Tek Başvuru Getir
    fetchRequestById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${VITE_API_URL}/api/requests/${id}`);
            set((state) => ({
                request: response.data,
                cachedRequestsById: {
                    ...state.cachedRequestsById,
                    [id]: response.data,
                },
                loading: false,
            }));
        } catch (error) {
            console.error("Error fetching request:", error);
            set({ error: "Error fetching request.", loading: false });
        }
    },

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

            set((state) => ({
                requests: [...state.requests, response.data],
                message: "Request created successfully.",
                loading: false,
                validationErrors: null,
            }));
        } catch (error) {
            if (error.response?.status === 400 && error.response.data.errors) {
                // Backend validation errors
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

    // Başvuru Güncelle
    updateRequest: async (id, requestData, newFiles) => {
        set({ loading: true, error: null, validationErrors: null });
        try {
            const formData = new FormData();

            // Add updated request data
            Object.keys(requestData).forEach((key) => {
                if (key === "submissions" || key === "Incidents") return; // Handle these separately
                formData.append(key, requestData[key]);
            });

            // Handle existing files (keep them in the submission)
            if (requestData.submissions) {
                requestData.submissions.forEach((file) => {
                    if (file.document instanceof File) {
                        formData.append(`submissions`, file.document);
                        formData.append(
                            `submissions[${file.index}][documentDescription]`,
                            file.documentDescription
                        );
                    } else {
                        // Existing file URLs (to retain)
                        formData.append(`existingFiles[]`, file.document);
                    }
                });
            }

            // Add new incident files (if any)
            if (newFiles?.incidentFiles) {
                newFiles.incidentFiles.forEach((file) => {
                    formData.append("incidentFiles", file);
                });
            }

            // Add incident data
            if (requestData.Incidents) {
                formData.append("Incidents", JSON.stringify(requestData.Incidents));
            }

            const response = await axios.put(
                `${VITE_API_URL}/api/requests/${id}`,
                formData
            );

            // Update the local state
            set((state) => ({
                requests: state.requests.map((req) =>
                    req._id === id ? response.data : req
                ),
                message: "Request updated successfully.",
                loading: false,
                validationErrors: null,
            }));
            console.log("Updated Requests:", get().requests);
        } catch (error) {
            if (error.response?.status === 400 && error.response.data.errors) {
                // Backend validation errors
                set({
                    validationErrors: error.response.data.errors,
                    loading: false,
                });
            } else {
                console.error("Error updating request:", error);
                set({
                    error: error.response?.data?.error || "Error updating request.",
                    loading: false,
                });
            }
        }
    },

    // Başvuru Sil
    deleteRequest: async (id) => {
        set({ loading: true, error: null, message: null });
        try {
            await axios.delete(`${VITE_API_URL}/api/requests/${id}`);
            set((state) => ({
                requests: state.requests.filter((req) => req._id !== id),
                cachedRequests: state.requests.filter((req) => req._id !== id), // Cache'i güncelle
                cachedRequestsById: Object.fromEntries(
                    Object.entries(state.cachedRequestsById).filter(([key]) => key !== id)
                ),
                message: "Request deleted successfully.",
                loading: false,
            }));
        } catch (error) {
            set({
                error: error.response?.data?.error || "Error deleting request.",
                message: null,
                loading: false,
            });
        }
    },

    // Status Güncelleme
    updateRequestStatus: async (id, status) => {
        set({ loading: true, error: null, message: null });
        try {
            const response = await axios.patch(
                `${VITE_API_URL}/api/requests/${id}/status`,
                {
                    status,
                }
            );
            const updatedRequest = response.data.request;

            set((state) => ({
                requests: state.requests.map((req) =>
                    req._id === id ? { ...req, status: updatedRequest.status } : req
                ),
                message: "Status updated successfully.",
                loading: false,
            }));
        } catch (error) {
            set({
                error: error.response?.data?.error || "Error updating status.",
                loading: false,
            });
        }
    },

    // Yeni Status Güncelleme Yardımcı Metodu
    changeStatus: async (id, newStatus) => {
        const { updateRequestStatus } = get();

        try {
            await updateRequestStatus(id, newStatus);

            alert("Status successfully updated!");
        } catch (error) {
            console.error("Error updating status:", error);

            alert("Failed to update status.");
        }
    },
}));

export default useRequestStore;