<script setup>
const props = defineProps({
    page: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    info: { type: String, default: '' },
})
const emit = defineEmits(['update:page'])

const go = (p) => {
    if (p >= 1 && p <= props.totalPages) emit('update:page', p)
}
</script>

<template>
  <nav class="adm-pagination" aria-label="صفحه‌بندی">
    <span class="adm-pagination__info">{{ info }}</span>
    <div class="adm-pagination__pages" v-if="totalPages > 1">
      <button class="adm-page-btn" :disabled="page === 1" @click="go(page - 1)" aria-label="صفحه قبلی">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
      <button
        v-for="p in totalPages"
        :key="p"
        class="adm-page-btn"
        :class="{ 'is-active': p === page }"
        :aria-current="p === page ? 'page' : undefined"
        @click="go(p)"
      >{{ p }}</button>
      <button class="adm-page-btn" :disabled="page === totalPages" @click="go(page + 1)" aria-label="صفحه بعدی">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
    </div>
  </nav>
</template>
