<script setup>
const props = defineProps({isDarkMode: Boolean, isLoggedIn: Boolean});
const emit = defineEmits(['cancel-menu', 'toggle-theme', 'login', 'logout']);

const toggleTheme = () => emit('toggle-theme');
const cancelMenu = () => emit('cancel-menu');
const login = () => emit('login');
const logout = () => emit('logout');
</script>

<template>
  <div id="menu" class="menu">
    <button @click="toggleTheme" id="theme-icon" :class="{ 'dark-icon': props.isDarkMode }">
      <img class="icon" :src="props.isDarkMode ? 'src/assets/sun.png' : 'src/assets/moon.png'" alt="Theme Icon"/>
    </button>
    <h2>Menu</h2>
    <div v-if="!props.isLoggedIn" class="login-section">
      <label for="username">Username:</label>
      <input type="text" id="username"/>
      <label for="password">Password:</label>
      <input type="password" id="password"/>
      <button class="toggle" @click="login" id="login-button" :class="{ 'dark-icon': props.isDarkMode }">Login</button>
    </div>
    <button v-if="props.isLoggedIn" class="toggle" @click="logout" id="logout-button"
            :class="{ 'dark-icon': props.isDarkMode }">Logout
    </button>
    <button @click="cancelMenu" id="cancel-menu-icon" :class="{ 'dark-icon': props.isDarkMode }">
      <img class="icon" :src="props.isDarkMode ? 'src/assets/cancel_dark_mode.png' : 'src/assets/cancel.png'"
           alt="Cancel Menu Icon"/>
    </button>
  </div>
</template>

<style scoped>
.login-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}

.login-section label {
  margin-bottom: 0.5em;
  font-weight: bold;
}

.login-section input {
  margin-bottom: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
}

#login-button, #logout-button {
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>
