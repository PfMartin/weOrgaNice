<template>
  <brand-banner></brand-banner>
  <form @submit.prevent="register" class="">
    <content-tile headline="Register" bgColor="violet">
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
        <div class="input-element">
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            required
            class=""
            id="confirm-password"
            v-model="confirmPassword"
          />
        </div>
        <div class="btn-bar">
          <div class="error-message">
            <transition name="fade">
              <p v-if="errorMsg">{{ errorMsg }}</p>
            </transition>
          </div>
          <button type="submit" class="btn">Register</button>
        </div>
      </template>
      <template v-slot:footer>
        <p>
          Already have an account?
          <router-link :to="{ name: 'Login' }"> Login</router-link>
        </p>
      </template>
    </content-tile>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { supabase } from '../supabase/init';
import { useRouter } from 'vue-router';

import BrandBanner from '@/components/BrandBanner.vue';
import ContentTile from '@/components/ContentTile.vue';

export default defineComponent({
  name: 'Register',
  components: {
    BrandBanner,
    ContentTile,
  },
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
          }, 5000);
        }
        return;
      }
      errorMsg.value = 'Error: Passwords do not match';
      setTimeout(() => {
        errorMsg.value = undefined;
      }, 5000);
    };

    return { email, password, confirmPassword, errorMsg, register };
  },
});
</script>

<style lang="css" scoped>
.input-element {
  display: grid;
}

.btn-bar {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-bar .btn {
  border: none;
  background: var(--dark-bg);
  border-radius: 5px;
  color: var(--main-font-color);
  padding: 0.5rem 1rem;
}

input {
  border: 2px solid var(--accent-violet);
}

input:focus {
  border-color: var(--bg-dark);
}

a {
  text-decoration: none;
  color: var(--accent-violet);
}
</style>
