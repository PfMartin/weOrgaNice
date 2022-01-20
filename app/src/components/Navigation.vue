<template>
  <header id="nav">
    <div id="nav">
      <router-link to="/login">Login</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Navigation',
});
</script>

<style scoped></style>
