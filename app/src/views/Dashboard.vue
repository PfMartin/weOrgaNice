<template>
  <div class="dashboard">
    <ContentTile
      headline="ToDos"
      :hasCard="false"
      :hasCreateButton="true"
      createLink="create-todo"
    >
    </ContentTile>
    <ContentTile
      headline="Shopping"
      :hasCard="false"
      :hasCreateButton="true"
      createLink="create-shopping"
    ></ContentTile>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ContentTile from '@/components/ContentTile.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    ContentTile,
  },
});
</script>
