<template>
  <div class="color-input">
    <div
      v-for="color in colors"
      class="color-box"
      :class="{
        [color]: true,
        [`active-${color}`]: color === activeColor,
      }"
      @click="setColor(color)"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name = 'ColorInput',
  emits: ['set-color'],
  setup(props, { emit }) {
    const colors = ['blue', 'teal', 'violet', 'yellow'];
    let activeColor = ref<string>('blue');

    const setColor = (color) => {
      activeColor.value = color;
      emit('set-color', color);
    };

    return {
      colors,
      setColor,
      activeColor,
    };
  },
});
</script>

<style lang="css" scoped>
.color-input {
  display: flex;
}

.color-input > div {
  margin: 5px;
}

.color-box {
  height: 25px;
  width: 25px;
  border: 2px solid #fff;
  border-radius: 5px;
}

.blue {
  background-color: var(--accent-blue);
}

.violet {
  background-color: var(--accent-violet);
}

.teal {
  background-color: var(--accent-teal);
}

.yellow {
  background-color: var(--accent-yellow);
}

.active-blue,
.active-violet,
.active-teal,
.active-yellow {
  border-color: var(--dark-bg);
}
</style>
