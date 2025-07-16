import type { RootState } from '@/store/types'
import { createStore } from 'vuex'
import chatsModules from './modules/chats'

export const store = createStore<RootState>({
  modules: {
    chat: chatsModules,
  },
})
