<template lang="html">
  <div class="system-message">
    <transition name="slide-left" mode="out-in">
      <div
        v-if="msg && notClosed"
        class="msg-container"
        :class="backgroundColor"
      >
        <div class="close-button" @click="close">
          <ion-icon name="close"></ion-icon>
        </div>
        <h3>{{ headline }}</h3>
        <p>{{ msg }}</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, ref } from 'vue';
import {
  getSuccessHeadline,
  getWarningHeadline,
  getErrorHeadline,
} from '@/utils/systemMessage';

export default defineComponent({
  name: 'SystemMessage',
  props: {
    msgType: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const headline: ComputedRef<string> = computed(() => {
      if (props.msgType === 'warning') {
        return getWarningHeadline();
      } else if (props.msgType === 'error') {
        return getErrorHeadline();
      }
      return getSuccessHeadline();
    });

    const backgroundColor: ComputedRef<object> = computed(() => {
      return {
        warning: props.msgType === 'warning',
        success: props.msgType === 'success',
        error: props.msgType === 'error',
      };
    });

    const notClosed = ref<boolean>(true);

    const close = () => {
      notClosed.value = false;
    };

    return {
      headline,
      backgroundColor,
      notClosed,
      close,
    };
  },
});
</script>

<style lang="css" scoped>
.systemMessage {
  position: relative;
  display: flex;
}

.msg-container {
  position: absolute;
  z-index: 1;
  margin: 1rem;
  top: 0;
  right: 0;
  max-width: 93vw;
  min-width: 50vw;
  padding: 0.3rem 1rem;
  border: 2px solid var(--icon-color);
  border-radius: 7px;
  opacity: 0.9;
  color: var(--icon-color);
}

.close-button {
  position: absolute;
  padding: 0.2rem 0.2rem;
  top: 0;
  right: 0;
  cursor: pointer;
}

.success {
  background-color: var(--success);
}

.warning {
  background-color: var(--warning);
}

.error {
  background-color: var(--error);
}

.slide-left-leave-to {
  transform: translateX(105%);
}

.slide-left-leave-from,
.slide-left-enter-to {
  transform: translateX(0);
}

.slide-left-enter-active {
  transition: 0.2s ease-out;
}

.slide-left-enter-from {
  transform: translateX(105%);
}

.slide-left-leave-active {
  transition: 0.2s ease-out;
}
</style>
