<script setup lang="ts">defineProps<{site?:Record<string,any>}>()</script>
<template>
  <footer class="bg-[#083b37] text-[#cbded6] pt-16 pb-24 md:pb-7">
    <div class="container-wrap">
      <div class="grid md:grid-cols-3 gap-12 pb-12">
        <div><NuxtLink to="/" class="flex items-center gap-3 text-white mb-6"><span class="bg-white/10 rounded-xl p-2"><Icon name="smile" :size="28" /></span><span class="font-extrabold text-lg">{{site?.doctor_name||'دکتر آزاده مهرداد'}}</span></NuxtLink><p class="text-sm leading-9 max-w-sm text-[#b4cdc4]">{{site?.intro||'برای ساختن لبخندی سالم‌تر و آرامش بیشتر در مسیر درمان، همراهتان هستیم.'}}</p></div>
        <div><h3 class="font-extrabold text-white mb-6">دسترسی سریع</h3><div class="grid grid-cols-2 gap-4 text-[13px]"><NuxtLink to="/" class="hover:text-white">خانه</NuxtLink><NuxtLink to="/#services" class="hover:text-white">خدمات</NuxtLink><NuxtLink to="/about" class="hover:text-white">درباره دکتر</NuxtLink><NuxtLink to="/reservation" class="hover:text-white">دریافت نوبت</NuxtLink><NuxtLink to="/track" class="hover:text-white">پیگیری نوبت</NuxtLink><NuxtLink to="/contact" class="hover:text-white">ارتباط با ما</NuxtLink></div></div>
        <div><h3 class="font-extrabold text-white mb-6">اطلاعات تماس</h3><p class="flex gap-3 text-[13px] mb-5 leading-7"><Icon name="map-pin" class="shrink-0" /> {{site?.address||'آدرس مطب هنوز ثبت نشده است.'}}</p><p class="flex gap-3 text-[13px] mb-5" dir="auto"><Icon name="phone" /> {{site?.phone||'شماره تماس به‌زودی ثبت می‌شود'}}</p><div class="flex gap-3 mt-5"><a v-if="site?.instagram_url" :href="site.instagram_url" target="_blank" rel="noopener noreferrer" aria-label="اینستاگرام" class="w-9 h-9 rounded-xl bg-white/10 grid place-items-center hover:bg-white/20"><Icon name="instagram" :size="18" /></a><a v-if="site?.map_url" :href="site.map_url" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-xl bg-white/10 grid place-items-center hover:bg-white/20" aria-label="مسیریابی"><Icon name="map-pin" :size="18" /></a></div></div>
      </div>
      <div class="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-[11px] text-[#89aaa0]"><span>© {{new Date().getFullYear()}} تمامی حقوق محفوظ است.</span><span>مراقبت آگاهانه • نوبت‌دهی آسان • احترام به حریم خصوصی</span></div>
    </div>
  </footer>
</template>
