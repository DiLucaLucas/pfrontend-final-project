<script setup lang="ts">
import { ref, computed } from "vue";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";

// Estado para alternar entre componentes
const isLogin = ref(true);

const switchToLogin = () => (isLogin.value = true);
const switchToRegister = () => (isLogin.value = false);

// Determinar qué componentes mostrar
const currentComponent = computed(() =>
  isLogin.value ? LoginComponent : RegisterComponent
);
</script>

<template>
  <div
    class="min-h-screen bg-almost-black flex flex-col items-center justify-center text-white"
  >
    <div class="w-full max-w-md p-6 bg-almost-dark rounded-md shadow-md">
      <div class="flex justify-between mb-6">
        <button
          class="px-4 py-2 w-full text-center font-bold rounded-md transition-colors"
          :class="
            isLogin
              ? 'bg-primary-green text-black'
              : 'bg-gray-800 text-gray-400'
          "
          @click="switchToLogin"
        >
          Iniciar Sesión
        </button>
        <button
          class="px-4 py-2 w-full text-center font-bold rounded-md transition-colors"
          :class="
            !isLogin
              ? 'bg-primary-green text-black'
              : 'bg-gray-800 text-gray-400'
          "
          @click="switchToRegister"
        >
          Registrarse
        </button>
      </div>
      <!-- Mostrar LoginComponent o RegisterComponent -->
      <component :is="currentComponent" />
    </div>
  </div>
</template>
