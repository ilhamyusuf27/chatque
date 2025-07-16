<script setup lang="ts">
import ChatHeader from '@/components/Chat/ChatHeader.vue'
import ChatList from '@/components/Chat/ChatList.vue'
import InputChat from '@/components/Chat/InputChat.vue'
import { ChatGetter, ChatMutations } from '@/store/enums/ChatsEnums'
import type { RootState } from '@/store/types'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore<RootState>()
const roomId = computed(() => store.getters[`chat/${ChatGetter.GET_ACTIVE_ROOM_ID}`])

const route = useRoute()
const params = route.params

const hasInitialized = ref<boolean>(false)

onMounted(() => {
  if (!roomId.value && !hasInitialized.value) {
    store.commit(`chat/${ChatMutations.SET_ACTIVE_CHAT}`, params.roomId)
  }
})
</script>

<template>
  <div class="chat-view">
    <ChatHeader />
    <ChatList />
    <InputChat />
  </div>
</template>

<style scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  border: 1px solid var(--border-color);
  padding-bottom: 1rem;
}
</style>
