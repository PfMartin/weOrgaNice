<template lang="html">
  <div class="checkbox-container" @click="onCheck">
    <div :id="id" class="checkbox">
      <div class="inner-box" :class="{ 'checked-box': isChecked }"></div>
    </div>
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CheckBox',
  props: {
    id: String,
    label: String,
  },
  setup(props, { emit }) {
    const { id, label } = props;
    // const { id, label } = toRefs(props);

    const isChecked = ref<boolean>(false);

    const onCheck = () => {
      isChecked.value = !isChecked.value;
      emit('on-check', isChecked.value);
    };

    return {
      onCheck,
      isChecked,
      id,
      label,
    };
  },
});
</script>

<style lang="css" scoped>
.checkbox-container {
  display: flex;
}

.checkbox {
  width: 15px;
  height: 15px;
  margin-right: 5px;
  border-radius: 5px;
  background: #fff;
  border: 2px solid var(--dark-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner-box {
  border-radius: 2px;
  width: 11px;
  height: 11px;
}

.checked-box {
  background: var(--icon-color);
}
</style>
