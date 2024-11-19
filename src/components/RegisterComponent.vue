<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const confPassword = ref('');

const onRegister = () => {
  console.log('Registro exitoso');
}
</script>
<template>
  <div class="flex items-center justify-center mt-10">
    <div class="w-full max-w-md p-8 bg-card-gray rounded-lg">
      <h2 class="text-2xl font-bold text-center text-primary-green py-2">Registrate</h2>
      <p class="text-center text-text-gray mb-8 text-md">
          Registra tus datos para acceder a tu cuenta.✍️
        </p>
      <form @submit.prevent="onRegister">
        <input type="email" placeholder="Correo Electronico" v-model="email" class="w-full px-4 py-3 mb-6 text-input-gray bg-almost-black rounded-md focus:outline-none focus:ring focus:ring-secondary-blue">
        <input type="password" placeholder="Contraseña" v-model="password" class="w-full px-4 py-3 mb-8 text-input-gray bg-almost-black rounded-md focus:outline-none focus:ring focus:ring-secondary-blue">
        <input type="password" placeholder="Confirmar Contraseña" v-model="confPassword" class="w-full px-4 py-3 mb-8 text-input-gray bg-almost-black rounded-md focus:outline-none focus:ring focus:ring-secondary-blue">
        <button type="submit" class="w-full py-2 mb-6 text-white bg-success-green font-bold rounded-md hover:bg-primary-green hover:text-gray-950 transition-colors">Ingresar 🔐</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

