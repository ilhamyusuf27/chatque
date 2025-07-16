<template>
  <div class="welcome-wrapper">
    <img src="https://img.icons8.com/?size=100&id=13724&format=png&color=000000" alt="icon-logo" />
    <span class="welcome-title">Chatque</span>
    <span class="welcome-desc"
      >Effortless messaging on desktop — no need to keep your phone online.</span
    >
  </div>
</template>

<style class>
.welcome-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vw;
}

.welcome-title {
  font-weight: 700;
  font-size: 24px;
}

.welcome-desc {
  color: var(--text-secondary);
}
</style>
