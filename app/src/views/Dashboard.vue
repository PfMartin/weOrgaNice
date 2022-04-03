<template>
  <div class="dashboard">
    <todos-overview />
    <content-tile
      headline="Shopping"
      iconName="cart"
      :hasCard="false"
      :hasCreateButton="true"
      createLink="create-shopping"
    ></content-tile>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TodosOverview from '@/components/TodosOverview.vue';
import ContentTile from '@/components/ContentTile.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    ContentTile,
    TodosOverview,
  },
});
</script>

<style lang="css" scoped>
.dashboard > * {
  margin: 0.5rem 0;
}
</style>
