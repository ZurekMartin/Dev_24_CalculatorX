<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {auth, db} from '../firebase';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';

const props = defineProps({
  isDarkMode: Boolean,
  isLoggedIn: Boolean,
  isMenuVisible: Boolean
});
const emit = defineEmits(['cancel-menu', 'toggle-theme', 'login', 'logout', 'register']);

const infoAccountMessage = ref('');
const isInfoLabelAccountMessageVisible = ref(false);
const isRegistering = ref(false);
const username = ref('');
const password = ref('');

const usernameRef = ref(null);
const passwordRef = ref(null);
const loginButtonRef = ref(null);
const registerButtonRef = ref(null);

const toggleTheme = () => emit('toggle-theme');
const cancelMenu = () => emit('cancel-menu');

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, username.value, password.value);
    emit('login');
    updateAccountMessage('Successfully logged in!');
  } catch (error) {
    updateAccountMessage(`Login failed: ${error.message}`);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    emit('logout');
    updateAccountMessage('Successfully logged out!');
  } catch (error) {
    updateAccountMessage(`Logout failed: ${error.message}`);
  }
};

const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, username.value, password.value);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date(),
      profileSettings: {theme: props.isDarkMode ? 'dark' : 'light'},
      historyEntries: []
    });
    emit('register');
    updateAccountMessage('Successfully registered!');
  } catch (error) {
    updateAccountMessage(`Registration failed: ${error.message}`);
  }
};

const toggleRegistering = () => {
  isRegistering.value = !isRegistering.value;
};

const updateAccountMessage = (message) => {
  infoAccountMessage.value = message;
  isInfoLabelAccountMessageVisible.value = true;
  setTimeout(() => isInfoLabelAccountMessageVisible.value = false, 4000);
};

const handleKeydown = (event) => {
  if (!props.isMenuVisible) return;

  const key = event.key;

  if (props.isLoggedIn) {
    if (key === 'Escape') {
      logout();
    }
    return;
  }

  if (key === 'ArrowUp') {
    if (document.activeElement === passwordRef.value) {
      usernameRef.value.focus();
    }
  } else if (key === 'ArrowDown') {
    if (document.activeElement === usernameRef.value) {
      passwordRef.value.focus();
    }
  } else if (key === 'Enter') {
    if (isRegistering.value) {
      register();
    } else {
      login();
    }
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
});
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
        <label for="username">{{ isRegistering ? 'New Account Username:' : 'Username:' }}</label>
        <input type="text" id="username" v-model="username" ref="usernameRef"/>
        <label for="password">{{ isRegistering ? 'New Account Password:' : 'Password:' }}</label>
        <input type="password" id="password" v-model="password" ref="passwordRef"/>
        <button v-if="!isRegistering" class="button toggle" @click="login" id="login-button" ref="loginButtonRef"
                :class="{ 'dark-icon': props.isDarkMode }">Login
        </button>
        <button v-else class="button toggle" @click="register" id="register-button" ref="registerButtonRef"
                :class="{ 'dark-icon': props.isDarkMode }">Register
        </button>
      </div>
      <div v-else class="logout-section">
        <button class="button toggle" @click="logout" id="logout-button" :class="{ 'dark-icon': props.isDarkMode }">
          Logout
        </button>
      </div>
      <span v-if="!props.isLoggedIn" @click="toggleRegistering" class="action-link"
            :class="{ 'dark-icon': props.isDarkMode }">
        {{ isRegistering ? 'Already have an account?' : 'Not registered yet?' }}
      </span>
    </div>
    <span id="infoLabelAccount" class="info-label"
          :class="{ visible: isInfoLabelAccountMessageVisible }">{{ infoAccountMessage }}</span>
  </div>
</template>
