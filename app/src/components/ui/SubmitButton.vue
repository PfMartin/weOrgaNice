<template lang="html">
  <button @click="onSubmit">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SubmitButton',
  emits: ['submit'],
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const onSubmit = (): void => {
      emit('submit');
    };

    return {
      onSubmit,
    };
  },
});
</script>

<style lang="css" scoped>
button {
  padding: 0.5rem;
  background: var(--dark-bg);
  border-radius: 5px;
  color: var(--main-font-color);
}
</style>
