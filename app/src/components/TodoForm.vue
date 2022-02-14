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
              @blur="closeCategoryDropdown"
              tabindex="0"
              type="button"
              @click="toggleCategoryDropdown"
              class="dropdown-btn"
              :class="{ 'is-active': isCategoryDropdown }"
            >
              <div class="category-value">
                <div class="color-box" :class="selectedCategory.color"></div>
                <p>{{ selectedCategory.name }}</p>
              </div>
              <ion-icon name="caret-down-outline"></ion-icon>
            </button>
            <ul
              class="dropdown-content"
              :class="{ 'is-block': isCategoryDropdown }"
            >
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
        <div class="input-element">
          <div class="checkbox" @click="checkIsRepeating">
            <div
              id="repeating"
              class="color-box empty-box"
              :class="{ 'checked-box': isRepeating }"
            ></div>
            <label for="repeating">Repeating Task</label>
          </div>
        </div>
        <div v-if="isRepeating" class="input-element">
          <div class="inline-element">
            <label for="repeating-days">Every</label>
            <div class="input-part">
              <input type="number" v-model="selectedRepeating.value" />
              <div class="dropdown">
                <button
                  @blur="closeRepeatingDropdown"
                  tabindex="0"
                  type="button"
                  @click="toggleRepeatingDropdown"
                  class="dropdown-btn"
                  :class="{ 'is-active': isRepeatingDropdown }"
                >
                  <div class="category-value">
                    <p>{{ selectedRepeating.name }}</p>
                  </div>
                  <ion-icon name="caret-down-outline"></ion-icon>
                </button>
                <ul
                  class="dropdown-content"
                  :class="{ 'is-block': isRepeatingDropdown }"
                >
                  <template v-for="unit in REPEATING_UNITS">
                    <li
                      v-if="selectedRepeating.name !== unit"
                      @mousedown="selectRepeatingUnit(unit)"
                    >
                      <div class="category-value">
                        <p>{{ unit }}</p>
                      </div>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>
  </content-tile>
</template>

<script lang="ts">
import { defineComponent, ref, computed, ComputedRef } from 'vue';
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
    const REPEATING_UNITS = ['hours', 'days', 'months', 'years'];

    const store = useStore();

    const title = ref<string>('');
    const description = ref<string>('');
    const dueDate = ref<string>('');
    const isCategoryDropdown = ref<boolean>(false);
    const selectedCategory = ref<CategoryType>({
      name: 'General',
      color: 'blue',
    });

    const categories: ComputedRef<CategoryType[]> = computed(
      (): CategoryType[] => {
        return store.getters.categories;
      }
    );

    const toggleCategoryDropdown = (): void => {
      isCategoryDropdown.value = !isCategoryDropdown.value;
    };
    const closeCategoryDropdown = (): void => {
      isCategoryDropdown.value = false;
    };
    const selectCategory = (category: CategoryType): void => {
      selectedCategory.value = category;
    };

    const isRepeating = ref<boolean>(false);
    const checkIsRepeating = (): void => {
      isRepeating.value = !isRepeating.value;
    };
    const isRepeatingDropdown = ref<boolean>(false);
    const selectedRepeating = ref<RepeatingType>({
      name: 'days',
      value: 7,
    });
    const toggleRepeatingDropdown = (): void => {
      isRepeatingDropdown.value = !isRepeatingDropdown.value;
    };
    const closeRepeatingDropdown = (): void => {
      isRepeatingDropdown.value = false;
    };
    const selectRepeatingUnit = (unit: string): void => {
      selectedRepeating.value.name = unit;
    };

    return {
      title,
      description,
      dueDate,
      toggleCategoryDropdown,
      closeCategoryDropdown,
      isCategoryDropdown,
      selectCategory,
      selectedCategory,
      categories,
      checkIsRepeating,
      REPEATING_UNITS,
      isRepeating,
      toggleRepeatingDropdown,
      closeRepeatingDropdown,
      isRepeatingDropdown,
      selectRepeatingUnit,
      selectedRepeating,
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

.checkbox {
  display: flex;
}

.empty-box {
  background: #fff;
  border: 2px solid var(--dark-bg);
}

.checked-box {
  background: var(--icon-color);
}

.inline-element {
  display: flex;
  justify-content: space-between;
}

.input-part {
  display: flex;
  align-items: center;
}

.inline-element input {
  text-align: center;
  margin-right: 10px;
  width: 20px;
}

.inline-element .dropdown {
  width: 100px;
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
