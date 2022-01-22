<template>
  <menu-bar></menu-bar>
  <router-view></router-view>
  <h1>{{ user }}</h1>
</template>

<script lang="ts">
import { defineComponent, ref, computed, ComputedRef } from 'vue';
import { useStore } from 'vuex';
import { supabase } from './supabase/init';

import MenuBar from '@/components/MenuBar.vue';

export default defineComponent({
  components: {
    MenuBar,
  },
  setup() {
    const store = useStore();
    store.dispatch('setUser', supabase.auth.user());
    const user: ComputedRef<string | null> = computed((): string | null => {
      console.log(store.getters.user);
      return store.getters.user;
    });

    const getCategories = async () => {
      try {
        const appReady = ref(null);

        // const { data: category, error } = await supabase
        //   .from('category')
        //   .select('id');
        //
        // if (error) {
        //   throw error;
        // }
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();

    return {
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
