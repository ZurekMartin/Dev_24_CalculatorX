<script setup>
import { ref } from 'vue';

const isDarkMode = ref(false);
const isMenuVisible = ref(false);

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('dark-theme', isDarkMode.value);
}

function cancelMenu() {
  isMenuVisible.value = false;
}
</script>

<template>
  <div id="menu" class="menu" :class="{ visible: isMenuVisible }">
    <button @click="toggleTheme" id="theme-icon" :class="{ 'dark-icon': isDarkMode }">
      <img class="icon" :src="isDarkMode ? 'src/assets/sun.png' : 'src/assets/moon.png'" alt="Theme Icon"/>
    </button>
    <h2>Menu</h2>
    <button @click="cancelMenu" id="cancel-menu-icon" :class="{ 'dark-icon': isDarkMode }">
      <img class="icon" :src="isDarkMode ? 'src/assets/cancel_dark_theme.png' : 'src/assets/cancel.png'" alt="Cancel Menu Icon"/>
    </button>
  </div>
</template>
