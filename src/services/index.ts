import { crearUsuario, login, logout } from "./auth/auth.controller";
import { crearTarea, eliminarTarea, getTareas, editarTarea } from "./tareas/tareas.controller";

export const API = {
    // Metodos de autenticacion
    login,
    crearUsuario,
    logout,


    crearTarea,
    editarTarea,
    getTareas,
    eliminarTarea
}