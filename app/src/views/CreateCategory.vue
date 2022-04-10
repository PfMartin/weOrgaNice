<template lang="html">
  <div class="create-category">
    <category-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryForm from '@/components/CategoryForm.vue';

export default defineComponent({
  name: 'CreateCategory',
  components: {
    CategoryForm,
  },
});
</script>

<style lang="css" scoped>
.create-category {
  margin: 0.5rem 0;
}
</style>
