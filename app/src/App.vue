<template>
  <div v-if="appReady" class="app">
    <system-message :msg="systemMessage.msg" :msgType="systemMessage.msgType" />
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, ComputedRef, onMounted } from 'vue';
import { useStore } from 'vuex';
import { supabase } from './supabase/init';
import SystemMessage from '@/components/ui/SystemMessage.vue';
import { STORE_ACTIONS } from '@/store/actions';

import MenuBar from '@/components/MenuBar.vue';

export default defineComponent({
  components: {
    MenuBar,
    SystemMessage,
  },
  setup() {
    const store = useStore();

    const systemMessage: ComputedRef<SystemMessage> = computed(() => {
      return store.getters.systemMessage;
    });
    // const router = useRouter();

    onMounted(async () => {
      const { data: categories, error } = await supabase
        .from('category')
        .select('*');

      if (error) {
        console.error(error);
      } else {
        store.dispatch(STORE_ACTIONS.SET_CATEGORIES, categories);
      }
    });

    const user: ComputedRef<string | null> = computed((): string | null => {
      return store.getters.user;
    });

    const appReady = ref<boolean>(false);

    if (!user.value) {
      appReady.value = true;
    }

    supabase.auth.onAuthStateChange((_, session: any) => {
      store.dispatch(STORE_ACTIONS.SET_USER, session);
      appReady.value = true;
    });

    return {
      appReady,
      user,
      systemMessage,
    };
  },
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500;1,600&display=swap');

:root {
  --main-bg-color: #222736;
  --main-font-color: #f3f3f3;
  --icon-color: #555555;
  --dark-bg: #000;
  --accent-blue: #2a5dff;
  --accent-teal: #2bc8d7;
  --accent-violet: #7264e4;
  --accent-yellow: #ffc812;
  --text-muted: #b7b7b7;
  --white: #fff;
  --success: #0a310e;
  --error: #530000;
  --warning: #fd5d00;
}

* {
  margin: 0;
  padding: 0;
  font-family: 'Nunito', sans-serif;
}

body {
  margin: 0.5rem;
  padding: 0;
  box-sizing: border-box;
  background: var(--main-bg-color);
  color: var(--main-font-color);
}

input {
  padding: 0.25rem;
  border-radius: 5px;
  border: none;
  outline: none;
  border: 2px solid var(--white);
}

input:focus {
  border-color: var(--bg-dark);
}

input:disabled {
  background: var(--white);
  color: var(--text-muted);
}

textarea {
  padding: 0.25rem;
  border-radius: 5px;
  border: none;
  outline: none;
  border: 2px solid var(--white);
}

textarea:focus {
  border-color: var(--bg-dark);
}

button {
  border: none;
  border-radius: 5px;
  font: inherit;
}

.input-element {
  display: grid;
}

.btn-bar {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-bar .btn {
  border: none;
  background: var(--dark-bg);
  border-radius: 5px;
  color: var(--main-font-color);
  padding: 0.5rem 1rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-leave-to,
.slide-right-enter-from {
  transform: translateX(-105%);
}

.slide-left-leave-from,
.slide-left-enter-to,
.slide-right-leave-from,
.slide-right-enter-to {
  transform: translateX(0);
}

.slide-left-enter-active,
.slide-right-enter-active {
  transition: 0.2s ease-out;
}

.slide-left-enter-from,
.slide-right-leave-to {
  transform: translateX(105%);
}

.slide-left-leave-active,
.slide-right-leave-active {
  transition: 0.2s ease-out;
}

.blue {
  background-color: var(--accent-blue);
}

.teal {
  background: var(--accent-teal);
  color: var(--main-bg-color);
}

.yellow {
  background: var(--accent-yellow);
  color: var(--main-bg-color);
}

.violet {
  background: var(--accent-violet);
}
</style>
