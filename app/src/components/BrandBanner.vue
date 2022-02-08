<template lang="html">
  <div class="brand-banner">
    <ion-icon
      name="journal"
      size="large"
      class="journal-icon"
      :class="color"
    ></ion-icon>
    <h2>We<span :class="color">Orga</span>Nice</h2>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'BrandBanner',
  props: {
    color: {
      type: String,
      required: false,
      default: 'blue',
    },
  },
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
  margin-right: 1rem;
}

.blue {
  color: var(--accent-blue);
}

.violet {
  color: var(--accent-violet);
}
</style>
