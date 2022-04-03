<template lang="html">
  <div class="menu-container">
    <transition name="fade">
      <div v-if="isMenuOpen" class="background-cover"></div>
    </transition>
    <transition name="slide" mode="out-in">
      <ul v-if="isMenuOpen" class="menu">
        <router-link to="categories-overview">
          <li><ion-icon name="apps" /> Categories</li>
        </router-link>

        <router-link to="todo-overview">
          <li><ion-icon name="checkmark" />Todos</li>
        </router-link>

        <router-link to="shopping-overview">
          <li><ion-icon name="cart" />Shopping</li>
        </router-link>
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
  display: flex;
  justify-content: center;
  z-index: 1;
}

.background-cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--main-bg-color);
  opacity: 0.6;
}

.menu {
  position: fixed;
  bottom: 40px;
  width: 50%;
  padding: 1.5rem 1rem;
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

a:not(:last-child) {
  margin-bottom: 1rem;
}

a {
  align-items: center;
  font-size: 1.2rem;
  display: flex;
  color: var(--icon-color);
  text-decoration: none;
}

ion-icon {
  margin-right: 5px;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100vh);
}

.slide-enter-active {
  transition: all 0.2s ease-out;
}

.slide-leave-active {
  transition: all 0.2s ease-in;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(40px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
