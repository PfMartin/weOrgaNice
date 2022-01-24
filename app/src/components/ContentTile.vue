<template lang="html">
  <div class="container">
    <h1>{{ headline }}</h1>

    <div :class="[cardClass, backgroundClass]">
      <slot name="default"></slot>
    </div>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
export default defineComponent({
  name: 'ContentTile',
  props: {
    headline: {
      type: String,
      required: true,
    },
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
      } else if (props.bgColor === 'grey') {
        return 'bg-grey';
      }
      return 'bg-blue';
    });

    const cardClass: string = 'card';

    return {
      cardClass,
      backgroundClass,
    };
  },
});
</script>

<style lang="css" scoped>
.container {
  background: var(--dark-bg);
  padding: 0 1rem;
  border-radius: 7px;
}

.card {
  padding: 1rem;
  border-radius: 7px;
}

.bg-blue {
  background: var(--accent-blue);
}

.bg-violet {
  background: var(--accent-violet);
}

.bg-grey {
  background: var(--icon-color);
}

footer {
  display: flex;
  justify-content: flex-end;
  padding-right: 0.5rem;
}
</style>
