<template lang="html">
  <div class="container">
    <header>
      <h2>{{ headline }}</h2>
      <router-link v-if="hasCreateButton" :to="createLink">
        <ion-icon name="add" size="small" />
      </router-link>
    </header>

    <div v-if="hasCard" :class="[cardClass, backgroundClass]">
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
    hasCard: {
      type: Boolean,
      required: false,
      default: true,
    },
    hasCreateButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    createLink: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    const backgroundClass: ComputedRef<string> = computed((): string => {
      switch (props.bgColor) {
        case 'teal':
          return 'bg-teal';
        case 'violet':
          return 'bg-violet';
        case 'yellow':
          return 'bg-yellow';
        case 'grey':
          return 'bg-grey';
        default:
          return 'bg-blue';
      }
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
  margin: 0.5rem 0;
}

header {
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--icon-color);
}

header a {
  color: var(--icon-color);
}

.card {
  padding: 1rem;
  border-radius: 7px;
}

.bg-blue {
  background: var(--accent-blue);
}

.bg-teal {
  background: var(--accent-teal);
}

.bg-violet {
  background: var(--accent-violet);
}

.bg-yellow {
  background: var(--accent-yellow);
}

.bg-grey {
  background: var(--icon-color);
}

footer {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  font-size: 0.8rem;
}
</style>
