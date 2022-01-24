<template>
  <div class="dashboard">
    <menu-bar></menu-bar>
    <ContentTile headline="ToDos" :hasCard="false"> </ContentTile>
    <ContentTile headline="Shopping" :hasCard="false"></ContentTile>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuBar from '@/components/MenuBar.vue';
import { useStore } from 'vuex';

import ContentTile from '@/components/ContentTile.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    MenuBar,
    ContentTile,
  },
  setup() {
    const store = useStore();
  },
});
</script>
