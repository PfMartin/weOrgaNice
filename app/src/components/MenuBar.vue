<template lang="html">
  <div class="menu-container">
    <div class="features-left"></div>
    <div class="open-button">
      <fries :isMenuOpen="isMenuOpen" @toggle-menu="toggleMenu" />
    </div>
    <div class="features-right">
      <ion-icon name="notifications-outline" size="large" />
      <ion-icon @click="logout" name="person-outline" size="large" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import Fries from '@/components/ui/Fries.vue';
import { supabase } from '../supabase/init';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { STORE_ACTIONS } from '@/store/actions';

export default defineComponent({
  name: 'MenuBar',
  components: {
    Fries,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const logout = async (): Promise<void> => {
      await supabase.auth.signOut();
      router.push({ name: 'Login' });
    };

    const isMenuOpen: ComputedRef<boolean> = computed((): boolean => {
      return store.getters.isMenuOpen;
    });

    const toggleMenu = (): void => {
      store.dispatch(STORE_ACTIONS.TOGGLE_MENU);
    };

    return {
      isMenuOpen,
      toggleMenu,
      logout,
    };
  },
});
</script>

<style lang="css" scoped>
.menu-container {
  position: fixed;
  bottom: 0;
  left: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.1rem;
  background: var(--dark-bg);
  border-radius: 10px 10px 0 0;
  width: calc(100% - 1.2rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
}

.open-button {
  position: fixed;
  width: 30px;
  left: 50%;
  margin-left: -15px;
  margin-bottom: 5px;
}

.features-right,
.features-left {
  display: flex;
  align-items: center;
}

ion-icon {
  color: var(--icon-color);
}

.usr-img {
  width: 40px;
  height: 40px;
  border: 2px solid var(--icon-color);
  border-radius: 100%;
}

.menu {
  top: 40px;
  position: fixed;
  background: var(--bg-dark-color);
}
</style>
