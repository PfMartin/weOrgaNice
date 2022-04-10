<template lang="html">
  <content-tile headline="Create Category" iconName="apps">
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
        </div>
        <div class="is-default">
          <check-box
            id="isDefault"
            label="This should be the default category"
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
import ContentTile from '@/components/ContentTile.vue';
import FormElementLabel from '@/components/forms/FormElementLabel.vue';
import SubmitButton from '@/components/ui/SubmitButton.vue';
import CheckBox from '@/components/forms/CheckBox.vue';
import { validateString } from '@/utils/validation';

export default defineComponent({
  name: 'CategoryForm',
  components: {
    ContentTile,
    FormElementLabel,
    SubmitButton,
    CheckBox,
  },
  setup() {
    const title = ref<string>('');
    const description = ref<string>('');
    const color = ref<string>('');
    const isDefault = ref<boolean>(false);

    const formErrors = ref<Record<string, string>>({
      name: '',
      description: '',
      color: '',
    });

    const checkIsDefault = (): void => {
      isDefault.value = !isDefault.value;
    };

    const submitCategory = () => {
      const category: CategoryType = {
        name: title.value,
        details: description.value,
        color: color.value,
        isDefault: isDefault.value,
      };

      formErrors.value = validateCategory(category);
      console.log(category);
    };

    const validateCategory = (category: CategoryType) => {
      return {
        name: validateString(category.name, 'title'),
        description: validateString(category.details, 'description'),
        color: category.color === '' ? 'Please select a color' : '',
      };
    };

    return {
      name,
      description,
      formErrors,
      submitCategory,
      checkIsDefault,
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
