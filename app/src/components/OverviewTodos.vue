<template lang="html">
  <content-tile
    v-if="todos"
    headline="ToDos"
    iconName="checkmark"
    :hasCreateButton="true"
    createLink="create-todo"
    :hasCard="false"
  >
    <template v-slot:default>
      <loading-spinner v-if="loading" />
      <div v-else class="todos-container">
        <template v-for="todo in todos">
          <list-element :todo="todo" />
        </template>
      </div>
    </template>
  </content-tile>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { supabase } from '@/supabase/init';
import { cutString } from '@/utils/stringProcessing';

import { STORE_ACTIONS } from '@/store/actions';

import ContentTile from '@/components/ContentTile.vue';
import ListElement from '@/components/ui/ListElement.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

export default defineComponent({
  name: 'OverviewTodos',
  components: {
    ContentTile,
    ListElement,
    LoadingSpinner,
  },
  setup() {
    const store = useStore();

    const getCategories = async (): Promise<CategoryType[]> => {
      const { data, error } = await supabase
        .from('category')
        .select('id,color');

      if (error) {
        store.dispatch(STORE_ACTIONS.SET_SYSTEM_MESSAGE, {
          msg: error.message,
          msgType: 'error',
        });
      } else if (data) {
        return data;
      }

      return [];
    };

    const todos = ref<Todo[]>([]);
    const loading = ref<boolean>(true);

    const getTodos = async (): Promise<void> => {
      const categories = await getCategories();

      if (categories.length !== 0) {
        const { data, error } = await supabase
          .from('todo')
          .select('id,name,due_date,details,category_id')
          .order('due_date', { ascending: true })
          .range(0, 4);

        if (error) {
          store.dispatch(STORE_ACTIONS.SET_SYSTEM_MESSAGE, {
            msg: error.message,
            msgType: 'error',
          });
        } else if (data) {
          todos.value = data.map((element) => {
            element.due_date = element.due_date
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('.');

            element.name = cutString(element.name, 'name');
            element.details = cutString(element.details, 'details');

            element.colorClass = categories.find(
              (category) => category.id === element.category_id
            )?.color;

            return element;
          });

          loading.value = false;
        }
      }
    };

    getTodos();

    return {
      todos,
      loading,
    };
  },
});
</script>

<style lang="css" scoped>
header {
  display: flex;
  justify-content: flex-end;
}

.todos-container {
  display: grid;
  grid-gap: 0.5rem;
  font-size: 0.9rem;
}

.loading {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  color: var(--icon-color);
}

.loading ion-icon {
  animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
