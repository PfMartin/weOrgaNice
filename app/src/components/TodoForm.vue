<template lang="html">
  <content-tile headline="Create Todo" :bgColor="selectedCategory.color">
    <template v-slot:default>
      <form>
        <!-- <div class="input-element">
          <label>Color</label>
          <color-input @set-color="setColor" />
        </div> -->
        <div class="input-element">
          <label for="title">Title</label>
          <input type="text" required class="" id="title" v-model="title" />
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
              <div class="category-value">
                <div class="color-box" :class="selectedCategory.color"></div>
                <p>{{ selectedCategory.name }}</p>
              </div>
              <ion-icon name="caret-down-outline"></ion-icon>
            </button>
            <ul class="dropdown-content" :class="{ 'is-block': isDropdown }">
              <template v-for="category in categories">
                <li
                  v-if="selectedCategory.name !== category.name"
                  @mousedown="selectCategory(category)"
                >
                  <div class="category-value">
                    <div class="color-box" :class="category.color"></div>
                    <p>{{ category.name }}</p>
                  </div>
                </li>
              </template>
            </ul>
          </div>
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
      </form>
    </template>
  </content-tile>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import ContentTile from '@/components/ContentTile.vue';
import ColorInput from '@/components/ColorInput.vue';

export default defineComponent({
  name: 'TodoForm',
  components: {
    ContentTile,
    ColorInput,
  },
  setup() {
    const store = useStore();

    const title = ref<string>('');
    const description = ref<string>('');
    const dueDate = ref<string>('');
    const isDropdown = ref<boolean>(false);
    const selectedCategory = ref<CategoryType>({
      name: 'General',
      color: 'blue',
    });

    const categories = ref<CategoryType[]>([]);

    categories.value = store.getters.categories;

    const toggleDropdown = () => {
      isDropdown.value = !isDropdown.value;
    };

    const closeDropdown = () => {
      isDropdown.value = false;
    };

    const selectCategory = (category: CategoryType) => {
      selectedCategory.value = category;
    };

    return {
      title,
      description,
      dueDate,
      toggleDropdown,
      closeDropdown,
      isDropdown,
      selectCategory,
      selectedCategory,
      categories,
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
  display: none;
  position: absolute;
  background: var(--dark-bg);
  width: 100%;
}

.is-block {
  display: block;
}

.category-value {
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
