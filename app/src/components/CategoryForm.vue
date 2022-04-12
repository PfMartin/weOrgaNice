<template lang="html">
  <content-tile headline="Create Category" iconName="apps" :bgColor="color">
    <template v-slot:card>
      <form @submit.prevent>
        <div class="input-element">
          <form-element-label title="Title" :errorMsg="formErrors.title" />
          <input type="text" required class="" id="title" v-model="title" />
        </div>
        <div class="input-element">
          <form-element-label
            title="Description"
            :errorMsg="formErrors.description"
          />
          <textarea required class="" id="description" v-model="description" />
        </div>
        <div class="input-element">
          <form-element-label
            title="Color"
            :errorMsg="formErrors.description"
          />
          <color-input @set-color="setColor" />
        </div>
        <div class="is-default">
          <check-box
            id="isDefault"
            label="Should be the default category"
            @on-check="checkIsDefault"
          />
        </div>
        <submit-button text="Create Category" @submit="submitCategory" />
      </form>
    </template>
  </content-tile>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { supabase } from '@/supabase/init';
import { useRouter } from 'vue-router';

import ContentTile from '@/components/ContentTile.vue';
import FormElementLabel from '@/components/forms/FormElementLabel.vue';
import SubmitButton from '@/components/ui/SubmitButton.vue';
import CheckBox from '@/components/forms/CheckBox.vue';
import ColorInput from '@/components/ColorInput.vue';

import { validateString } from '@/utils/validation';
import { STORE_ACTIONS } from '@/store/actions';

export default defineComponent({
  name: 'CategoryForm',
  components: {
    ContentTile,
    FormElementLabel,
    SubmitButton,
    CheckBox,
    ColorInput,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const title = ref<string>('');
    const description = ref<string>('');
    const color = ref<string>('blue');
    const isDefault = ref<boolean>(false);

    const setColor = (boxColor: string) => {
      color.value = boxColor;
    };

    const formErrors = ref<Record<string, string>>({
      name: '',
      description: '',
      color: '',
    });

    const checkIsDefault = (): void => {
      isDefault.value = !isDefault.value;
    };

    const submitCategory = async (): Promise<void> => {
      const category: Category = {
        name: title.value,
        details: description.value,
        color: color.value,
        isDefault: isDefault.value,
        user_id: store.getters.user.id,
      };

      formErrors.value = validateCategory(category);

      const hasErrors = formErrors.value.name || formErrors.value.description;

      if (!hasErrors) {
        const { error } = await supabase.from('category').insert([category]);

        if (error) {
          store.dispatch(STORE_ACTIONS.SET_SYSTEM_MESSAGE, {
            msg: error.message,
            msgType: 'error',
          });
        } else {
          router.push({ name: 'CategoriesOverview' });
          store.dispatch(STORE_ACTIONS.SET_SYSTEM_MESSAGE, {
            msg: 'Category has been created',
            msgType: 'success',
          });
        }
      }
    };

    const validateCategory = (category: Category) => {
      return {
        name: validateString(category.name, 'title'),
        description: validateString(category.details, 'description'),
        color: category.color === '' ? 'Please select a color' : '',
      };
    };

    return {
      description,
      formErrors,
      submitCategory,
      checkIsDefault,
      setColor,
      color,
      title,
    };
  },
});
</script>

<style lang="css" scoped>
form {
  display: grid;
  grid-gap: 1rem;
}
</style>
