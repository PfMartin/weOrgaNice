<template lang="html">
  <div class="menu-container">
    <div class="menu-icon">
      <Fries :isMenuOpen="isMenuOpen" @toggle-menu="toggleMenu" />
    </div>
    <div class="features-container">
      <ion-icon name="cube-outline"></ion-icon>
      <div>Picture</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Fries from '@/components/Fries.vue';

export default defineComponent({
  name: 'MenuBar',
  components: {
    Fries,
  },
  setup() {
    const isMenuOpen = ref<boolean>(false);

    const toggleMenu = (): void => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    return {
      isMenuOpen,
      toggleMenu,
    };
  },
});
</script>

<style lang="css" scoped>
.menu-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.features-container {
  display: flex;
}
</style>
