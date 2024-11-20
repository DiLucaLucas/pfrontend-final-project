<script setup lang="ts">
// Importamos reactive, nuestro store y nuestro modelo de credenciales
import { reactive } from 'vue';
import { useSesionStore } from '@/stores/auth_session.store'
import type { CredencialesModel } from '@/models/credencial.model';

// Instanciamos el store y lo volvemos reactivo
const authStore = useSesionStore();
const auth = reactive(authStore);

// Creamos una constante con nuestro modelo de credenciales.
const credenciales : CredencialesModel = {
  email: '',
  password: '',
};

// La volvemos reactiva.
const credencialesReactivas = reactive(credenciales);

// Solicitamos nuestro token a la api
auth.cambiarEstadoToken()

// Función de Login
async function Login() {
  return auth.login(credenciales)
}

</script>
<template>
  <div class="flex items-center mt-10 justify-center">
    <div class="w-full max-w-md p-8 bg-card-gray rounded-lg">
      <h2 class="text-2xl font-bold text-center text-primary-green py-2">Iniciar Sesión</h2>
      <p class="text-center text-text-gray mb-8 text-md font-semibold mt-2">
          Inicia sesión para acceder a tu cuenta. 🔑
        </p>
        <!-- Escucha evento Submit y se dispara la función -->
      <form @submit.prevent="Login()" action="#">
        <!-- Referenciamos el email y password con nuestras credenciales -->
        <input type="email" v-model="credencialesReactivas.email" placeholder="Correo Electronico" class="w-full px-4 py-3 mb-6 text-input-gray bg-almost-black rounded-md focus:outline-none focus:ring focus:ring-secondary-blue">
        <input type="password" v-model="credencialesReactivas.password" placeholder="Contraseña" class="w-full px-4 py-3 mb-8 text-input-gray bg-almost-black rounded-md focus:outline-none focus:ring focus:ring-secondary-blue">
        <button type="submit" class="w-full py-3 mb-6 text-white bg-success-green font-bold rounded-md hover:bg-primary-green hover:text-gray-950 transition-colors">Ingresar 🔐</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
