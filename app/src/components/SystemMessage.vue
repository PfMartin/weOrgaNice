<template lang="html">
  <div class="container">
    <h2>{{ headline }}</h2>
    <p>{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import ContentTile from '@/components/ContentTile.vue';

export default defineComponent({
  name: 'SystemMessage',
  components: {
    ContentTile,
  },
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const [headline, msg]: string[] = props.msg.split(':');

    return {
      headline,
      msg,
    };
  },
});
</script>

<style lang="css" scoped>
.container {
  margin: 1rem;
  padding: 0 1rem;
  border: 1px solid var(--icon-color);
  border-radius: 7px;
  color: var(--icon-color);
}
</style>
