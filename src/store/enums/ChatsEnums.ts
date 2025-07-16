export enum ChatGetter {
  GET_ALL_CUSTOMER_CHAT_ROOM = 'getAllCustomerChatRoom',
  GET_CUSTOMER_CHAT_ROOM = 'getCustomerChatRoom',
  GET_MESSAGE_DATA = 'getMessageData',
}

export enum ChatActions {
  GET_ALL_CUSTOMER_CHAT_ROOM = 'getAllCustomerChatRoom',
  GET_ACTIVE_CHAT = 'getActiveChat',
  SELECT_ROOM = 'selectRoom',
}

export enum ChatMutations {
  SET_CUSTOMER_CHAT_ROOM = 'SET_CUSTOMER_CHAT_ROOM',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE',
  SET_ACTIVE_CHAT = 'SET_ACTIVE_CHAT',
  ADD_MESSAGE_FOR_ROOM = 'ADD_MESSAGE_FOR_ROOM',
}
