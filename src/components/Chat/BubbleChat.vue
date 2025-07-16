<script setup lang="ts">
import type { Message } from '@/store/types'
import { generateAltFromUrl } from '@/utils/helpers'
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
    <div v-if="props.data.direction !== 'system'" class="message-time">
      {{ moment(props.data.timestamp).format('HH:mm') }}
    </div>
  </div>
</template>

<style scoped>
.bubble-chat {
  display: inline-flex;
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
</style>
