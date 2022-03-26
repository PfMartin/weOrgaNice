<template>
  <div class="dashboard">
    <overview-todos />
    <content-tile
      headline="Shopping"
      :hasCard="false"
      :hasCreateButton="true"
      createLink="create-shopping"
    ></content-tile>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import OverviewTodos from '@/components/OverviewTodos.vue';
import ContentTile from '@/components/ContentTile.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    ContentTile,
    OverviewTodos,
  },
});
</script>
