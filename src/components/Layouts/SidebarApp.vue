<script setup lang="ts">
import { useStore } from 'vuex'
import type { CustomerChatRooms, RootState } from '@/store/types'
import { computed, onMounted, ref, watch } from 'vue'
import { ChatActions, ChatGetter } from '@/store/enums/ChatsEnums'
import moment from 'moment'

const store = useStore<RootState>()
const sidebar = ref<HTMLElement | null>(null)

const customerChatRooms = computed(
  () => store.getters[`chat/${ChatGetter.GET_ALL_CUSTOMER_CHAT_ROOM}`],
)

const roomId = computed(() => store.getters[`chat/${ChatGetter.GET_ACTIVE_ROOM_ID}`])

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src =
    'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
}

const selectRoom = (roomData: CustomerChatRooms) => {
  store.dispatch(`chat/${ChatActions.SELECT_ROOM}`, roomData)
}

onMounted(() => {
  store.dispatch(`chat/${ChatActions.GET_ALL_CUSTOMER_CHAT_ROOM}`)
})

watch(customerChatRooms, () => {
  if (sidebar.value) {
    sidebar.value.scrollTop = 0
  }
})
</script>

<template>
  <aside ref="sidebar" class="conversation-sidebar">
    <router-link
      :to="`/chat/${room.room_id}`"
      v-for="room in customerChatRooms"
      :key="room.room_id"
      class="conversation-item"
      :class="room.room_id === roomId ? 'conversation-active' : ''"
      @click="() => selectRoom(room)"
    >
      <div class="conversation-avatar">
        <img :src="room.user_avatar_url" :alt="room.name" @error="onImageError($event)" />
      </div>
      <div class="conversation-desc">
        <div class="conversation-header">
          <p class="conversation-name">{{ room.name }}</p>
          <p class="conversation-time">{{ moment(room.last_comment_timestamp).format('l') }}</p>
        </div>
        <div class="conversation-message" :title="room.last_comment_text">
          {{ room.last_comment_text }}
        </div>
      </div>
    </router-link>
  </aside>
</template>

<style scoped>
.conversation-sidebar {
  max-width: 30%;
  height: 100%;
  background-color: var(--background-sidebar);
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  border: 1px solid var(--border-color);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.conversation-sidebar::--webkit-scrollbar {
  display: none;
}

.conversation-item {
  border: 1px solid var(--border-color);
  padding: 1rem;
  font-size: 14px;
  cursor: pointer;
  border-radius: 0.5rem;
  display: flex;
  gap: 8px;
}

.conversation-item.conversation-active {
  background-color: var(--background-item-active);
}

.conversation-item:hover {
  background-color: var(--background-item-hover);
}

.conversation-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  overflow: hidden;
  flex-shrink: 0;
}

.conversation-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.conversation-desc {
  flex: 1;
  min-width: 0;
}

.conversation-header {
  display: flex;
  justify-content: space-between;
}

.conversation-name {
  font-weight: 700;
}

.conversation-time {
  color: var(--text-secondary);
  font-size: 12px;
}

.conversation-message {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
