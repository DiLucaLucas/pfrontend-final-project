import type { CredencialesModel } from "./credencial.model";

export interface SesionModel {
    user?: CredencialesModel;
    csrfToken?: string;
    jwtExpires?: number;
}

export interface SesionStateModel {
    loading: boolean;
    data: SesionModel | null;
    error: string;
}