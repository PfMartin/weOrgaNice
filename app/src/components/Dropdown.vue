<template lang="html">
  <div class="dropdown">
    <button
      @blur="closeDropdown"
      tabindex="0"
      type="button"
      @click="toggleDropdown"
      class="dropdown-btn"
      :class="{ 'is-active': hasDropdown }"
      :disabled="isDisabled"
      :id="labelId"
    >
      <div class="option-value">
        <div
          v-if="selectedOption.color"
          class="color-box"
          :class="selectedOption.color"
        ></div>
        <p>{{ selectedOption.name }}</p>
      </div>
      <ion-icon name="caret-down-outline"></ion-icon>
    </button>
    <ul class="dropdown-content" :class="{ 'is-block': hasDropdown }">
      <template v-for="option in options">
        <li
          v-if="selectedOption.name !== option.name"
          @mousedown="selectOption(option)"
        >
          <div class="option-value">
            <div
              v-if="option.color"
              class="color-box"
              :class="option.color"
            ></div>
            <p>{{ option.name }}</p>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Dropdown',
  emits: ['on-select-option'],
  props: {
    labelId: String,
    options: Object,
    selectedOption: Object,
    isDisabled: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup(props, { emit }) {
    const hasDropdown = ref(false);

    const toggleDropdown = (): void => {
      hasDropdown.value = !hasDropdown.value;
    };

    const closeDropdown = (): void => {
      hasDropdown.value = false;
    };

    const selectOption = (option: any): void => {
      emit('on-select-option', option);
    };

    return {
      hasDropdown,
      toggleDropdown,
      closeDropdown,
      selectOption,
    };
  },
});
</script>

<style lang="css" scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  background: #fff;
  border: 2px solid #fff;
  border-radius: 5px;
  width: 100%;
}

.dropdown-btn.is-active {
  border: 2px solid var(--dark-bg);
}

.dropdown-content {
  color: #fff;
  display: none;
  position: absolute;
  background: var(--dark-bg);
  width: 100%;
}

.is-block {
  display: block;
}

.option-value {
  display: flex;
  align-items: center;
}

.color-box {
  width: 15px;
  height: 15px;
  margin-right: 5px;
  border: 2px solid #fff;
  border-radius: 5px;
}

button .color-box {
  border-color: var(--dark-bg);
}

ul {
  list-style: none;
  border-radius: 5px;
}

li {
  padding: 0.5rem;
  border-radius: 5px;
}

li:hover {
  background: var(--icon-color);
}
</style>
