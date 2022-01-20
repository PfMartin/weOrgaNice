<template>
  <menu-bar />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { supabase } from './supabase/init';
import MenuBar from '@/components/MenuBar.vue';

export default defineComponent({
  components: {
    MenuBar,
  },
  setup() {
    const user = supabase.auth.user();

    const getCategories = async () => {
      try {
        console.log(supabase);

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
