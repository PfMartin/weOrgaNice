<template>
  <!-- Error Handling -->
  <div v-if="errorMsg" class="error-msg">
    <p>{{ errorMsg }}</p>
  </div>

  <!-- Login -->
  <form class="">
    <h1>Login</h1>
    <div class="">
      <label for="email">Email</label>
      <input type="email" required class="" id="email" v-model="email" />
    </div>
    <div class="">
      <label for="password">Password</label>
      <input
        type="password"
        required
        class=""
        id="password"
        v-model="password"
      />
    </div>
    <button type="submit" class="btn">Login</button>
    <p>
      Don't have an account?
      <router-link :to="{ name: 'Register' }">Register</router-link>
    </p>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Login',
  setup() {
    const email = ref<ReactiveString>(undefined);
    const password = ref<ReactiveString>(undefined);
    const errorMsg = ref<ReactiveString>(undefined);

    return { email, password, errorMsg };
  },
});
</script>

<style lang="css" scoped>
.error-msg {
  display: flex;
  color: red;
  width: 100%;
  border: 1px solid red;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
</style>
