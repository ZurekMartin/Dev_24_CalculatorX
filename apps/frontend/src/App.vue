<script setup>
import {ref, computed, onMounted} from 'vue';
import History from './components/History.vue';
import Menu from './components/Menu.vue';
import Calculator from './components/Calculator.vue';

const isHistoryVisible = ref(false);
const isMenuVisible = ref(false);
const isDarkMode = ref(false);
const isInfoLabelVisible = ref(false);
const infoMessage = ref('');
const infoIconClickCount = ref(0);
const isLoggedIn = ref(false);

const openHistory = () => isHistoryVisible.value = true;
const handleCancelHistory = () => isHistoryVisible.value = false;
const openMenu = () => isMenuVisible.value = true;
const handleCancelMenu = () => isMenuVisible.value = false;

const historyIconSrc = computed(() => isDarkMode.value ? 'src/assets/history_dark_mode.png' : 'src/assets/history.png');
const menuIconSrc = computed(() => isDarkMode.value ? 'src/assets/menu_dark_mode.png' : 'src/assets/menu.png');
const infoIconSrc = computed(() => isDarkMode.value ? 'src/assets/info_dark_mode.png' : 'src/assets/info.png');

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('dark-theme', isDarkMode.value);
  localStorage.setItem('CalculatorXTheme', isDarkMode.value ? 'dark' : 'light');
};

const toggleInfo = () => {
  infoIconClickCount.value++;
  infoMessage.value = infoIconClickCount.value === 8 ? 'Surprise!' : 'Version: 1.0';
  if (infoIconClickCount.value === 8) infoIconClickCount.value = 0;
  isInfoLabelVisible.value = true;
  setTimeout(() => isInfoLabelVisible.value = false, 4000);
};

const updateInfo = (message) => {
  infoMessage.value = message;
  isInfoLabelVisible.value = true;
  setTimeout(() => isInfoLabelVisible.value = false, 4000);
};

const handleLogin = () => {
  isLoggedIn.value = true;
};

const handleLogout = () => {
  isLoggedIn.value = false;
};

const handleRegister = () => {
  isLoggedIn.value = true;
};

onMounted(() => {
  const CalculatorXTheme = localStorage.getItem('CalculatorXTheme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  isDarkMode.value = CalculatorXTheme === 'dark';
  document.body.classList.toggle('dark-theme', isDarkMode.value);
});
</script>

<template>
  <div id="app" :class="{ 'dark-theme': isDarkMode }">
    <button @click="openHistory" id="history-icon" :class="{ 'dark-icon': isDarkMode }">
      <img class="icon" :src="historyIconSrc" alt="History Icon"/>
    </button>
    <History :class="{ visible: isHistoryVisible }" :is-dark-mode="isDarkMode" @cancel-history="handleCancelHistory"/>
    <button @click="openMenu" id="menu-icon" :class="{ 'dark-icon': isDarkMode }">
      <img class="icon" :src="menuIconSrc" alt="Menu Icon"/>
    </button>
    <Menu :class="{ visible: isMenuVisible }" :is-dark-mode="isDarkMode" :is-logged-in="isLoggedIn"
          @toggle-theme="toggleTheme" @cancel-menu="handleCancelMenu" @login="handleLogin" @logout="handleLogout" @register="handleRegister"/>
    <Calculator :is-menu-visible="isMenuVisible" @update-info="updateInfo"/>
    <button @click="toggleInfo" id="info-icon" :class="{ 'dark-icon': isDarkMode }">
      <img class="icon" :src="infoIconSrc" alt="Info Icon"/>
    </button>
    <span id="infoLabel" class="info-label" :class="{ visible: isInfoLabelVisible }">{{ infoMessage }}</span>
  </div>
</template>
