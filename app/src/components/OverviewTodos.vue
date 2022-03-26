<template lang="html">
  <content-tile
    headline="ToDos"
    :hasCreateButton="true"
    createLink="create-todo"
    :hasCard="false"
  >
    <template v-slot:default>
      <div class="todos-container">
        <div v-for="todo in todos" class="list-item">
          <header>
            <small>{{ todo.due_date }}</small>
          </header>
          <span>{{ todo.name }}</span
          ><small class="details">{{ todo.details }}</small>
        </div>
      </div>
    </template>
  </content-tile>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { supabase } from '@/supabase/init';

import ContentTile from '@/components/ContentTile.vue';

export default defineComponent({
  name: 'OverviewTodos',
  components: {
    ContentTile,
  },
  setup() {
    let todos = ref<Todo[]>([]);

    const getTodos = async (): Promise<void> => {
      const { data, error } = await supabase
        .from('todo')
        .select('*')
        .order('due_date', { ascending: true })
        .range(0, 2);

      if (error) {
        console.error(error);
      } else if (data) {
        todos.value = data.map((element) => {
          element.due_date = element.due_date.slice(0, 10);

          return element;
        });
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
}

.list-item {
  background: var(--accent-blue);
  padding: 0.5rem;
  border-radius: 5px;
}

.list-item span {
  margin-right: 5px;
}
</style>
