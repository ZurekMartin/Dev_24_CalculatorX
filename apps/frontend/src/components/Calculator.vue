<template>
  <div class="calculator">
    <h1>CalculatorX</h1>
    <input type="text" id="display" v-model="displayValue" disabled>
    <div class="buttons">
      <div class="row">
        <button class="button clear" @click="clearDisplay">AC</button>
        <button class="button" @click="negation">(+/-)</button>
        <button class="button" @click="backspace">&larr;</button>
        <button class="button" @click="operate('/')">&divide;</button>
      </div>
      <div class="row">
        <button class="button" @click="appendNumber('7')">7</button>
        <button class="button" @click="appendNumber('8')">8</button>
        <button class="button" @click="appendNumber('9')">9</button>
        <button class="button" @click="operate('*')">&times;</button>
      </div>
      <div class="row">
        <button class="button" @click="appendNumber('4')">4</button>
        <button class="button" @click="appendNumber('5')">5</button>
        <button class="button" @click="appendNumber('6')">6</button>
        <button class="button" @click="operate('-')">&minus;</button>
      </div>
      <div class="row">
        <button class="button" @click="appendNumber('1')">1</button>
        <button class="button" @click="appendNumber('2')">2</button>
        <button class="button" @click="appendNumber('3')">3</button>
        <button class="button" @click="operate('+')">&plus;</button>
      </div>
      <div class="row">
        <button class="button" @click="copyToClipboard">&#10064;</button>
        <button class="button" @click="appendNumber('0')">0</button>
        <button class="button" @click="appendNumber('.')">.</button>
        <button class="button equal" @click="calculate">&equals;</button>
      </div>
      <button class="button toggle" @click="toggleScientific">Scientific mode</button>
      <div id="scientific-mode" class="buttons hidden">
        <div class="row">
          <button class="button" @click="scientificFunction('sin')">sin</button>
          <button class="button" @click="scientificFunction('cos')">cos</button>
          <button class="button" @click="scientificFunction('tan')">tan</button>
          <button class="button" @click="scientificFunction('log')">log</button>
        </div>
        <div class="row">
          <button class="button" @click="scientificFunction('sqrt')">&radic;</button>
          <button class="button" @click="scientificFunction('pow')">x<sup>2</sup></button>
          <button class="button" @click="scientificFunction('exp')">exp</button>
          <button class="button" @click="appendNumber(Math.PI)">&pi;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, onBeforeUnmount} from 'vue';

export default {
  props: {
    isMenuVisible: Boolean
  },
  setup(props, {emit}) {
    const displayValue = ref('');
    const isErrorDisplayed = ref(false);
    const isResultDisplayed = ref(false);

    const clearDisplay = () => {
      displayValue.value = '';
      isErrorDisplayed.value = false;
      isResultDisplayed.value = false;
    };

    const negation = () => {
      displayValue.value = (parseFloat(displayValue.value) * -1).toString();
    };

    const backspace = () => {
      if (displayValue.value.length > 0) {
        displayValue.value = displayValue.value === 'Error' ? '' : displayValue.value.slice(0, -1);
        isErrorDisplayed.value = displayValue.value === '';
      }
    };

    const operate = (operand) => {
      if (isErrorDisplayed.value) {
        displayValue.value = '';
        isErrorDisplayed.value = false;
      } else if (isResultDisplayed.value) {
        isResultDisplayed.value = false;
      }
      displayValue.value += ` ${operand} `;
    };

    const appendNumber = (number) => {
      if (isErrorDisplayed.value) {
        displayValue.value = '';
        isErrorDisplayed.value = false;
      }

      if (isResultDisplayed.value) {
        if (number !== '.') {
          displayValue.value = '';
        }
        isResultDisplayed.value = false;
      }

      if (number === '.') {
        const parts = displayValue.value.split(/[+\-*\/]/).map(part => part.trim());
        const lastPart = parts[parts.length - 1];

        if (lastPart.includes('.')) {
          return;
        }
      }

      displayValue.value += number;
    };

    const copyToClipboard = () => {
      if (displayValue.value === '' || displayValue.value === null) {
        emit('update-info', 'No value to copy');
      } else {
        navigator.clipboard.writeText(displayValue.value)
            .then(() => {
              emit('update-info', 'Copied!');
            })
            .catch(err => {
              console.error('Failed to copy text: ', err);
              emit('update-info', 'Error: Failed to copy');
            });
      }
    };

    const calculate = () => {
      if (!isErrorDisplayed.value) {
        try {
          displayValue.value = eval(displayValue.value).toString();
          isResultDisplayed.value = true;
        } catch (error) {
          console.error("Error evaluating expression: ", error);
          displayValue.value = "Error";
          isErrorDisplayed.value = true;
          isResultDisplayed.value = false;
        }
      } else {
        displayValue.value = '';
        isErrorDisplayed.value = false;
      }
    };

    const toggleScientific = () => {
      const scientificMode = document.getElementById('scientific-mode');
      if (scientificMode.classList.contains('hidden')) {
        scientificMode.classList.remove('hidden');
        scientificMode.classList.add('showed');
      } else {
        scientificMode.classList.remove('showed');
        scientificMode.classList.add('hidden');
      }
    };

    const scientificFunction = (func) => {
      let value = parseFloat(displayValue.value);
      if (isNaN(value)) {
        displayValue.value = 'Error';
        return;
      }

      const functions = {
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.tan,
        log: Math.log10,
        sqrt: Math.sqrt,
        pow: (v) => Math.pow(v, 2),
        exp: Math.exp
      };

      displayValue.value = functions[func] ? functions[func](value).toString() : 'Error';
    };

    const handleKeydown = (event) => {
      if (props.isMenuVisible) {
        return;
      }

      const key = event.key;
      const keyActions = {
        '0': () => appendNumber(key),
        '1': () => appendNumber(key),
        '2': () => appendNumber(key),
        '3': () => appendNumber(key),
        '4': () => appendNumber(key),
        '5': () => appendNumber(key),
        '6': () => appendNumber(key),
        '7': () => appendNumber(key),
        '8': () => appendNumber(key),
        '9': () => appendNumber(key),
        '.': () => appendNumber(key),
        '+': () => operate(key),
        '-': () => operate(key),
        '*': () => operate(key),
        '/': () => operate(key),
        'Enter': calculate,
        'Backspace': backspace,
        'Escape': clearDisplay,
        'n': negation,
        's': () => scientificFunction('sin'),
        'c': () => scientificFunction('cos'),
        't': () => scientificFunction('tan'),
        'l': () => scientificFunction('log'),
        'r': () => scientificFunction('sqrt'),
        'x': () => scientificFunction('pow'),
        'e': () => scientificFunction('exp'),
        'p': () => {
          displayValue.value = Math.PI.toString();
        },
        'T': toggleScientific
      };

      if (keyActions[key]) {
        keyActions[key]();
        event.preventDefault();
      }
    };

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeydown);
    });

    return {
      displayValue,
      clearDisplay,
      negation,
      backspace,
      operate,
      appendNumber,
      copyToClipboard,
      calculate,
      toggleScientific,
      scientificFunction
    };
  }
};
</script>
