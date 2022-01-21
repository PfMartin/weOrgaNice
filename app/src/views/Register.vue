<template>
  <!-- Error Handling -->
  <div v-if="errorMsg" class="error-msg">
    <p>{{ errorMsg }}</p>
  </div>

  <!-- Register -->
  <form @submit.prevent="register" class="">
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
import { supabase } from '../supabase/init';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Register',
  setup() {
    const router = useRouter();
    const email = ref<ReactiveString>(undefined);
    const password = ref<ReactiveString>(undefined);
    const confirmPassword = ref<ReactiveString>(undefined);
    const errorMsg = ref<ReactiveString>(undefined);

    const register = async (): Promise<void> => {
      if (password.value === confirmPassword.value) {
        try {
          const { error }: { error: any } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
          });

          if (error) throw error;
          router.push({ name: 'Login' });
        } catch (error) {
          errorMsg.value = `Error: ${error.message}`;
          setTimeout(() => {
            errorMsg.value = undefined;
          }, 3000);
        }
        return;
      }
      errorMsg.value = 'Error: Passwords do not match';
      setTimeout(() => {
        errorMsg.value = undefined;
      }, 3000);
    };

    return { email, password, confirmPassword, errorMsg, register };
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
