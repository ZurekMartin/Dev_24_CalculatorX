<script setup>
const props = defineProps({isDarkMode: Boolean});
const emit = defineEmits(['cancel-history']);

const cancelHistory = () => emit('cancel-history');
</script>

<template>
  <div id="history" class="history">
    <button @click="cancelHistory" id="cancel-history-icon" :class="{ 'dark-icon': props.isDarkMode }">
      <img class="icon" :src="props.isDarkMode ? 'src/assets/cancel_dark_mode.png' : 'src/assets/cancel.png'"
           alt="Cancel History Icon"/>
    </button>
    <h2>History</h2>
  </div>
</template>
