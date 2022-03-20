<template lang="html">
  <div class="label">
    <label :for="forId">{{ title }}</label>
    <span v-if="errorMsg" class="error-message">{{ errorMsg }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ComputedRef, computed } from 'vue';

export default defineComponent({
  name: 'FormElementLabel',
  props: {
    title: {
      type: String,
    },
    errorMsg: {
      type: String,
    },
  },
  setup(props) {
    const forId: ComputedRef<string> = computed(() => {
      if (props.title) {
        return props.title.replace(' ', '-').toLowerCase();
      }

      return '';
    });

    return {
      forId,
    };
  },
});
</script>

<style lang="css" scoped>
.label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error-message {
  padding-right: 5px;
  color: var(--error);
  font-size: small;
}
</style>
