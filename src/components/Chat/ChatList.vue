<script setup lang="ts">
import { useStore } from 'vuex'
import BubbleChat from './BubbleChat.vue'
import InputChat from './InputChat.vue'
import type { RootState } from '@/store/types'
import { ChatGetter } from '@/store/enums/ChatsEnums'
import { computed, watch } from 'vue'

const store = useStore<RootState>()

const messages = computed(() => store.getters[`chat/${ChatGetter.GET_MESSAGE_DATA}`])

watch(messages, (newVal) => console.log('messages', newVal))
</script>

<template>
  <div class="chat-wrapper">
    <div style="margin-top: auto" />
    <BubbleChat v-for="message in messages" :key="message.id" :data="message" />
    <InputChat />
  </div>
</template>

<style scoped>
.chat-wrapper {
  flex: 1;
  border: 1px solid var(--border-color);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  border-right: 1px solid var(--border-color);
}
</style>
