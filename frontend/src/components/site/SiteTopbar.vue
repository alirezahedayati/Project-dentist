<script setup>
const phones = ['0915-710-1242', '051-3844-1114']
</script>

<template>
  <div class="site-topbar">
    <div class="ds-container site-topbar__inner">
      <div class="site-topbar__item">
        <i class="fa-regular fa-clock"></i>
        <span>شنبه تا چهارشنبه، ۸:۰۰ تا ۱۹:۰۰</span>
      </div>
      <div class="site-topbar__links">
        <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="اینستاگرام"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://wa.me/989157101242" target="_blank" rel="noopener" aria-label="واتساپ"><i class="fa-brands fa-whatsapp"></i></a>
        <a href="tel:+985138441114" class="site-topbar__phone">
          <i class="fa-solid fa-phone-volume"></i>
          <span v-for="(p, i) in phones" :key="p" class="ds-ltr-data">{{ p }}<template v-if="i < phones.length - 1"> | </template></span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.site-topbar {
  background: linear-gradient(90deg, var(--ds-primary-800), var(--ds-primary-600));
  color: #d9f2ef;
  font-size: var(--ds-fs-sm);
  font-weight: 600;
}
.site-topbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 44px;
}
.site-topbar__item { display: inline-flex; align-items: center; gap: 8px; }
.site-topbar__item i { color: #8fdcd6; }
.site-topbar__links { display: inline-flex; align-items: center; gap: 6px; }
.site-topbar__links a {
  width: 30px; height: 30px;
  display: grid; place-items: center;
  border-radius: 9px;
  color: #d9f2ef;
  transition: all .2s var(--ds-ease);
}
.site-topbar__links a:hover { background: rgba(255,255,255,.14); color: #fff; }
.site-topbar__phone {
  width: auto !important;
  padding: 0 12px;
  gap: 8px;
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, .12);
  border-radius: var(--ds-radius-full);
  color: #fff;
  margin-inline-start: 6px;
}
.site-topbar__phone:hover { background: rgba(255, 255, 255, .22); }
@media (max-width: 575.98px) {
  .site-topbar__item span { display: none; }
  .site-topbar__inner { justify-content: center; }
}
</style>
