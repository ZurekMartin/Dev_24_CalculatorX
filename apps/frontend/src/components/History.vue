<script setup>
import { ref, defineEmits } from 'vue';

const isDarkMode = ref(false);
const isHistoryVisible = ref(false);

const emit = defineEmits(['cancel-history']);

function cancelHistory() {
  emit('cancel-history');
}
</script>

<template>
  <div id="history" class="history" :class="{ showed: isHistoryVisible }">
    <button @click="cancelHistory" id="cancel-history-icon" :class="{ 'dark-icon': isDarkMode }">
      <img class="icon" :src="isDarkMode ? 'src/assets/cancel_dark_mode.png' : 'src/assets/cancel.png'" alt="Cancel History Icon"/>
    </button>
    <h2>History</h2>
  </div>
</template>