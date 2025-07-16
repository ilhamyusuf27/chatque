<script setup lang="ts">
import { ref, onMounted } from 'vue'

const content = ref('')
const textarea = ref(null)

const autoResize = () => {
  const el: any = textarea.value
  if (!el) return

  el.style.height = 'auto' // Reset dulu
  const maxHeight = parseInt(getComputedStyle(el).maxHeight)

  if (el.scrollHeight > maxHeight) {
    el.style.height = `${maxHeight}px`
    el.style.overflowY = 'auto'
  } else {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflowY = 'hidden'
  }
}

onMounted(() => {
  autoResize()
})
</script>

<template>
  <div class="send-message-container">
    <form class="form-chat">
      <textarea
        v-model="content"
        ref="textarea"
        rows="1"
        id="chat"
        placeholder="Tulis sesuatu..."
        name="chat"
        @input="autoResize"
        class="auto-textarea"
      />

      <button class="btn-send">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-send"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"
            fill="#ffffff"
          />
        </svg>
      </button>
    </form>
  </div>
</template>

<style scoped>
.send-message-container {
  background-color: var(--background-sidebar);
  padding: 0.5rem;
  min-height: 24px;
  border-radius: 2rem;
}

.form-chat {
  display: flex;
  align-items: center;
  gap: 8px;
}

.auto-textarea {
  background-color: transparent;
  color: var(--text-primary);
  border: none;
  flex: 1;
  min-height: 24px; /* Tinggi 1 baris */
  max-height: calc(24px * 4); /* Maksimal 4 baris */
  line-height: 24px;
  overflow-y: auto;
  resize: none;
  padding: 8px;
  font-size: 16px;
  box-sizing: border-box;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  cursor: text;
}

.auto-textarea:focus {
  border: none;
  outline: none;
  box-shadow: none;
}

.auto-textarea::-webkit-scrollbar-track {
  background-color: transparent;
}

.auto-textarea::-webkit-scrollbar {
  width: 8px;
  background-color: transparent;
}

.auto-textarea::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.079);
}

.input-chat:focus {
  border: none;
  outline: none;
  box-shadow: none;
}

.btn-send {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: var(--primary-color);
  transition: opacity 0.2s ease;
  cursor: pointer;
}

.btn-send:hover {
  opacity: 80%;
}
</style>
