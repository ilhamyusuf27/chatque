<script setup lang="ts">
import ChatHeader from '@/components/Chat/ChatHeader.vue'
import ChatList from '@/components/Chat/ChatList.vue'
</script>

<template>
  <div class="chat-view">
    <ChatHeader />
    <ChatList />
  </div>
</template>

<style scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}
</style>
