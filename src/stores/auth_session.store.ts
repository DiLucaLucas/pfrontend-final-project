import { defineStore } from "pinia";

// Utilizamos router para navegar a la pagina de tareas
import router from "@/router";

// Modelo que utilizaremos
import type { SesionStateModel } from "@/models/sesion.model";
import type { CredencialesModel } from "@/models/credencial.model";

// Extras importantes para poder realizar peticiones a nuestra api
import { API } from "@/services";
import { api_instance } from "@/services/api";

/**
 * Store para manipular la logica de autenticancion de nuestra aplicacion
 */
export const useSesionStore = defineStore({
    id: 'sesion-store',
    // Estado inicial...
    state: (): SesionStateModel => ({
        loading: false,
        data: {
            user: undefined,
            csrfToken: undefined,
            jwtExpires: undefined
        },
        error: ''
    }),
    // Acciones que se pueden realizar en el store
    actions: {
        /**
         * Obtiene nuestro token de las cabecera, lo convierte a string y lo almacena en una variable.
         */
        async cambiarEstadoToken() {
            const headers = api_instance.defaults.headers;
            this.data!.csrfToken = headers["csrf-token"]?.toString();
        },

        /**
         * Este metodo se comunica con la API enviandole las credenciales y maneja el caso de exito y el de error.
         * Si hay exito almacena el reusltado en variables que podamos utilizar en el ciclo de vida de nuestra aplicacion
         * @param user_data credenciales de registro ingresadas en el formulario
         */
        async registrarUsuario(user_data: CredencialesModel) {
            this.loading = true;
            try {
                const response = await API.crearUsuario(user_data); // Encapsulamos la respuesta de la API para poder manipular luegi...

                if (response.status === 201) { // manipulacion de la respuesta
                    this.data!.user = user_data;
                    this.login(user_data); // Realizamos el logueo
                    this.loading = false;
                }
            } catch (e) {
                this.error = e!.toString();
            }
        },

        /**
         * Este metodo se comunica con la API enviadole las credenciales para realizar el logueo
         * @param user_data credenciales de registro ingresadas en el formulario
         */
        async login(user_data: CredencialesModel) {
            this.loading = true;
            try {
                const response = await API.login(user_data);
                if (response.status === 200) {
                    this.data!.user = user_data;
                    const current_time = Math.floor(Date.now() / 1000); // Creo una fecha de tiempo
                    this.data!.jwtExpires = current_time + 3 * 60; // Establezco cuanto falta para que el token expire
                    this.renovarToken(); // Renuevo el token...
                    this.loading = false;
                    router.push('/tareas'); // Se redirige a la ruta tareas
                }
            } catch (e) {
                this.loading = false;
                this.error = e!.toString();
            }
        },

        renovarToken() {
            setTimeout(async () => {
                try {
                    const user_data = { email: this.data!.user!.email, password: this.data!.user!.password }; // Encapsulamos la informacion del usuario
                    const response = await API.login(user_data);

                    if (response.status === 200) {
                        const current_time = Math.floor(Date.now() / 1000);
                        this.data!.jwtExpires = current_time + 3 * 60;
                    }
                } catch (e) {
                    this.error = e!.toString();
                }
            }, 3 * 60 * 1000);

            setTimeout(() => this.renovarToken(), 3 * 60 * 1000);
        },

        async logout() {
            this.loading = true;
            this.data!.user = undefined;
            this.data!.jwtExpires = undefined;

            try {
                const response = await API.logout();
                if (response.status === 200) {
                    this.loading = false;
                    router.push('/');
                }
            } catch (e) {
                this.loading = false;
                this.error = e!.toString();
            }
        }
    }
});