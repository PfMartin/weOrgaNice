<template lang="html">
  <content-tile headline="Create Todo" :bgColor="selectedCategory.color">
    <template v-slot:default>
      <form @submit.prevent>
        <div class="input-element">
          <label for="title">Title</label>
          <input type="text" required class="" id="title" v-model="title" />
        </div>
        <div class="input-element">
          <dropdown
            label="Category"
            :options="categories"
            :selectedOption="selectedCategory"
            @on-select-option="selectCategory"
          />
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
          <check-box
            id="repeating"
            label="Repeating Task"
            @on-check="checkIsRepeating"
          />
        </div>
        <div class="input-element">
          <div class="inline-element">
            <label for="repeating-days" :class="{ 'text-muted': !isRepeating }"
              >Every</label
            >
            <div class="input-part">
              <input
                type="number"
                v-model="selectedRepeating.value"
                :disabled="!isRepeating"
              />

              <dropdown
                :options="REPEATING_UNITS"
                :selectedOption="selectedRepeating"
                @on-select-option="selectRepeatingUnit"
                :isDisabled="!isRepeating"
              />
            </div>
          </div>
        </div>
        <submit-button text="Submit" @submit="submitTodo" />
      </form>
    </template>
  </content-tile>
</template>

<script lang="ts">
import { defineComponent, ref, computed, ComputedRef } from 'vue';
import { useStore } from 'vuex';

import { REPEATING_UNITS } from '@/utils/constants';

import ContentTile from '@/components/ContentTile.vue';
import ColorInput from '@/components/ColorInput.vue';
import CheckBox from '@/components/CheckBox.vue';
import Dropdown from '@/components/Dropdown.vue';
import SubmitButton from '@/components/SubmitButton.vue';

export default defineComponent({
  name: 'TodoForm',
  components: {
    ContentTile,
    ColorInput,
    CheckBox,
    Dropdown,
    SubmitButton,
  },
  setup() {
    const store = useStore();

    const title = ref<string>('');
    const description = ref<string>('');
    const dueDate = ref<string>('');

    const categories: ComputedRef<CategoryType[]> = computed(
      (): CategoryType[] => {
        console.log(store.getters.categories);
        return store.getters.categories;
      }
    );

    const selectedCategory = ref<CategoryType>();

    const getInitialValues = () => {
      const defaultCategory = categories.value.find(
        (category) => category.default === true
      );

      if (defaultCategory) {
        selectedCategory.value = defaultCategory;
      } else {
        selectedCategory.value = {
          id: 1,
          name: 'Not found',
          color: 'blue',
          default: false,
        };
      }
    };

    getInitialValues();

    const selectCategory = (category: CategoryType): void => {
      selectedCategory.value = category;
    };

    const isRepeating = ref<boolean>(false);
    const checkIsRepeating = (): void => {
      isRepeating.value = !isRepeating.value;
    };
    const selectedRepeating = ref<RepeatingType>({
      name: 'days',
      value: 7,
    });
    const selectRepeatingUnit = (unit: Record<string, string>): void => {
      selectedRepeating.value.name = unit.name;
    };

    const submitTodo = (): void => {
      console.log(title.value);
      selectedCategory.value && console.log(selectedCategory.value.name);
      console.log(dueDate.value);

      console.log(selectedRepeating.value);

      // const todo = {
      //   title: title.value,
      //   category: selectedCategory.value.name,
      // };
    };

    return {
      title,
      description,
      dueDate,
      selectCategory,
      selectedCategory,
      categories,
      isRepeating,
      checkIsRepeating,
      selectRepeatingUnit,
      selectedRepeating,
      REPEATING_UNITS,
      submitTodo,
    };
  },
});
</script>

<style lang="css" scoped>
form {
  display: grid;
  grid-gap: 1rem;
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

.text-muted {
  color: var(--text-muted);
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
</style>
