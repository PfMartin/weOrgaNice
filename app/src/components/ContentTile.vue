<template lang="html">
  <div class="container">
    <header>
      <h2><ion-icon v-if="iconName" :name="iconName" />{{ headline }}</h2>
      <router-link v-if="hasCreateButton" :to="createLink">
        <ion-icon name="add" size="small" />
      </router-link>
    </header>

    <div v-if="hasCard" :class="[cardClass, bgColor]">
      <slot name="card"></slot>
    </div>
    <div v-else>
      <slot name="default"></slot>
    </div>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
    iconName: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const cardClass: string = 'card';

    return {
      cardClass,
    };
  },
});
</script>

<style lang="css" scoped>
.container {
  background: var(--dark-bg);
  padding: 0.5rem;
  border-radius: 12px;
}

h2 {
  display: flex;
  align-items: center;
}

ion-icon {
  margin-right: 5px;
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
  padding: 0.5rem;
  border-radius: 7px;
}

footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  font-size: 0.8rem;
}
</style>
