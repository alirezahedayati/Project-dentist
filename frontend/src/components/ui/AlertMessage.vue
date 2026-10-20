<script setup>
defineProps({
    type: { type: String, default: 'danger' }, // danger | success | info | warning
    message: { type: String, default: '' },
})
</script>

<template>
  <Transition name="alert-slide">
    <div v-if="message" class="alert-message" :class="`alert-message--${type}`" role="alert">
      <i :class="{
        'fa-solid fa-circle-check': type === 'success',
        'fa-solid fa-triangle-exclamation': type === 'warning',
        'fa-solid fa-circle-info': type === 'info',
        'fa-solid fa-circle-exclamation': type === 'danger',
      }"></i>
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.alert-message {
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: var(--ds-radius);
  padding: 13px 18px;
  font-size: var(--ds-fs-sm);
  font-weight: 600;
  margin-bottom: 18px;
}
.alert-message i { font-size: 16px; }
.alert-message--danger  { background: var(--ds-danger-50);  color: var(--ds-danger-700);  border: 1px solid #f6c9c9; }
.alert-message--success { background: var(--ds-success-50); color: var(--ds-success-700); border: 1px solid #bfe8cf; }
.alert-message--info    { background: var(--ds-info-50);    color: var(--ds-info-700);    border: 1px solid #c4ddfa; }
.alert-message--warning { background: var(--ds-warning-50); color: var(--ds-warning-700); border: 1px solid #f4e2b0; }

.alert-slide-enter-active, .alert-slide-leave-active { transition: all .3s var(--ds-ease); }
.alert-slide-enter-from, .alert-slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
