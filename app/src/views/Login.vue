<template>
  <brand-banner></brand-banner>
  <content-tile>
    <template v-slot:default>
      <!-- Error Handling -->
      <div v-if="errorMsg" class="error-msg">
        <p>{{ errorMsg }}</p>
      </div>

      <!-- Login -->
      <form @submit.prevent="login">
        <h1>Login</h1>

        <div class="input-section">
          <div class="input-element">
            <label for="email">Email</label>
            <input type="email" required class="" id="email" v-model="email" />
          </div>
          <div class="input-element">
            <label for="password">Password</label>
            <input
              type="password"
              required
              class=""
              id="password"
              v-model="password"
            />
          </div>
          <div class="btn-bar">
            <button type="submit" class="btn">Login</button>
          </div>
        </div>
        <footer class="">
          <p>
            Don't have an account?
            <router-link :to="{ name: 'Register' }">Register</router-link>
          </p>
        </footer>
      </form>
    </template>
  </content-tile>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { supabase } from '../supabase/init';
import { useRouter } from 'vue-router';

import BrandBanner from '@/components/BrandBanner.vue';
import ContentTile from '@/components/ContentTile.vue';

export default defineComponent({
  name: 'Login',
  components: {
    BrandBanner,
    ContentTile,
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

.input-section {
  background: var(--accent-blue);
  padding: 1rem;
  border-radius: 7px;
}

.input-section .input-element {
  display: grid;
  margin-bottom: 1rem;
}

.input-section .input-element input {
  padding: 0.25rem;
  border-radius: 5px;
  border: 2px solid var(--accent-blue);
  outline: none;
}

.input-section .input-element input:focus {
  border: 2px solid var(--dark-bg);
}

.input-section .btn-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.input-section .btn-bar .btn {
  border: none;
  background: var(--dark-bg);
  border-radius: 5px;
  color: var(--main-font-color);
  padding: 0.5rem 1rem;
}

footer {
  display: flex;
  justify-content: flex-end;
  padding-right: 0.5rem;
}

footer a {
  text-decoration: none;
  color: var(--accent-blue);
}
</style>
