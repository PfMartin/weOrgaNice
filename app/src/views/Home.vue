<template>
  <div class="home">
    <menu-bar></menu-bar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuBar from '@/components/MenuBar.vue';

import ContentTile from '@/components/ContentTile.vue';

export default defineComponent({
  name: 'Home',
  components: {
    MenuBar,
    ContentTile,
  },
});
</script>
