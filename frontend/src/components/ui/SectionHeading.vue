<script setup>
const props = defineProps({
    title: { type: String, default: '' },
    eyebrow: { type: String, default: '' },
    description: { type: String, default: '' },
    align: { type: String, default: 'center' }, // center | start
})
</script>

<template>
  <div class="ds-section-head" :class="{ 'ds-section-head--start': align === 'start' }">
    <span v-if="eyebrow" class="ds-eyebrow"><i class="fa-solid fa-star-of-life"></i>{{ eyebrow }}</span>
    <h2 class="ds-section-title">{{ title }}</h2>
    <p v-if="description" class="ds-section-desc">{{ description }}</p>
    <slot />
  </div>
</template>

<style scoped>
.ds-section-head--start {
  margin-inline: 0;
  text-align: start;
}
</style>
