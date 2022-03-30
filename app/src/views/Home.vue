<template>
  <div class="home">
    <menu-bar></menu-bar>
    <main-menu></main-menu>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import MenuBar from '@/components/MenuBar.vue';
import MainMenu from '@/components/MainMenu.vue';
import ContentTile from '@/components/ContentTile.vue';

export default defineComponent({
  name: 'Home',
  components: {
    MenuBar,
    ContentTile,
    MainMenu,
  },
  setup() {},
});
</script>

<style lang="css" scoped></style>
