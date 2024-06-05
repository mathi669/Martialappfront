import axios, { AxiosResponse } from "axios";

// Configuración base de Axios
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:5000", // Cambia esta URL según sea necesario
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
  // Llamada para cerrar sesión
  logout: async () => {
    try {
      const response = await apiClient.post("/logout");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  // Obtener información de un gimnasio
  getGym: async (gymId: any) => {
    try {
      const response = await apiClient.get(`/gym/${gymId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  // Crear una clase de gimnasio
  createClass: async (formData: any) => {
    try {
      const response = await apiClient.post("/create_class", formData);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  // Inicio de sesión de usuario
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
  
  // Obtener gimnasios filtrados
  getFilteredGyms: async (params: any) => {
    try {
      const response = await apiClient.get(`/filterGyms`, { params });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  // Obtener todos los gimnasios
  getAllGyms: async () => {
    try {
      const response = await apiClient.get(`/gyms`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  // Otras llamadas a la API...
};

export default apiService;
