<script setup>
defineProps({
    label: { type: String, default: 'در حال بارگذاری…' },
})
</script>

<template>
  <div class="page-spinner" role="status" aria-live="polite">
    <span class="adm-spinner" aria-hidden="true"></span>
    <span>{{ label }}</span>
  </div>
</template>

<style scoped>
.page-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 48px 20px;
  color: var(--ds-text-muted);
  font-size: var(--ds-fs-sm);
  font-weight: 600;
}
</style>
