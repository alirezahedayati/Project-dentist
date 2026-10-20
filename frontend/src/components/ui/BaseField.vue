<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
    label: { type: String, default: '' },
    error: { type: String, default: '' },
    hint: { type: String, default: '' },
    required: { type: Boolean, default: false },
})

const id = useId()
const slotId = computed(() => `field-${id}`)
</script>

<template>
  <div class="ds-field">
    <label v-if="label" :for="slotId" class="ds-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>
    <slot :id="slotId" :aria-invalid="!!error" />
    <p v-if="hint && !error" class="form-text text-muted mt-1 mb-0">{{ hint }}</p>
    <p v-if="error" class="base-field__error mt-1 mb-0" role="alert">
      <i class="fa-solid fa-circle-exclamation"></i> {{ error }}
    </p>
  </div>
</template>

<style scoped>
.base-field__error {
  color: var(--ds-danger-600);
  font-size: var(--ds-fs-xs);
  font-weight: 600;
}
</style>
