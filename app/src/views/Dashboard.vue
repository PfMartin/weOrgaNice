<template>
  <div class="dashboard">
    <menu-bar></menu-bar>
    <h1>This is the dashboard view</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuBar from '@/components/MenuBar.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Dashboard',
  components: {
    MenuBar,
  },
  setup() {
    const store = useStore();
    console.log(store.getters.user);
  },
});
</script>
