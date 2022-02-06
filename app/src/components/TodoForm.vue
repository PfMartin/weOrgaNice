<template lang="html">
  <content-tile headline="Create Todo" :bgColor="categoryColor">
    <template v-slot:default>
      <div class="input-element">
        <label for="title">Title</label>
        <input type="text" required class="" id="title" v-model="title" />
      </div>
      <div class="input-element">
        <label for="description">Description</label>
        <textarea required class="" id="description" v-model="description" />
      </div>
      <div class="input-element">
        <label for="due-date">Due Date</label>
        <input type="date" required class="" id="due-date" v-model="dueDate" />
      </div>
      <div class="input-element">
        <label>Color</label>
        <color-input @set-color="setColor" />
      </div>
    </template>
  </content-tile>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ContentTile from '@/components/ContentTile.vue';
import ColorInput from '@/components/ColorInput.vue';

export default defineComponent({
  name: 'TodoForm',
  components: {
    ContentTile,
    ColorInput,
  },
  setup() {
    const title = ref<string>('');
    const description = ref<string>('');
    const dueDate = ref<string>('');
    const categoryColor = ref<string>('blue');

    const setColor = (color: string) => {
      categoryColor.value = color;
    };

    return {
      title,
      description,
      dueDate,
      setColor,
      categoryColor,
    };
  },
});
</script>

<style lang="css" scoped>
.form-field {
  display: flex;
  flex-direction: column;
}
</style>
