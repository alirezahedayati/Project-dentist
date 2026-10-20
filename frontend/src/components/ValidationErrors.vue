<script setup>
defineProps({
    field: {
        type: String,
        required: true,
    },
    errors: {
        type: Object,
        default: () => ({}),
        required: false,
    },
})
</script>

<template>
  <ul v-if="errors && errors[field]" class="validation-errors" role="alert">
    <li v-for="(error, i) in errors[field]" :key="i">
      <i class="fa-solid fa-circle-exclamation"></i>
      <span>{{ error }}</span>
    </li>
  </ul>
</template>

<style scoped>
.validation-errors {
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
}
.validation-errors li {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--ds-danger-600);
  font-size: var(--ds-fs-xs);
  font-weight: 600;
  line-height: 1.9;
}
</style>
