import { crearUsuario, login, logout } from "./auth/auth.controller";

export const API = {
    // Metodos de autenticacion
    login,
    crearUsuario,
    logout
}