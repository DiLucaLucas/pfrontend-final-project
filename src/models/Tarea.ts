export interface Tarea {
    id: number;
    tarea: string;
    completada: boolean;
}

export interface TareaState {
    loading: boolean;
    data: Tarea[];
}