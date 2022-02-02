<template>
  <div class="login">
    <form @submit.prevent="login">
      <content-tile headline="Login">
        <template v-slot:default>
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
            <div class="error-msg">
              <transition name="fade">
                <p v-if="errorMsg">{{ errorMsg }}</p>
              </transition>
            </div>
            <button type="submit" class="btn">Login</button>
          </div>
        </template>

        <template v-slot:footer>
          <p>
            Don't have an account?
            <router-link :to="{ name: 'Register' }">Register</router-link>
          </p>
        </template>
      </content-tile>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { supabase } from '../supabase/init';
import { useRouter } from 'vue-router';

import ContentTile from '@/components/ContentTile.vue';

export default defineComponent({
  name: 'Login',
  components: {
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
        }, 5000);
      }
    };

    return { email, password, errorMsg, login };
  },
});
</script>

<style lang="css" scoped>
a {
  text-decoration: none;
  color: var(--accent-blue);
}
</style>
