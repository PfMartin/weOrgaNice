<template>
  <brand-banner></brand-banner>
  <!-- Error Handling -->
  <div v-if="errorMsg" class="error-msg">
    <p>{{ errorMsg }}</p>
  </div>

  <!-- Login -->
  <form @submit.prevent="login" class="">
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
import { supabase } from '../supabase/init';
import { useRouter } from 'vue-router';

import BrandBanner from '@/components/BrandBanner.vue';

export default defineComponent({
  name: 'Login',
  components: {
    BrandBanner,
  },
  setup() {
    const router = useRouter();

    const email = ref<ReactiveString>(undefined);
    const password = ref<ReactiveString>(undefined);
    const errorMsg = ref<ReactiveString>(undefined);

    const login = async (): Promise<void> => {
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });

        if (error) throw error;
        router.push({ name: 'Dashboard' });
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = undefined;
        }, 3000);
      }
    };

    return { email, password, errorMsg, login };
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
