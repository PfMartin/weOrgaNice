<template lang="html">
  <div class="fries-container" @click="toggleIsMenuOpen">
    <div :class="friesClasses"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';

export default defineComponent({
  name: 'Fries',
  props: ['toggle-menu', 'isMenuOpen'],
  emit: ['toggleIsMenuOpen'],
  setup(props, { emit }) {
    const friesClasses = computed(() => {
      return {
        fries: true,
        'is-menu-open': props.isMenuOpen,
      };
    });

    const toggleIsMenuOpen = (): void => {
      emit('toggle-menu');
    };

    return {
      friesClasses,
      toggleIsMenuOpen,
    };
  },
});
</script>

<style lang="css" scoped>
.fries-container {
  /* display: none; */
  height: 100%;
  width: 30px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fries,
.fries::before,
.fries::after {
  display: block;
  background-color: #fff;
  position: absolute;
  height: 4px;
  /* transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1); */
  transition: transform 200ms ease-out;
  border-radius: 2px;
}

.fries {
  width: 20px;
}

.fries::before {
  width: 30px;
  content: '';
  margin-top: -8px;
}

.fries::after {
  width: 30px;
  content: '';
  margin-top: 8px;
}

.fries.is-menu-open::before {
  transform: rotate(-45deg) translate(-8px, 3px);
}

.fries.is-menu-open::after {
  transform: rotate(45deg) translate(-8px, -3px);
}

.fries.is-menu-open {
  width: 0;
}
</style>
