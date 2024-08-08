<script setup>
import {ref} from 'vue';
import History from './components/History.vue';
import Menu from './components/Menu.vue';
import Calculator from './components/Calculator.vue';

const isHistoryVisible = ref(false);
const isMenuVisible = ref(false);
const isDarkMode = ref(false);

function toggleHistory() {
  isHistoryVisible.value = !isHistoryVisible.value;
}

function toggleMenu() {
  isMenuVisible.value = !isMenuVisible.value;
}
</script>

<template>
  <div id="app" :class="{ 'dark-theme': isDarkMode }">
    <button @click="toggleHistory" id="history-toggle" :class="{ 'dark-icon': isDarkMode }">
      <img :src="isDarkMode ? 'src/assets/history_dark_mode.png' : 'src/assets/history.png'" alt="Menu Icon" />
    </button>
    <History :class="{ visible: isHistoryVisible }" />
    <button @click="toggleMenu" id="menu-toggle" :class="{ 'dark-icon': isDarkMode }">
      <img :src="isDarkMode ? 'src/assets/menu.png' : 'src/assets/menu.png'" alt="Menu Icon" />
    </button>
    <Menu :class="{ visible: isMenuVisible }" />
    <Calculator />
  </div>
</template>
