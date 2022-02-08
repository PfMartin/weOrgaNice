<template lang="html">
  <content-tile headline="Create Todo" :bgColor="categoryColor">
    <template v-slot:default>
      <form>
        <div class="input-element">
          <label>Color</label>
          <color-input @set-color="setColor" />
        </div>
        <div class="input-element">
          <label for="title">Title</label>
          <input type="text" required class="" id="title" v-model="title" />
        </div>
        <div class="input-element">
          <label for="description">Description</label>
          <textarea required class="" id="description" v-model="description" />
        </div>
        <div class="input-element">
          <label for="due-date">Due Date</label>
          <input
            type="date"
            required
            class=""
            id="due-date"
            v-model="dueDate"
          />
        </div>
        <div class="input-element">
          <div class="dropdown">
            <button
              @blur="closeDropdown"
              tabindex="0"
              type="button"
              @click="toggleDropdown"
              class="dropdown-btn"
              :class="{ 'is-active': isDropdown }"
            >
              Category
            </button>
            <ul class="dropdown-content" :class="{ 'is-block': isDropdown }">
              <li @mousedown="selectCategory">General</li>
              <li>Home</li>
              <li>Family</li>
            </ul>
          </div>
        </div>
      </form>
    </template>
  </content-tile>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ContentTile from '@/components/ContentTile.vue';
import ColorInput from '@/components/ColorInput.vue';

export default defineComponent({
  name: 'TodoForm',
  components: {
    ContentTile,
    ColorInput,
  },
  setup() {
    const title = ref<string>('');
    const description = ref<string>('');
    const dueDate = ref<string>('');
    const categoryColor = ref<string>('blue');
    const isDropdown = ref<boolean>(false);

    const setColor = (color: string) => {
      categoryColor.value = color;
    };

    const toggleDropdown = () => {
      isDropdown.value = !isDropdown.value;
    };

    const closeDropdown = () => {
      isDropdown.value = false;
    };

    const selectCategory = () => {
      console.log('selected');
    };

    return {
      title,
      description,
      dueDate,
      setColor,
      categoryColor,
      toggleDropdown,
      closeDropdown,
      isDropdown,
      selectCategory,
    };
  },
});
</script>

<style lang="css" scoped>
form {
  display: grid;
  grid-gap: 1rem;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
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
  display: none;
  position: absolute;
  background: var(--dark-bg);
  width: 100%;
}

.is-block {
  display: block;
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
