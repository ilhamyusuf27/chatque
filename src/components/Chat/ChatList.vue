<script setup lang="ts">
import { useStore } from 'vuex'
import BubbleChat from './BubbleChat.vue'
import type { RootState } from '@/store/types'
import { ChatGetter } from '@/store/enums/ChatsEnums'
import { computed, ref, watch, nextTick } from 'vue'

const store = useStore<RootState>()

const chatContainer = ref<HTMLDivElement | null>(null)

const messages = computed(() => store.getters[`chat/${ChatGetter.GET_MESSAGE_DATA}`])

watch(
  messages,
  async () => {
    await nextTick()
    const container = chatContainer.value
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  },
  { deep: true },
)
</script>

<template>
  <div ref="chatContainer" class="chat-wrapper">
    <BubbleChat v-for="message in messages" :key="message.id" :data="message" />
  </div>
</template>

<style scoped>
.chat-wrapper {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto; /* Pastikan ini auto atau scroll */
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
