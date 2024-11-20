<script setup lang="ts">
// Importamos reactive y ref
// Importamos nuestro store
import { reactive, ref } from 'vue';
import { useSesionStore } from '@/stores/auth_session.store'

// Importamos el modelo
import type { CredencialesModel } from '@/models/credencial.model';

// Hacemos reactivas nuestras constantes
const sesionStore = useSesionStore()
const auth = reactive(sesionStore)

// Definimos la estructura de nuestra constante
const credenciales : CredencialesModel = {
  email: '',
  password: '',
}

// Creamos una referencia individual
const input_confirm : string = '';
const inp_conf = ref(input_confirm);

// Convertimos nuestras credenciales reactivas
const credencialesReactivas = reactive(credenciales);

async function VerificarCredenciales() {
  // Comparamos los valores de la credencial reactiva y la confirmacion de la contraseña
  if (credencialesReactivas.password === inp_conf.value) {
    await auth.registrarUsuario(credenciales)
  } else {
    alert('Las contraseñas no coinciden ❌⛔')
  }
}
</script>
<template>
  <div class="flex items-center justify-center mt-10">
    <div class="w-full max-w-md p-8 bg-card-gray rounded-lg">
      <h2 class="text-2xl font-bold text-center text-primary-green py-2">Registrate</h2>
      <p class="text-center text-text-gray mb-8 text-md">
          Registra tus datos para acceder a tu cuenta.✍️
        </p>
        <!-- Utilizamos la funcion, para que se dispare, al hacer click -->
        <form @submit.prevent="VerificarCredenciales()">
        <input type="email" placeholder="Correo Electronico" v-model="credencialesReactivas.email" class="w-full px-4 py-3 mb-6 text-input-gray bg-almost-black rounded-md focus:outline-none focus:ring focus:ring-secondary-blue">
        <input type="password" placeholder="Contraseña" v-model="credencialesReactivas.password" class="w-full px-4 py-3 mb-8 text-input-gray bg-almost-black rounded-md focus:outline-none focus:ring focus:ring-secondary-blue">
        <input type="password" placeholder="Confirmar Contraseña" v-model="inp_conf" class="w-full px-4 py-3 mb-8 text-input-gray bg-almost-black rounded-md focus:outline-none focus:ring focus:ring-secondary-blue">
        <button type="submit" class="w-full py-2 mb-6 text-white bg-success-green font-bold rounded-md hover:bg-primary-green hover:text-gray-950 transition-colors">Ingresar 🔐</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

