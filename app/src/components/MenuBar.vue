<template lang="html">
  <div class="menu-container">
    <div class="menu-icon">
      <Fries :isMenuOpen="isMenuOpen" @toggle-menu="toggleMenu" />
    </div>
    <div class="features-container">
      <ion-icon name="notifications-outline" size="large" class="icon" />
      <ion-icon
        @click="logout"
        name="person-outline"
        size="large"
        class="icon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import Fries from '@/components/Fries.vue';
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.features-container {
  display: flex;
  align-items: center;
}

.icon {
  color: var(--icon-color);
  margin-right: 10px;
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
