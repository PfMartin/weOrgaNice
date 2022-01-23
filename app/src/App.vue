<template>
  <div v-if="appReady" class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { supabase } from './supabase/init';

import MenuBar from '@/components/MenuBar.vue';

export default defineComponent({
  components: {
    MenuBar,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const user: ComputedRef<string | null> = computed((): string | null => {
      return store.getters.user;
    });

    const appReady = ref<boolean>(false);

    if (!user.value) {
      appReady.value = true;
    }

    supabase.auth.onAuthStateChange((_, session: any) => {
      console.log('authStateChange');
      console.log(session);
      store.dispatch('setUser', session);
      appReady.value = true;
    });

    console.log(appReady.value);

    return {
      appReady,
      user,
    };
  },
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dongle:wght@300;400;700&display=swap');

:root {
  --main-bg-color: #222736;
  --main-font-color: #f3f3f3;
  --icon-color: #555555;
}

body {
  font-family: 'Dongle', sans-serif;
  margin: 0;
  padding: 5px;
  box-sizing: border-box;
  background: var(--main-bg-color);
  color: var(--main-font-color);
}
</style>
