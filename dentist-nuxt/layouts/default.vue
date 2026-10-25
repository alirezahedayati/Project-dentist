<script setup lang="ts">
const {data} = await useAsyncData('public-site',()=>$fetch<{site:Record<string,any>;smsConfigured:boolean}>('/api/public/site'))
</script>
<template>
  <div>
    <SiteHeader :site="data?.site" />
    <main><slot /></main>
    <SiteFooter :site="data?.site" />
    <NuxtLink to="/reservation" class="fixed bottom-4 inset-x-4 z-40 md:hidden btn-main !rounded-2xl !py-4 shadow-soft" aria-label="رزرو نوبت آنلاین">
      <Icon name="calendar-days" :size="19" /> رزرو نوبت آنلاین
    </NuxtLink>
  </div>
</template>
