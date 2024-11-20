<script setup lang="ts">
import { reactive } from 'vue';

//Importamos store de auth
import { useSesionStore } from '@/stores/auth_session.store';

// Importamos store de tarea
import { useTareaStore } from '@/stores/tarea.store';

// Importamos modelo de tarea
import type { Tarea } from '@/models/Tarea';

// Instanciamos el store de auth
const sesionStore = useSesionStore();
const auth = reactive(sesionStore);

// Instanciamos el store de tareas
const tareaStore = useTareaStore();
const tareaSt = reactive(tareaStore);


const nueva_tarea: Tarea = {
  id: 0,
  tarea: '',
  completada: false
}

const tarea_reactiva = reactive(nueva_tarea);

function completarTarea() {
  tarea_reactiva.completada = !tarea_reactiva.completada;
}

function guardarTarea() {
  tareaSt.agregarTarea(tarea_reactiva);
}

function eliminarTarea(tarea: Tarea) {
  tareaSt.eliminarTarea(tarea)
}

// Listamos las tareas
tareaSt.getTareas();

</script>
<template>
  <div class="min-h-screen bg-almost-black flex flex-col p-6">
    <h1 class="text-2xl text-success-green font-bold mb-4">Mis Tareas</h1>
    <div class="w-full max-lw-lg flex gap-2 mb-6">
      <input type="text" v-model="tarea_reactiva.tarea" placeholder="Nueva tarea...."
        class="flex-1 p-3 rounded-md bg-background-gray text-white " />
      <button @click="guardarTarea()"
        class="p-3 bg-success-green hover:text-gray-950 transition-colors rounded-md shadow font-bold flex items-center justify-center">
        <img src="../assets/icons/add-icon.png" alt="" />
      </button>
    </div>
    <!-- Tareas -->
    <div class="w-full  space-y-4">
      <div v-for="tarea in tareaSt.data" :key="tarea.id"
        class="flex items-center justify-between p-4 rounded-md bg-white">
        <span class="text-black font-bold">{{ tarea.tarea }}</span>
        <button @click="eliminarTarea(tarea)" class="hover:text-red-700">
          <img src="../assets/icons/trash-icon.png" alt="" />
        </button>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<style></style>
