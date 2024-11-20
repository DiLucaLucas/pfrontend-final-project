// Creamos un tipo de dato para evitar errores en el futuro
type TareaCompleta = 'Completada' | 'Incompleta';

// Creamos modelo para crear o editar tareas
export interface CrearTarea {
    title: string;
    description: TareaCompleta;
}