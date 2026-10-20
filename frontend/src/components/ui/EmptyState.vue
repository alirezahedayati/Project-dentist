<script setup>
defineProps({
    icon: { type: String, default: 'fa-regular fa-folder-open' },
    title: { type: String, default: 'موردی یافت نشد' },
    description: { type: String, default: '' },
})
</script>

<template>
  <div class="empty-state">
    <div class="empty-state__icon"><i :class="icon"></i></div>
    <h6 class="empty-state__title">{{ title }}</h6>
    <p v-if="description" class="empty-state__desc">{{ description }}</p>
    <slot />
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 56px 24px;
  text-align: center;
}
.empty-state__icon {
  width: 74px;
  height: 74px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--ds-primary-50);
  color: var(--ds-primary-500);
  font-size: 30px;
  margin-bottom: 8px;
}
.empty-state__title { font-weight: 800; color: var(--ds-gray-700); font-size: var(--ds-fs-md); margin: 0; }
.empty-state__desc { color: var(--ds-text-muted); font-size: var(--ds-fs-sm); max-width: 380px; margin: 0; }
</style>
