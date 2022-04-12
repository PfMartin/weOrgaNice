<template lang="html">
  <div class="create-todo">
    <todo-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoForm from '@/components/TodoForm.vue';
export default defineComponent({
  name: 'CreatTodo',
  components: {
    TodoForm,
  },
});
</script>

<style lang="css" scoped>
.create-todo {
  margin: 0.5rem 0;
}
</style>
