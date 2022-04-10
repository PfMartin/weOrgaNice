<template lang="html">
  <content-tile headline="Create Category" iconName="apps">
    <template v-slot:card>
      <form @submit.prevent>
        <div class="input-element">
          <form-element-label title="Title" :errorMsg="formErrors.title" />
          <input type="text" required class="" id="title" v-model="title" />
        </div>
      </form>
    </template>
  </content-tile>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ContentTile from '@/components/ContentTile.vue';
import FormElementLabel from '@/components/forms/FormElementLabel.vue';

export default defineComponent({
  name: 'CategoryForm',
  components: {
    ContentTile,
    FormElementLabel,
  },
  setup() {
    let formErrors = ref<Record<string, string>>({
      title: '',
    });

    return {
      formErrors,
    };
  },
});
</script>

<style lang="css" scoped></style>
