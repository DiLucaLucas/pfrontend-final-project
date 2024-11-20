<script setup lang="ts">
const logout = () => {
    console.log("Cerrando Sesión")
}
</script>
<template>
    <header class="bg-background-gray text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 class="text-2xl font-bold"> ToDo App </h1>
        <button class="bg-success-green hover:text-gray-950 transition-colors px-4 py-2 rounded-md shadow font-bold" @click="logout">
            Cerrar Sesión
        </button>
    </header>
</template>
<style scoped>
</style>
