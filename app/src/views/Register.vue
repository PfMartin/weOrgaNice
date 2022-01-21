<template>
  <!-- Error Handling -->
  <div v-if="errorMsg" class="error-msg">
    <p>{{ errorMsg }}</p>
  </div>

  <!-- Register -->
  <form class="">
    <h1>Register</h1>
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
    <div class="">
      <label for="confirm-password">Confirm Password</label>
      <input
        type="password"
        required
        class=""
        id="confirm-password"
        v-model="confirmPassword"
      />
    </div>
    <button type="submit" class="btn">Register</button>
    <p>
      Already have an account?
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </p>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Register',
  setup() {
    const email = ref<ReactiveString>(null);
    const password = ref<ReactiveString>(null);
    const confirmPassword = ref<ReactiveString>(null);
    const errorMsg = ref<ReactiveString>(null);

    return { email, password, confirmPassword, errorMsg };
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
