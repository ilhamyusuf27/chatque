<script setup lang="ts">
import { useStore } from 'vuex'
import BubbleChat from './BubbleChat.vue'
import type { Message, RootState } from '@/store/types'
import { ChatGetter } from '@/store/enums/ChatsEnums'
import { computed, ref, watch, nextTick } from 'vue'
import moment from 'moment'

const store = useStore<RootState>()

const productData = ref<Message>({
  id: 289,
  text: 'https://down-id.img.susercontent.com/file/39315dac4e1ede8ab48d3362e632a04d',
  type: 'product',
  timestamp: moment().toISOString(),
  direction: 'receive',
  price: 800000,
  productName: 'Vans Old Skol Authentic',
})

const chatContainer = ref<HTMLDivElement | null>(null)

const messages = computed(() => store.getters[`chat/${ChatGetter.GET_MESSAGE_DATA}`])
const roomId = computed(() => store.getters[`chat/${ChatGetter.GET_ACTIVE_ROOM_ID}`])

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
    <BubbleChat v-if="roomId === '313621130'" :data="productData" />
  </div>
</template>

<style scoped>
.chat-wrapper {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
