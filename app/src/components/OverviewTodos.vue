<template lang="html">
  <content-tile
    headline="ToDos"
    iconName="checkmark"
    :hasCreateButton="true"
    createLink="create-todo"
    :hasCard="false"
  >
    <template v-slot:default>
      <div class="todos-container">
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

export default defineComponent({
  name: 'OverviewTodos',
  components: {
    ContentTile,
    ListElement,
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
        }
      }
    };

    getTodos();

    return {
      todos,
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
</style>
