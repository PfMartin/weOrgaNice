<template>
  <brand-banner></brand-banner>
  <content-tile>
    <template v-slot:default>
      <!-- Login -->
      <form @submit.prevent="login">
        <h1>Login</h1>

        <!-- Error Handling -->
        <div v-if="errorMsg" class="error-msg">
          <p>{{ errorMsg }}</p>
        </div>

        <input-section>
          <template v-slot:default>
            <div class="input-element">
              <label for="email">Email</label>
              <input
                type="email"
                required
                class=""
                id="email"
                v-model="email"
              />
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
          </template>
        </input-section>
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
import InputSection from '@/components/InputSection.vue';

export default defineComponent({
  name: 'Login',
  components: {
    BrandBanner,
    ContentTile,
    InputSection,
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

.input-element {
  display: grid;
}

.input-section .btn-bar {
  margin-top: 1rem;
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

input {
  border: 2px solid var(--accent-blue);
}

input:focus {
  border-color: var(--bg-dark);
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
