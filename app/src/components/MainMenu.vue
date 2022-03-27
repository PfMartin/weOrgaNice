<template lang="html">
  <div class="menu-container">
    <div v-if="isMenuOpen" class="menu">This is the menu</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ComputedRef, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Menu',
  setup() {
    const store = useStore();

    const isMenuOpen: ComputedRef<boolean> = computed((): boolean => {
      return store.getters.isMenuOpen;
    });

    return {
      isMenuOpen,
    };
  },
});
</script>

<style lang="css" scoped>
.menu-container {
  position: relative;
}

.menu {
  position: fixed;
  padding: 1rem;
  height: 100%;
  background: var(--icon-color);
  border-radius: 10px;
  opacity: 0.98;
}
</style>
