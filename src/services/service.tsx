import axios, { AxiosResponse } from "axios";

// Configuración base de Axios
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8080", // Cambia esta URL según sea necesario
  headers: {
    "Content-Type": "application/json",
  },
});

// Función para manejar la respuesta de la API
const handleResponse = (response: AxiosResponse<any, any>) => {
  return response.data;
};

// Función para manejar errores
const handleError = (error: any) => {
  console.error("API call error:", error);
  throw error;
};

// Servicio de API
const apiService = {
  logout: async () => {
    try {
      const response = await apiClient.post("/logout");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getGym: async (gym_id: any) => {
    try {
      const response = await apiClient.get(`/gym/${gym_id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  createClass: async (formData: any) => {
    try {
      const response = await apiClient.post("/create_class", formData);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  searchUser: async (query: string) => {
    try {
      const response = await apiClient.get(`/search_users`, {
        params: { query },
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getUserById: async (userId: any) => {
    try {
      const response = await apiClient.get(`/get_user/${userId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  loginUser: async (
    userType: any,
    dc_correo_electronico: any,
    dc_contrasena: any
  ) => {
    try {
      const response = await apiClient.post("/login", {
        user_type: userType,
        dc_correo_electronico,
        dc_contrasena,
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getFilteredGyms: async (params: any) => {
    try {
      const response = await apiClient.get(`/filterGyms`, { params });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  searchGyms: async (query: string) => {
    try {
      const response = await apiClient.get(`/gyms?query=${query}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getAllGyms: async (query: string = "") => {
    try {
      const response = await apiClient.get(`/gyms`, { params: { query } });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  updateGym: async (dataToUpdate: any) => {
    try {
      const response = await apiClient.put(
        `/updateGym/${dataToUpdate.id}`,
        dataToUpdate
      );
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  reservarClase: async (data: any) => {
    try {
      const response = await apiClient.post("/reservarClase", data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getUserReservations: async (userId: string) => {
    try {
      const response = await apiClient.get(`/reservasUsuario/${userId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  cancelReservation: async (reservaId: string) => {
    try {
      const response = await apiClient.delete(`/cancelarReserva/${reservaId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getClassesByGym: async (gymId: number) => {
    try {
      const response = await apiClient.get(`/classes/${gymId}`);
      const data = response.data;
      if (data && data.classes) {
        const convertedClasses = data.classes.map((c: any) => {
          const convertedClass = { ...c };
          for (const key in convertedClass) {
            if (Object.prototype.hasOwnProperty.call(convertedClass, key)) {
              if (
                convertedClass[key] instanceof Object &&
                "days" in convertedClass[key]
              ) {
                convertedClass[
                  key
                ] = `${convertedClass[key].days} days, ${convertedClass[key].seconds} seconds`;
              }
            }
          }
          return convertedClass;
        });
        return { ...data, classes: convertedClasses };
      }
      return data;
    } catch (error) {
      handleError(error);
    }
  },

  register: async (formData: any) => {
    try {
      const response = await apiClient.post("/register", formData);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  registerGym: async (formData: any) => {
    try {
      const response = await apiClient.post("/registerGym", formData);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getGymStatus: async (gymId: any) => {
    try {
      const response = await apiClient.get(`/gym/${gymId}/status`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getSolicitudesRegistro: async () => {
    try {
      const response = await apiClient.get("/solicitudes_registro");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  aceptarSolicitud: async (idSolicitud: any) => {
    try {
      const response = await apiClient.post(
        `/aceptar_solicitud/${idSolicitud}`
      );
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  rechazarSolicitud: async (idSolicitud: any) => {
    try {
      const response = await apiClient.post(
        `/rechazar_solicitud/${idSolicitud}`
      );
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  deleteClass: async (classId: any) => {
    try {
      const response = await apiClient.delete(`/delete_class/${classId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  updateClass: async (classId: number, formData: any) => {
    try {
      const response = await apiClient.post(
        `/update_class/${classId}`,
        formData
      );
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getReservationRequests: async (userId: any) => {
    try {
      const response = await apiClient.get("/user/reservation-requests", {
        params: { tb_usuario_id: userId },
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getGymComments: async (gymId: any) => {
    try {
      const response = await apiClient.get(`/comments/gym/${gymId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  addGymComment: async (gymId: any, userId: any, comment: any, rating: any) => {
    try {
      const response = await apiClient.post(`/comments/gym/${gymId}`, {
        user_id: userId,
        comment,
        rating,
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getClassComments: async (classId: any) => {
    try {
      const response = await apiClient.get(`/comments/class/${classId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  addClassComment: async (
    classId: any,
    userId: any,
    comment: any,
    rating: any
  ) => {
    try {
      const response = await apiClient.post(`/comments/class/${classId}`, {
        user_id: userId,
        comment,
        rating,
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  recommendGym: async (gymId: any, userId: any) => {
    try {
      const response = await apiClient.post("/recommendations", {
        gymId,
        userId,
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getRecommendationCount: async (gymId: any) => {
    try {
      const response = await apiClient.get(`/recommendations/count/${gymId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  reportUser: async (
    userId: any,
    reporterId: any,
    reporterType: any,
    reason: any,
    details: any
  ) => {
    try {
      const response = await apiClient.post("/reportUser", {
        user_id: userId,
        reporter_id: reporterId,
        reporter_type: reporterType,
        reason,
        details,
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getPendingReports: async () => {
    try {
      const response = await apiClient.get("/pendingReports");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  acceptReport: async (reportId: any, reporter_id: any) => {
    try {
      const response = await apiClient.post(
        `/acceptReport/${reportId}`,
        reporter_id
      );
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  rejectReport: async (reportId: any, reject_reason: any) => {
    try {
      const response = await apiClient.post(`/rejectReport/${reportId}`, {
        reject_reason: reject_reason,
        reporter_id: reportId,
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  scheduleReminder: async (formData: any) => {
    try {
      const response = await apiClient.post("/schedule_reminder", formData);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },
};

export default apiService;
