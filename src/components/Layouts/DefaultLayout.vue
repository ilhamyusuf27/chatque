<script setup lang="ts">
import SidebarApp from './SidebarApp.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <SidebarApp />
    <main class="chat-window">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100%;
  padding: 1rem;
}

.chat-window {
  flex: 1;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
}
</style>
