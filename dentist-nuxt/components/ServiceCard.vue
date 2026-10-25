<script setup lang="ts">
defineProps<{service:Record<string,any>;index?:number}>()
</script>
<template>
  <NuxtLink :to="`/reservation?service=${service.id}`" class="service-card glass-card p-7 block group h-full">
    <div class="flex items-start justify-between gap-4 mb-7"><div class="h-14 w-14 bg-[#e9f5ef] text-[#176b5e] rounded-[18px] grid place-items-center group-hover:bg-jade-700 group-hover:text-white transition-colors"><Icon :name="service.icon" :size="27" :stroke-width="1.6" /></div><span class="text-[#b7c9be] text-[11px] font-medium" dir="ltr">{{String(index||1).padStart(2,'0')}}</span></div>
    <h3 class="font-extrabold text-[16px] text-jade-800 mb-3">{{service.name}}</h3>
    <p class="text-[12px] text-[#779087] leading-[2.3] mb-6 min-h-[55px]">{{service.description}}</p>
    <div class="border-t border-[#eef2ee] pt-5 flex justify-between items-center"><span class="flex items-center gap-2 text-[11px] text-[#82968e]"><Icon name="clock" :size="14" /> {{faNumber(service.duration_minutes)}} دقیقه</span><span class="text-[#0d6a5b] text-[12px] font-bold flex items-center gap-1">رزرو نوبت <Icon name="arrow-left" :size="15" /></span></div>
  </NuxtLink>
</template>
