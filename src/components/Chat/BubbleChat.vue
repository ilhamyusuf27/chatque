<script setup lang="ts">
import type { Message } from '@/store/types'
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
    <div class="message">
      {{ props.data.text }}
    </div>
    <div v-if="props.data.direction !== 'system'" class="message-time">
      {{ moment(props.data.timestamp).format('HH:mm') }}
    </div>
  </div>
</template>

<style scoped>
.bubble-chat {
  padding: 1rem;
  background-color: var(--background-bubble-received);
  border-radius: 0.75rem;
  word-break: break-word;
  max-width: 80%;
}

.bubble-chat.sent {
  align-items: flex-end;
  margin-left: auto;
}

.bubble-chat.received {
  align-self: flex-start;
  margin-right: auto;
}

.bubble-chat.system {
  align-self: center;
  max-width: fit-content;
}

.message-time {
  text-align: end;
  font-size: 12px;
  color: var(--text-secondary);
}
</style>
