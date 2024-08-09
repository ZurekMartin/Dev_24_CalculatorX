<script setup>
import { ref } from 'vue';

const isMenuVisible = ref(false);

const toggleTheme = () => emit('toggle-theme');
const cancelMenu = () => emit('cancel-menu');

const props = defineProps({
  isDarkMode: Boolean
});

const emit = defineEmits(['cancel-menu', 'toggle-theme']);
</script>

<template>
  <div id="menu" class="menu" :class="{ visible: isMenuVisible }">
    <button @click="toggleTheme" id="theme-icon" :class="{ 'dark-icon': props.isDarkMode }">
      <img class="icon" :src="props.isDarkMode ? 'src/assets/sun.png' : 'src/assets/moon.png'" alt="Theme Icon"/>
    </button>
    <h2>Menu</h2>
    <button @click="cancelMenu" id="cancel-menu-icon" :class="{ 'dark-icon': props.isDarkMode }">
      <img class="icon" :src="props.isDarkMode ? 'src/assets/cancel_dark_mode.png' : 'src/assets/cancel.png'" alt="Cancel Menu Icon"/>
    </button>
  </div>
</template>
