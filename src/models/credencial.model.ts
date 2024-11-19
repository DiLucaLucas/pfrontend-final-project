// Modelo utilizado en el login o register de usuarios
export interface CredencialesModel {
    email: string;
    password: string;
    nickname?: string;
}