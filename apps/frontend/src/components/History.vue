<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase';

const props = defineProps({ isDarkMode: Boolean });
const emit = defineEmits(['cancel-history']);
const historyEntries = ref([]);
let intervalId = null;

const loadCalculationHistory = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(getFirestore(), 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const data = userDoc.data().historyEntries || [];
        historyEntries.value = data.map(entry => entry.result || entry.value || 'Unknown result');
      } else {
        emit('update-info', 'No history found');
      }
    } else {
      emit('update-info', 'User not logged in');
    }
  } catch (error) {
    console.error('Error loading history: ', error);
    emit('update-info', 'Error: Failed to load history');
  }
};

const cancelHistory = () => emit('cancel-history');

onMounted(() => {
  loadCalculationHistory();
  intervalId = setInterval(loadCalculationHistory, 1000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div id="history" class="history">
    <button @click="cancelHistory" id="cancel-history-icon" :class="{ 'dark-icon': props.isDarkMode }">
      <img class="icon" :src="props.isDarkMode ? 'src/assets/cancel_dark_mode.png' : 'src/assets/cancel.png'"
           alt="Cancel History Icon"/>
    </button>
    <h2>History</h2>
    <div v-for="entry in historyEntries" :key="entry" class="history-entry">{{ entry }}</div>
  </div>
</template>
