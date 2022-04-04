<template lang="html">
  <div class="list-item" :class="element.colorClass" :id="element.id">
    <div class="main">
      <p>
        <b>{{ element.name }}</b>
      </p>
      <small class="due-date"
        ><ion-icon name="calendar"></ion-icon
        >{{ element.due_date || element.created_at }}</small
      >
    </div>
    <small class="details">
      {{ element.details || 'No details' }}
    </small>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListElement',
  props: {
    element: Object,
  },
});
</script>

<style lang="css" scoped>
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
