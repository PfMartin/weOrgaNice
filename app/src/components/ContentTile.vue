<template lang="html">
  <div class="container"><slot name="default"></slot></div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ContentTile',
});
</script>

<style lang="css" scoped>
.container {
  margin: 1rem;
  background: var(--dark-bg);
  padding: 0 1rem;
  border-radius: 7px;
}
</style>
