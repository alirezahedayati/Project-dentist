<script setup lang="ts">
defineProps<{site?:Record<string,any>}>()
const menu=ref(false)
const items=[{title:'صفحه اصلی',href:'/'},{title:'خدمات',href:'/#services'},{title:'درباره دکتر',href:'/about'},{title:'پیگیری نوبت',href:'/track'},{title:'تماس با ما',href:'/contact'}]
</script>
<template>
  <header class="relative z-40">
    <div class="bg-jade-800 text-emerald-50/90 text-[11px]">
      <div class="container-wrap min-h-[34px] flex items-center justify-between gap-4">
        <span class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-[#d2b878] rounded-full"></span> مراقبت از لبخند شما، اولویت ماست</span>
        <div class="hidden sm:flex items-center gap-5"><span v-if="site?.phone" class="flex gap-2 items-center" dir="ltr">{{site.phone}} <Icon name="phone" :size="12" /></span><span v-else>شماره تماس: پس از تکمیل اطلاعات مطب</span></div>
      </div>
    </div>
    <div class="sticky top-0 bg-white/95 backdrop-blur-lg border-b border-[#edf1ed]">
      <div class="container-wrap flex h-[76px] items-center justify-between gap-5">
        <NuxtLink to="/" class="flex items-center gap-3 shrink-0" @click="menu=false">
          <span class="h-[43px] w-[43px] rounded-[15px] bg-jade-700 text-white grid place-items-center"><Icon name="smile" :size="27" /></span>
          <span class="leading-tight"><strong class="block text-[16px] font-extrabold text-jade-800">{{site?.doctor_name||'دکتر آزاده مهرداد'}}</strong><small class="text-[10px] text-[#9a9d8b] tracking-wide">DENTAL CARE & AESTHETICS</small></span>
        </NuxtLink>
        <nav class="hidden lg:flex gap-8 items-center" aria-label="منوی اصلی"><NuxtLink v-for="item in items" :key="item.href" :to="item.href" class="nav-link">{{item.title}}</NuxtLink></nav>
        <div class="flex items-center gap-2"><NuxtLink to="/reservation" class="btn-main hidden md:inline-flex !py-[11px]"><Icon name="calendar-days" :size="17" /> رزرو نوبت</NuxtLink><button class="lg:hidden grid place-items-center w-10 h-10 rounded-lg bg-jade-50 text-jade-800" :aria-label="menu?'بستن منو':'بازکردن منو'" @click="menu=!menu"><Icon :name="menu?'x':'menu'" /></button></div>
      </div>
      <nav v-if="menu" class="lg:hidden absolute inset-x-0 top-full bg-white border-b border-[#dce6df] shadow-soft p-5 flex flex-col gap-1">
        <NuxtLink v-for="item in items" :key="item.href" :to="item.href" class="text-sm py-3 px-4 rounded-xl hover:bg-jade-50" @click="menu=false">{{item.title}}</NuxtLink>
        <NuxtLink to="/reservation" class="btn-main mt-2" @click="menu=false">رزرو نوبت آنلاین</NuxtLink>
      </nav>
    </div>
  </header>
</template>
