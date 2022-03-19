<template lang="html">
  <div class="label">
    <label :for="forId">{{ title }}</label>
    <span v-if="errorMsg" class="error-message">{{ errorMsg }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormElementLabel',
  props: {
    title: {
      type: String,
    },
    forId: {
      type: String,
    },
    errorMsg: {
      type: String,
    },
  },
  setup() {},
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
  color: #530000;
  font-size: small;
}
</style>
