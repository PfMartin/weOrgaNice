<template lang="html">
  <div class="brand-banner">
    <ion-icon name="journal" size="large" class="journal-icon"></ion-icon>
    <h1>We<span>Orga</span>Nice</h1>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'BrandBanner',
});
</script>

<style lang="css" scoped>
.brand-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.brand-banner .journal-icon {
  color: var(--accent-blue);
  margin-right: 1rem;
}

.brand-banner span {
  color: var(--accent-blue);
}
</style>
