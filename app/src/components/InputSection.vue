<template lang="html">
  <div :class="[sectionClass, backgroundClass]">
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
export default defineComponent({
  name: 'InputSection',
  props: {
    bgColor: {
      type: String,
      required: false,
      default: 'blue',
    },
  },
  setup(props) {
    const backgroundClass: ComputedRef<string> = computed((): string => {
      if (props.bgColor === 'violet') {
        return 'bg-violet';
      } else {
        return 'bg-blue';
      }
    });

    const sectionClass: string = 'input-section';

    return {
      sectionClass,
      backgroundClass,
    };
  },
});
</script>

<style lang="css" scoped>
.input-section {
  padding: 1rem;
  border-radius: 7px;
}

.bg-blue {
  background: var(--accent-blue);
}

.bg-violet {
  background: var(--accent-violet);
}
</style>
