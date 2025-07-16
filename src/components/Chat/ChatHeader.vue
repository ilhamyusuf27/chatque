<script setup lang="ts">
import { ChatGetter } from '@/store/enums/ChatsEnums'
import type { RootState } from '@/store/types'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore<RootState>()
const roomData = computed(() => store.getters[`chat/${ChatGetter.GET_CUSTOMER_CHAT_ROOM}`])

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src =
    'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
}
</script>

<template>
  <div class="chat-header">
    <div class="avatar">
      <img
        :src="roomData.user_avatar_url"
        alt="avatar"
        class="avatar-img"
        @error="onImageError($event)"
      />
    </div>
    <div class="chat-information">
      <p>{{ roomData.name }}</p>
    </div>
  </div>
</template>

<style scoped>
.chat-header {
  background-color: var(--background-sidebar);
  padding: 8px 16px;
  display: flex;
  gap: 1rem;
  border: 1px solid var(--border-color);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.chat-information {
  flex: 1;
}

.chat-information p {
  font-weight: 700;
}
</style>
