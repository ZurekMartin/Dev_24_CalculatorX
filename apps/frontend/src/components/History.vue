<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {auth, db} from '../firebase';

const props = defineProps({isDarkMode: Boolean});
const emit = defineEmits(['cancel-history']);
const historyEntries = ref([]);
let intervalId = null;

const loadCalculationHistory = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        historyEntries.value = (userDoc.data().historyEntries || [])
            .reverse()
            .slice(0, 12)
            .map(entry => entry.result || entry.value || 'Unknown result');
      } else {
        emit('update-info', 'No history found');
      }
    } else {
      historyEntries.value = (JSON.parse(localStorage.getItem('historyEntries')) || [])
          .reverse()
          .slice(0, 12)
          .map(entry => entry.result || entry.value || 'Unknown result');
      emit('update-info', 'User not logged in, showing local history');
    }
  } catch (error) {
    console.error('Error loading history: ', error);
    emit('update-info', 'Error: Failed to load history');
  }
};

const deleteHistory = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), {historyEntries: []});
      await loadCalculationHistory();
      emit('update-info', 'History deleted');
    } else {
      localStorage.removeItem('historyEntries');
      historyEntries.value = [];
      emit('update-info', 'Local history deleted');
    }
  } catch (error) {
    console.error('Error deleting history: ', error);
    emit('update-info', 'Error: Failed to delete history');
  }
};

const cancelHistory = () => emit('cancel-history');

onMounted(() => {
  loadCalculationHistory();
  intervalId = setInterval(loadCalculationHistory, 1000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div id="history" class="history">
    <button @click="cancelHistory" id="cancel-history-icon" :class="{ 'dark-icon': props.isDarkMode }">
      <img class="icon" :src="props.isDarkMode ? 'src/assets/cancel_dark_mode.png' : 'src/assets/cancel.png'"
           alt="Cancel History Icon"/>
    </button>
    <h2>History</h2>
    <div class="history-entries">
      <div v-for="(entry, index) in historyEntries.slice(0, 12)" :key="index" class="history-entry">{{ entry }}</div>
    </div>
    <div class="action-link bottom" @click="deleteHistory">Delete history</div>
  </div>
</template>
