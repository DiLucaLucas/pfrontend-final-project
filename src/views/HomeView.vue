<script setup lang="ts">
import HeaderComponent from '@/components/shared/HeaderComponent.vue';
import HeroComponent from '@/components/HeroComponent.vue';
import FooterComponent from '@/components/shared/FooterComponent.vue';

</script>

<template>
  <!-- <div class="min-h-screen bg-almost-black">
    <HeaderComponent />
    <main>
      <HeroComponent />
    </main>
      <FooterComponent />
  </div> -->
  <div class='min-h-screen flex flex-col bg-almost-black'>
  <HeaderComponent />
  <main class="flex-grow">
    <HeroComponent />
  </main>
  <FooterComponent />
  </div>
</template>
