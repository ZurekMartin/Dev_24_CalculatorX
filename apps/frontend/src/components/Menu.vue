<script setup>
import { ref } from 'vue';

const props = defineProps({ isDarkMode: Boolean, isLoggedIn: Boolean });
const emit = defineEmits(['cancel-menu', 'toggle-theme', 'login', 'logout']);

const infoAccountMessage = ref('');
const isInfoLabelAccountMessageVisible = ref(false);

const toggleTheme = () => emit('toggle-theme');
const cancelMenu = () => emit('cancel-menu');
const login = () => {
  emit('login');
  updateAccountMessage('Successfully logged in!');
};
const logout = () => {
  emit('logout');
  updateAccountMessage('Successfully logged out!');
};

const updateAccountMessage = (message) => {
  infoAccountMessage.value = message;
  isInfoLabelAccountMessageVisible.value = true;
  setTimeout(() => isInfoLabelAccountMessageVisible.value = false, 4000);
};
</script>

<template>
  <div id="menu" class="menu">
    <button @click="toggleTheme" id="theme-icon" :class="{ 'dark-icon': props.isDarkMode }">
      <img class="icon" :src="props.isDarkMode ? 'src/assets/sun.png' : 'src/assets/moon.png'" alt="Theme Icon"/>
    </button>
    <h2>Menu</h2>
    <button @click="cancelMenu" id="cancel-menu-icon" :class="{ 'dark-icon': props.isDarkMode }">
      <img class="icon" :src="props.isDarkMode ? 'src/assets/cancel_dark_mode.png' : 'src/assets/cancel.png'"
           alt="Cancel Menu Icon"/>
    </button>
    <div class="account-section">
      <div v-if="!props.isLoggedIn" class="login-section">
        <label for="username">Username:</label>
        <input type="text" id="username"/>
        <label for="password">Password:</label>
        <input type="password" id="password"/>
        <button class="button toggle" @click="login" id="login-button" :class="{ 'dark-icon': props.isDarkMode }">
          Login
        </button>
      </div>
      <div v-else class="logout-section">
        <button class="button toggle" @click="logout" id="logout-button" :class="{ 'dark-icon': props.isDarkMode }">
          Logout
        </button>
      </div>
    </div>
    <span id="infoLabelAccount" class="info-label" :class="{ visible: isInfoLabelAccountMessageVisible }">{{ infoAccountMessage }}</span>
  </div>
</template>
