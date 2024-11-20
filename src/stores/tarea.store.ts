import { defineStore } from 'pinia';

// Modelos que utilizaremos
import type { Tarea, TareaState } from '@/models/Tarea';
import type { CrearTarea } from '@/models/tarea_request.model';

// Extras importantes para poder realizar peticiones a nuestra api
import { API } from '@/services';

/**
 * Modelo de estado 
 */
interface TareaFilterState extends TareaState {
    tareas_completadas: Tarea[];
    tareas_pendientes: Tarea[];
    todas_las_tareas: Tarea[];
}

/**
 * Store para manipular la logica de ABM de tareas en nuestra aplicacion
 */
export const useTareaStore = defineStore({
    id: 'tarea-store',
    // Estado inicial...
    state: (): TareaFilterState => ({
        loading: false,
        data: [],
        todas_las_tareas: [],
        tareas_completadas: [],
        tareas_pendientes: [],
    }),
    // Metodos permitidos en el store
    actions: {
        /**
         * Agregamos una nueva tarea
         * @param tarea @type Tarea
         */
        async agregarTarea(tarea: Tarea) {
            this.loading = true;
            try {
                // Encapsulamos payload para utilizar en la persistencia
                let payload: CrearTarea = {
                    title: tarea.tarea,
                    description: tarea.completada ? 'Completada' : 'Incompleta'
                }

                // Encapsulamos la respuesta de nuestra API
                const response = await API.crearTarea(payload);

                // Si la respuesta es exitosa...
                if (response.status === 201) {
                    let id_tarea: number = response.data.id!;
                    let nueva_tarea: Tarea = { ...tarea, id: id_tarea };

                    // Agregamos tara a nuestro almacenamiento
                    this.data.push(nueva_tarea);

                    // Actualizamos nuestro almacenamineto de todas las tareas
                    this.todas_las_tareas.push(nueva_tarea);

                    // Realizamos una peticion actualizando nuestras tareas...
                    await this.getTareas();
                }
            } catch (e) {
                // Manejamos caso de error...
                console.error(e);
                this.loading = false;
            }
        },

        /**
         * Obtengo todas las tareas
         */
        async getTareas() {
            if (this.loading === false) {
                this.loading = true;
            }

            try {
                // Peticion a la API
                const response = await API.getTareas();

                // En caso de exito...
                if (response.status === 200) {
                    // Por cada tarea que me devuelve la API...
                    response.data.forEach((item) => {
                        // ... Encapsulo los datos...
                        const tarea: Tarea = {
                            id: item.id!,
                            tarea: item.title!,
                            completada: item.description === 'Completada' ? true : false
                        }

                        // ... para agregarlos a mi store.
                        this.data.push(tarea);
                        this.todas_las_tareas.push(tarea);
                    });

                    // Verifico que las tareas sean unicas...
                    const tareas_unicas = this.todas_las_tareas.filter((tarea, indice, t) => t.findIndex(t => t.id === tarea.id) === indice);
                    this.data = tareas_unicas;

                    // Diferencio entre...
                    this.todas_las_tareas = tareas_unicas; // ... todas las tareas...
                    this.tareas_completadas = tareas_unicas.filter(tarea => tarea.completada); // ... Tareas completadas...
                    this.tareas_pendientes = tareas_unicas.filter(tarea => !tarea.completada); // ... Tareas incompletas.
                    this.loading = false
                }
            } catch (e) {
                // Manejamos caso de error...
                this.loading = false;
            }
        },

        /**
         * Metodo para eliminar una tarea
         * @param tarea 
         */
        async eliminarTarea(tarea: Tarea) {
            this.loading = true;
            try {
                const response = await API.eliminarTarea(tarea.id!);
                if (response.status === 200) {
                    console.log(`Tarea Eliminada con exito 🗑️`);
                }
            } catch (e) {
                // Manejamos caso de error...
                console.error('Error al eliminar tarea 🥲', e);
                this.loading = false;
            }

            // Actualizo el store de nuestra aplicacion...
            this.data = this.data.filter(t => t.id !== tarea.id);
            this.todas_las_tareas = this.todas_las_tareas.filter(t => t.id !== tarea.id);
            
            // Solicitamos las tareas nuevamente...
            await this.getTareas();
        },

        /**
         * Este metodo cambia el estado nuestra tarea entre 'Completada' e 'Incompleta'
         * @param tarea 
         */
        async cambiarEstadoTarea(tarea: Tarea) {
            this.loading = true;

            //Buscamos el indice de la tarea que queremos editar...
            const indice = this.data.findIndex((item) => item.id === tarea.id);

            // Cambiamos el estado de la tarea al contario que tenga...
            this.data[indice].completada = !this.data[indice].completada;

            // Encapsulamos los nuevos datos de la tarea
            const tarea_editada: CrearTarea = {
                title: this.data[indice].tarea,
                description: this.data[indice].completada ? 'Completada' : 'Incompleta'
            }

            try {

                const response = await API.editarTarea(tarea.id!, tarea_editada);
                console.info('Tarea Editada con Exito 📝');
                this.loading = false;
            } catch (e) {
                // Manejamos caso de error...
                console.error('Error al Editar Tarea 🤦‍♂️', e);
                this.loading = false;
            }

            // Si la tarea esta completada, la agregamos al array de las tareas completadas...
            if (this.data[indice].completada) {
                this.tareas_completadas.push(this.data[indice]);
            } else {
                // Si la tarea NO esta completada, la quitamos
                this.tareas_completadas = this.tareas_completadas.filter((item) => item.id !== this.data[indice].id);
            }
        },
        /**
         * Metodo para mostrar las tareas completadas del store
         */
        mostrarTareasCompletadas() {
            this.data = this.tareas_completadas;
        },
        /**
         * Metodo para mostrar las tareas pendientes del store
         */
        mostrarTareasPendientes() {
            this.data = this.tareas_pendientes;
        },
        /**
         * Metodos para mostrar todas las tareas del store
         */
        mostarTodasLasTareas() {
            this.data = this.todas_las_tareas;
        }
    }
});