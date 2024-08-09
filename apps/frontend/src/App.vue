<script setup>
import { ref } from 'vue';
import History from './components/History.vue';
import Menu from './components/Menu.vue';
import Calculator from './components/Calculator.vue';

const isHistoryVisible = ref(false);
const isMenuVisible = ref(false);
const isDarkMode = ref(false);
const isInfoLabelVisible = ref(false);
const infoMessage = ref('');
const infoIconClickCount = ref(0);

const openHistory = () => {
  isHistoryVisible.value = true;
};

function handleCancelHistory() {
  isHistoryVisible.value = false;
}

const openMenu = () => {
  isMenuVisible.value = true;
};

function handleCancelMenu() {
  isMenuVisible.value = false;
}

function toggleInfo() {
  infoIconClickCount.value++;

  if (infoIconClickCount.value === 8) {
    infoMessage.value = 'Surprise!';
    infoIconClickCount.value = 0;
  } else {
    infoMessage.value = 'Calculator Version: 1.0';
  }

  isInfoLabelVisible.value = true;

  setTimeout(() => {
    isInfoLabelVisible.value = false;
  }, 4000);
}

function updateInfo(message) {
  infoMessage.value = message;
  isInfoLabelVisible.value = true;

  setTimeout(() => {
    isInfoLabelVisible.value = false;
  }, 4000);
}
</script>

<template>
  <div id="app" :class="{ 'dark-theme': isDarkMode }">
    <button @click="openHistory" id="history-icon" :class="{ 'dark-icon': isDarkMode }">
      <img class="icon" :src="isDarkMode ? 'src/assets/history_dark_mode.png' : 'src/assets/history.png'"
           alt="History Icon"/>
    </button>
    <History :class="{ visible: isHistoryVisible }" @cancel-history="handleCancelHistory"/>
    <button @click="openMenu" id="menu-icon" :class="{ 'dark-icon': isDarkMode }">
      <img class="icon" :src="isDarkMode ? 'src/assets/menu.png' : 'src/assets/menu.png'" alt="Menu Icon"/>
    </button>
    <Menu :class="{ visible: isMenuVisible }" @cancel-menu="handleCancelMenu"/>
    <Calculator @update-info="updateInfo"/>
    <button @click="toggleInfo" id="info-icon" :class="{ 'dark-icon': isDarkMode }">
      <img class="icon" :src="isDarkMode ? 'src/assets/info_dark_mode.png' : 'src/assets/info.png'" alt="Info Icon"/>
    </button>
    <span id="infoLabel" :class="{ visible: isInfoLabelVisible }">{{ infoMessage }}</span>
  </div>
</template>