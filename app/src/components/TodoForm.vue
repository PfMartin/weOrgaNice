<template lang="html">
  <content-tile headline="Create Todo" :bgColor="selectedCategory.color">
    <template v-slot:default>
      <form @submit.prevent>
        <div class="input-element">
          <form-element-label title="Title" :errorMsg="formErrors.title" />
          <input type="text" required class="" id="title" v-model="title" />
        </div>
        <div class="input-element">
          <form-element-label title="Category" />
          <dropdown
            labelId="category"
            :options="categories"
            :selectedOption="selectedCategory"
            @on-select-option="selectCategory"
          />
        </div>
        <div class="input-element">
          <formElementLabel
            title="Description"
            :errorMsg="formErrors.description"
          />
          <textarea required class="" id="description" v-model="description" />
        </div>
        <div class="input-element">
          <form-element-label title="Due Date" />
          <input
            type="date"
            required
            class=""
            id="due-date"
            v-model="dueDate"
            onkeydown="return false"
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
                :options="repeatingNames"
                :selectedOption="selectedRepeating"
                @on-select-option="selectRepeatingUnit"
                :isDisabled="!isRepeating"
              />
            </div>
          </div>
        </div>
        <submit-button text="Create" @submit="submitTodo" />
      </form>
    </template>
  </content-tile>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { supabase } from '@/supabase/init';
import { useRouter } from 'vue-router';

import ContentTile from '@/components/ContentTile.vue';
import ColorInput from '@/components/ColorInput.vue';
import CheckBox from '@/components/CheckBox.vue';
import Dropdown from '@/components/Dropdown.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import FormElementLabel from '@/components/forms/FormElementLabel.vue';
import { validateString } from '@/utils/validation';

import { STORE_ACTIONS } from '@/store/actions';

export default defineComponent({
  name: 'TodoForm',
  components: {
    ContentTile,
    ColorInput,
    CheckBox,
    Dropdown,
    SubmitButton,
    FormElementLabel,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const title = ref<string>('');
    const description = ref<string>('');
    const dueDate = ref<string>('');

    const categories = ref<CategoryType[]>([]);
    const repeatingNames = ref<RepeatingName[]>([]);

    const selectedCategory = ref<CategoryType>({
      id: 0,
      name: 'Select a category',
      color: 'blue',
      default: false,
    });

    const selectedRepeatingName = ref<RepeatingName>({
      id: 0,
      name: 'Select a repeating unit',
      multiple_of_hour: 0,
    });

    const getCategories = async (): Promise<void> => {
      const { data, error } = await supabase.from('category').select('*');

      if (error) {
        console.error(error);
      } else if (data) {
        categories.value = data;
      }
    };

    const getRepeatingNames = async (): Promise<void> => {
      const { data, error } = await supabase.from('repeating_name').select('*');

      if (error) {
        console.error(error);
      } else if (data) {
        repeatingNames.value = data;
      }
    };

    const setInitialValues = async () => {
      await getCategories();
      await getRepeatingNames();
      const defaultCategory = categories.value.find(
        (category: CategoryType) => category.default === true
      );

      if (defaultCategory) {
        selectedCategory.value = defaultCategory;
      }

      if (repeatingNames.value) {
        selectedRepeatingName.value = repeatingNames.value[0];
      }
    };

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

    let formErrors = ref<Record<string, string>>({
      title: '',
      description: '',
    });
    const submitTodo = async (): Promise<void> => {
      const todo: Todo = {
        category_id: selectedCategory.value.id,
        due_date: dueDate.value,
        name: title.value,
        details: description.value,
        user_id: store.getters.user.id,
      };

      if (isRepeating.value) {
        const { name, value } = selectedRepeating.value;

        const selectedName = repeatingNames.value.find(
          (repeatingName) => repeatingName.name === name
        );

        if (selectedName) {
          todo.repeating_name_id = selectedName.id;
          todo.repeating_value = value;
        }
      }

      formErrors.value = validateTodo(todo);
      const hasErrors = formErrors.value.title || formErrors.value.description;

      if (!hasErrors) {
        const { error } = await supabase.from('todo').insert([todo]);
        if (error) {
          store.dispatch(STORE_ACTIONS.SET_SYSTEM_MESSAGE, {
            msg: error.message,
            msgType: 'error',
          });
        } else {
          router.push({ name: 'Home' });
          store.dispatch(STORE_ACTIONS.SET_SYSTEM_MESSAGE, {
            msg: 'Todo has been created',
            msgType: 'success',
          });
        }
      }
    };

    const validateTodo = (todo: Todo) => {
      return {
        title: validateString(todo.name, 'title'),
        description: validateString(todo.details, 'description'),
      };
    };

    /* Reset errors, as soon as the user types in some value */
    const resetStringError = (currentValue: string, watchedValue: string) => {
      if (currentValue !== '') {
        formErrors.value[watchedValue] = '';
      }
    };

    watch(title, (currentValue) => {
      resetStringError(currentValue, 'title');
    });

    watch(description, (currentValue) => {
      resetStringError(currentValue, 'description');
    });

    setInitialValues();

    return {
      title,
      description,
      dueDate,
      selectCategory,
      selectedCategory,
      categories,
      repeatingNames,
      isRepeating,
      checkIsRepeating,
      selectRepeatingUnit,
      selectedRepeating,
      submitTodo,
      formErrors,
    };
  },
});
</script>

<style lang="css" scoped>
form {
  display: grid;
  grid-gap: 1rem;
}

textarea {
  resize: vertical;
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
