<template lang="html">
  <div class="menu-container">
    <div class="menu-icon">
      <Fries :isMenuOpen="isMenuOpen" @toggle-menu="toggleMenu" />
    </div>
    <div class="features-container">
      <ion-icon
        name="notifications-outline"
        size="large"
        class="notifications-icon"
      ></ion-icon>
      <img @click="logout" class="usr-img" alt="user" src="@/assets/user.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Fries from '@/components/Fries.vue';
import { supabase } from '../supabase/init';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MenuBar',
  components: {
    Fries,
  },
  setup() {
    const router = useRouter();

    const logout = async (): Promise<void> => {
      console.log('logout');
      await supabase.auth.signOut();
      router.push({ name: 'Login' });
    };

    const isMenuOpen = ref<boolean>(false);

    const toggleMenu = (): void => {
      isMenuOpen.value = !isMenuOpen.value;
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

.notifications-icon {
  color: var(--icon-color);
  margin-right: 10px;
}

.usr-img {
  width: 40px;
  height: 40px;
  border: 2px solid var(--icon-color);
  border-radius: 100%;
}
</style>
