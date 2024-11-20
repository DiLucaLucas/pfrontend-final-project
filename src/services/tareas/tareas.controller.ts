// importamos nuestra instancia de la api
import { api_instance } from "../api";

import type { ApiResponse } from "@/models/api_response.model";
import type { CrearTarea } from "@/models/tarea_request.model";
import type { TareaApiResponse } from "@/models/tarea_api_response.model";

export async function crearTarea(tarea: CrearTarea) {
    return await api_instance.post<TareaApiResponse>('/todo', tarea);
}

export async function getTareas(){
    return await api_instance.get<TareaApiResponse[]>('/todo');
}

export async function getUnaTarea(id:number) {
    return await api_instance.get<TareaApiResponse>(`/todo/${id}`);
}

export async function editarTarea(id: number, tarea: CrearTarea) {
    return await api_instance.put<TareaApiResponse>(`/todo/${id}`, tarea);
}

export function eliminarTarea(id: number) {
    return api_instance.delete(`/todo/${id}`);
}