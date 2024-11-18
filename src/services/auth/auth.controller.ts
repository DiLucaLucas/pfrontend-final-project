// Utilizamos nuestrsa instancia de axios
import { api_instance } from "../api";

// Importamos el schema de la respuesta del backend
import type { ApiResponse } from "@/models/api_response.model";

// importamos el modelo de nuestras credenciales
import type { CredencialesModel } from "@/models/credencial.model";

// importamos el modelo de respuesta de nuestro auth
import type { AuthApiResponseModel } from "@/models/auth_api_response.model";

// metodo para dar de alta un nuevo usuario
export async function crearUsuario(user_data: CredencialesModel) {
    return await api_instance.post<ApiResponse<AuthApiResponseModel>>('auth/signup', user_data);
}

// Metodo de logueo
export async function login(credenciales: CredencialesModel) {
    const response = await api_instance.post<ApiResponse<AuthApiResponseModel>>('auth/login', credenciales, {withCredentials: true});

    const setCookieHeader = response.headers['set-cookie'];

    return response;
}

export async function logout() {
    return await api_instance.post<ApiResponse<null>>('auth/logout');
}