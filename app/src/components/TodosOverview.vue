<template lang="html">
  <content-tile
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
          <list-element :element="todo" />
        </template>
      </div>
    </template>
  </content-tile>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { supabase } from '@/supabase/init';
import { STORE_ACTIONS } from '@/store/actions';

import ContentTile from '@/components/ContentTile.vue';
import ListElement from '@/components/ui/ListElement.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

import { cutString, prettifyDate } from '@/utils/stringProcessing';

export default defineComponent({
  name: 'TodosOverview',
  components: {
    ContentTile,
    ListElement,
    LoadingSpinner,
  },
  setup() {
    const store = useStore();

    const getCategories = async (): Promise<SupabaseCategory[]> => {
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
          todos.value = data.map((todo) => {
            todo.due_date = prettifyDate(todo.due_date);

            todo.name = cutString(todo.name, 'name');
            todo.details = cutString(todo.details, 'details');

            todo.colorClass = categories.find(
              (category) => category.id === todo.category_id
            )?.color;

            return todo;
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

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
