<script setup lang="ts">
import { ref } from 'vue';

// Estado para las tareas
const tasks = ref<string[]>([]); // Lista de tareas
const newTask = ref(''); // Texto del input

// Función para agregar tareas
const addTask = () => {
  if (newTask.value.trim()) {
    tasks.value.push(newTask.value.trim()); // Agrega la tarea a la lista
    newTask.value = ''; // Limpia el input
  }
};

// Función para eliminar tareas
const removeTask = (index: number) => {
  tasks.value.splice(index, 1); // Elimina la tarea por índice
};
</script>
<template>
  <div class="min-h-screen bg-almost-black flex flex-col p-6">
    <h1 class="text-2xl text-success-green font-bold mb-4">Mis Tareas</h1>
    <div class="w-full max-lw-lg flex gap-2 mb-6">
      <input
        type="text"
        v-model="newTask"
        placeholder="Nueva tarea...."
        class="flex-1 p-3 rounded-md bg-background-gray text-white "
      />
      <button
        @click="addTask"
        class="p-3 bg-success-green hover:text-gray-950 transition-colors rounded-md shadow font-bold flex items-center justify-center"
      >
        <img src="../assets/icons/add-icon.png" alt="" />
      </button>
    </div>
    <!-- Tareas -->
    <div class="w-full  space-y-4">
      <div
        v-for="(task, index) in tasks"
        :key="index"
        class="flex items-center justify-between p-4 rounded-md bg-white"
      >
        <span class="text-black font-bold">{{ task }}</span>
        <button
          @click="removeTask(index)"
          class="hover:text-red-700"
        >
          <img src="../assets/icons/trash-icon.png" alt="" />
        </button>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<style></style>
