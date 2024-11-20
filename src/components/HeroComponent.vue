<script setup lang="ts">
import { ref } from "vue";

// Estado para las tareas
const tasks = ref<string[]>([]); // Lista de tareas
const newTask = ref(""); // Texto del input

// Función para agregar tareas
const addTask = () => {
  if (newTask.value.trim()) {
    tasks.value.push(newTask.value.trim()); // Agrega la tarea a la lista
    newTask.value = ""; // Limpia el input
  }
};

// Función para eliminar tareas
const removeTask = (index: number) => {
  tasks.value.splice(index, 1); // Elimina la tarea por índice
};
</script>
<template>
  <div class="h-screen bg-almost-black flex justify-center mt-10 mb-10" >
    <div class="w-full max-w-md p-6 bg-background-gray rounded-lg shadow-lg">
    <h1 class="text-2xl text-success-green font-bold mb-4 text-center">Mis Tareas</h1>
    <div class="w-full flex flex-col gap-4 mb-6">
      <div class="flex justify-center">
        <input
          type="text"
          v-model="newTask"
          placeholder="Nueva tarea...."
          class="w-full p-3 m-2 rounded-md text-almost-black shadow-white font-bold"
        />
        <button
          @click="addTask"
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
        v-for="(task, index) in tasks"
        :key="index"
        class="flex items-center justify-between p-4 rounded-md bg-white"
      >
        <span class="text-black font-bold">{{ task }}</span>
        <button @click="removeTask(index)" class="hover:text-red-700">
          <img src="../assets/icons/trash-icon.png" alt="" />
        </button>
      </div>
    </div>
  </div>
  </div>
  <!-- </div> -->
</template>
<style></style>
