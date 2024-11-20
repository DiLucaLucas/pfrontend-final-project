<script setup lang="ts">
import { reactive } from "vue";
//Importamos store de auth
import { useSesionStore } from "@/stores/auth_session.store";
// Importamos store de tarea
import { useTareaStore } from "@/stores/tarea.store";
// Importamos modelo de tarea
import type { Tarea } from "@/models/Tarea";
// Instanciamos el store de auth
const sesionStore = useSesionStore();
const auth = reactive(sesionStore);
// Instanciamos el store de tareas
const tareaStore = useTareaStore();
const tareaSt = reactive(tareaStore);
const nueva_tarea: Tarea = {
  id: 0,
  tarea: "",
  completada: false,
};
const tarea_reactiva = reactive(nueva_tarea);
function completarTarea() {
  tarea_reactiva.completada = !tarea_reactiva.completada;
}
function guardarTarea() {
  tareaSt.agregarTarea(tarea_reactiva);
}
function eliminarTarea(tarea: Tarea) {
  tareaSt.eliminarTarea(tarea);
}
// Listamos las tareas
tareaSt.getTareas();

</script>
<template>
  <div class="bg-almost-black flex justify-center mt-10 mb-10">
    <div class="w-full max-w-md p-6 bg-background-gray rounded-lg shadow-lg">
      <h1 class="text-2xl text-success-green font-bold mb-4 text-center">
        Mis Tareas
      </h1>
      <div class="w-full flex flex-col gap-4 mb-6">
        <div class="flex justify-center">
          <input
            type="text"
            class="w-full p-3 m-2 rounded-md text-almost-black shadow-white font-bold"
            v-model="tarea_reactiva.tarea"
            placeholder="Nueva tarea...."
          />
          <button
            @click="guardarTarea()"
            class="m-2 p-3 bg-success-green hover:text-gray-950 transition-colors rounded-md shadow font-bold flex items-center justify-center"
          >
            <img src="../assets/icons/add-icon.png" alt="" />
          </button>
        </div>
        <!-- Filtros -->
        <div class="flex gap-4 justify-center mb-6">
          <button
            class="p-2 rounded-md font-bold transition-colors bg-gray-700 text-white hover:bg-success-green hover:text-gray-950"
          >
            Todos
          </button>
          <button
            class="p-2 rounded-md font-bold transition-colors bg-gray-700 text-white hover:bg-success-green hover:text-gray-950"
          >
            Completados
          </button>
          <button
            class="p-2 rounded-md font-bold transition-colors bg-gray-700 text-white hover:bg-success-green hover:text-gray-950"
          >
            Pendientes
          </button>
        </div>
      </div>
      <!-- Tareas -->
      <div class="w-full space-y-4">
        <div
          v-for="tarea in tareaSt.data"
          :key="tarea.id"
          class="flex items-center justify-between p-4 rounded-md bg-white"
        >
          <span class="text-black font-bold">{{ tarea.tarea }}</span>
          <button @click="eliminarTarea(tarea)" class="hover:text-red-700">
            <img src="../assets/icons/trash-icon.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<style></style>
