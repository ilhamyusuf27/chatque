<script setup lang="ts">
import type { Message } from '@/store/types'
import { generateAltFromUrl, toRupiah } from '@/utils/helpers'
import moment from 'moment'

const props = defineProps<{ data: Message }>()
</script>

<template>
  <div
    class="bubble-chat"
    :class="
      ['receive', 'customer'].includes(props.data.direction) ? 'received' : props.data.direction
    "
  >
    <div v-if="props.data.type === 'text'" class="message">
      {{ props.data.text }}
    </div>
    <div v-else-if="props.data.type === 'file'">
      <img :src="props.data.text.split(' ')[1]" :alt="generateAltFromUrl(props.data.text)" />
    </div>
    <div v-else-if="props.data.type === 'product'" class="product">
      <img :src="props.data.text" :alt="props.data.text" />
      <p class="product-name">{{ props.data.productName }}</p>
      <p class="price">{{ toRupiah(props.data.price as number) }}</p>
    </div>
    <div v-if="props.data.direction !== 'system'" class="message-time">
      {{ moment(props.data.timestamp).format('HH:mm') }}
    </div>
  </div>
</template>

<style scoped>
.bubble-chat {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem;
  border-radius: 0.75rem;
  word-break: break-word;
  max-width: 80%;
  width: fit-content;
  background-color: var(--background-bubble-received);
}

.bubble-chat.sent {
  align-items: flex-end;
  margin-left: auto;
}

.bubble-chat.received {
  align-self: flex-start;
  margin-right: auto;
  background-color: var(--primary-color);
}

.bubble-chat.system {
  align-self: center;
  max-width: fit-content;
}

.message-time {
  text-align: end;
  font-size: 12px;
  color: var(--text-primary);
  font-weight: 300;
}

.product {
  width: 300px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.product img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
}

.product-name {
  font-size: 20px;
  font-weight: 700;
}
</style>
