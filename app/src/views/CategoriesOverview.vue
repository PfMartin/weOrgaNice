<template lang="html">
  <div class="categories-overview">
    <content-tile
      headline="Categories"
      iconName="apps"
      :hasCreateButton="true"
      createLink="create-category"
      :hasCard="false"
    >
      <template v-slot:default>
        <loading-spinner v-if="loading" />
        <div v-else class="categories-container">
          <template v-for="category in categories">
            <list-element :element="category" />
          </template>
        </div>
      </template>
    </content-tile>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { STORE_ACTIONS } from '@/store/actions';
import { supabase } from '@/supabase/init';

import ContentTile from '@/components/ContentTile.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import ListElement from '@/components/ui/ListElement.vue';

import { prettifyDate, cutString } from '@/utils/stringProcessing';

export default defineComponent({
  name: 'CategoriesOverview',
  components: {
    ContentTile,
    LoadingSpinner,
    ListElement,
  },
  setup() {
    const store = useStore();

    const loading = ref<boolean>(true);
    const categories = ref<Category[]>([]);

    const getCategories = async (): Promise<void> => {
      const { data, error } = await supabase.from('category').select('*');

      if (error) {
        store.dispatch(STORE_ACTIONS.SET_SYSTEM_MESSAGE, {
          msg: error.message,
          msgType: 'error',
        });
      } else if (data) {
        categories.value = data
          .map((category) => {
            category.name = cutString(category.name, 'name');
            if (category.details) {
              category.details = cutString(category.details, 'details');
            }
            category.colorClass = category.color;
            category.created_at = prettifyDate(category.created_at);

            return category;
          })
          .sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            return -1;
          });

        loading.value = false;
      }
    };

    getCategories();

    return {
      categories,
      loading,
    };
  },
});
</script>

<style lang="css" scoped>
.categories-overview {
  margin: 0.5rem 0;
}

.categories-container {
  display: grid;
  grid-gap: 0.5rem;
  font-size: 0.9rem;
}
</style>
