<script setup>
import { ref } from 'vue';

const isDarkMode = ref(false);
const isHistoryVisible = ref(false);

function cancelHistory() {
  isHistoryVisible.value = false;
}
</script>

<template>
  <div id="history" class="history" :class="{ showed: isHistoryVisible }">
    <button @click="cancelHistory" id="cancel-history-icon" :class="{ 'dark-icon': isDarkMode }">
      <img class="icon" :src="isDarkMode ? 'src/assets/cancel_dark_theme.png' : 'src/assets/cancel.png'" alt="Cancel History Icon"/>
    </button>
    <h2>History</h2>
  </div>
</template>
