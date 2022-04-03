<template lang="html">
  <content-tile
    headline="categories"
    iconName="apps"
    :hasCreateButton="true"
    createLink="create-category"
    :hasCard="false"
  >
  </content-tile>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContentTile from '@/components/ContentTile.vue';

export default defineComponent({
  name: 'CategoriesOverview',
  components: {
    ContentTile,
  },
});
</script>

<style lang="css" scoped></style>
