// Utilizamos la libreria de axios
import axios from "axios";

// Como esta app utiliza token en las cabeceras, solicitamos el nuestro antes de cada peticion.
const csrf_token = await axios.get(`${import.meta.env.VITE_API_BASE_URL}auth/csrf`, {withCredentials: true});

export const api_instance = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'csrf-token': csrf_token.data.csrfToken
    }
})