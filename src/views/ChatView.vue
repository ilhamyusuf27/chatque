<script setup lang="ts">
import ChatHeader from '@/components/Chat/ChatHeader.vue'
import ChatList from '@/components/Chat/ChatList.vue'
import { ChatActions, ChatGetter, ChatMutations } from '@/store/enums/ChatsEnums'
import type { CustomerChatRooms, RootState } from '@/store/types'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore<RootState>()
const roomId = computed(() => store.getters[`chat/${ChatGetter.GET_ACTIVE_ROOM_ID}`])
const customerChatRooms = computed(
  () => store.getters[`chat/${ChatGetter.GET_ALL_CUSTOMER_CHAT_ROOM}`],
)

const route = useRoute()
const params = route.params

const hasInitialized = ref<boolean>(false)

onMounted(() => {
  if (!roomId.value) {
    store.commit(`chat/${ChatMutations.SET_ACTIVE_CHAT}`, params.roomId)
  }
})

watch(
  customerChatRooms,
  (newVal) => {
    if (hasInitialized.value || !newVal.length) return

    const roomData = newVal.find((room: CustomerChatRooms) => room.room_id === params.roomId)

    if (roomData) {
      store.dispatch(`chat/${ChatActions.SELECT_ROOM}`, roomData)
    }
  },
  {
    immediate: true,
  },
)
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
