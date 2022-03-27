<template lang="html">
  <div class="brand-banner">
    <ion-icon
      name="journal"
      size="large"
      class="journal-icon"
      :class="color"
    ></ion-icon>
    <h2>We<span :class="color">Orga</span>Nice</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
export default defineComponent({
  name: 'BrandBanner',
  props: {
    color: {
      type: String,
      required: false,
      default: 'blue',
    },
  },
  setup(props) {
    const color: ComputedRef<string> = computed((): string => {
      return `${props.color}-font`;
    });

    return {
      color,
    };
  },
});
</script>

<style lang="css" scoped>
.brand-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.brand-banner .journal-icon {
  margin-right: 1rem;
}

.blue-font {
  color: var(--accent-blue);
}

.violet-font {
  color: var(--accent-violet);
}
</style>
