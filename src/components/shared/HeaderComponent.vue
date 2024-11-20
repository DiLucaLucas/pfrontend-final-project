<script setup lang="ts">
// Importamos nuestro store y reactive
import { useSesionStore } from '@/stores/auth_session.store';
import { reactive } from 'vue';

// Tornamos reactiva nuestra constante
const sesionStore = useSesionStore()
const auth = reactive(sesionStore)

</script>
<template>
    <header class="bg-background-gray text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 class="text-2xl font-bold"> ToDo App </h1>
        <!-- Añadimos la acción del store con la directive v-on:click -->
        <button class="bg-success-green hover:text-gray-950 transition-colors px-4 py-2 rounded-md shadow font-bold" @click="auth.logout">
            Cerrar Sesión
        </button>
    </header>
</template>
<style scoped>
</style>
