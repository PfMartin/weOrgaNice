<template lang="html">
  <content-tile
    headline="ToDos"
    :hasCreateButton="true"
    createLink="create-todo"
    :hasCard="false"
  >
    <template v-slot:default>
      <div class="todos-container">
        <div
          v-for="todo in todos"
          class="list-item"
          :class="todo.colorClass"
          id="todo.id"
        >
          <div class="main">
            <p>
              <b>{{ todo.name }}</b>
            </p>
            <small class="due-date"
              ><ion-icon name="calendar"></ion-icon>{{ todo.due_date }}</small
            >
          </div>
          <small class="details">
            {{ todo.details }}
          </small>
        </div>
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

export default defineComponent({
  name: 'OverviewTodos',
  components: {
    ContentTile,
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

.list-item {
  /* background: var(--accent-blue); */
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
}

.list-item .main {
  display: flex;
  justify-content: space-between;
}

.list-item .details {
  font-style: italic;
}

.list-item span {
  margin-right: 5px;
}

.due-date {
  font-style: italic;
  display: flex;
  align-items: center;
}

.due-date ion-icon {
  margin-right: 0.2rem;
}
</style>
