<template lang="html">
  <div class="checkbox-container" @click="onCheck">
    <div
      :id="id"
      class="checkbox"
      :class="{ 'checked-box': isChecked, 'unchecked-box': !isChecked }"
    ></div>
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
  border: 2px solid #fff;
  border-radius: 5px;
}

.checked-box {
  background: var(--icon-color);
}

.unchecked-box {
  background: #fff;
  border: 2px solid var(--dark-bg);
}
</style>
