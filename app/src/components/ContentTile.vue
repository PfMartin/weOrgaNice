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

header {
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
