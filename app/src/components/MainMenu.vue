<template lang="html">
  <div class="menu-container">
    <transition name="slide" mode="out-in">
      <ul v-if="isMenuOpen" class="menu">
        <li>
          <a href="#"><ion-icon name="apps" /> Categories</a>
        </li>

        <li>
          <a href="#"><ion-icon name="checkmark" />Todos</a>
        </li>

        <li>
          <a href="#"><ion-icon name="cart" />Shopping</a>
        </li>
      </ul>
    </transition>
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
  left: 20px;
  padding: 1.5rem 1rem;
  width: 81%;
  background: var(--dark-bg);
  border-radius: 10px;
  z-index: 1;
}

ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
}

li:not(:last-child) {
  margin-bottom: 1rem;
}

a {
  display: flex;
  align-items: center;
  color: var(--icon-color);
  text-decoration: none;
  font-size: 1.2rem;
}

ion-icon {
  margin-right: 5px;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-active {
  transition: all 0.2s ease-out;
}

.slide-leave-active {
  transition: all 0.2s ease-in;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
