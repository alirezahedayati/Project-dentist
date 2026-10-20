<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="hero">
    <div class="hero__bg" aria-hidden="true"></div>
    <div class="hero__shapes" aria-hidden="true">
      <span class="hero__blob hero__blob--1"></span>
      <span class="hero__blob hero__blob--2"></span>
    </div>

    <div class="ds-container hero__inner">
      <div class="hero__content">
        <span class="hero__eyebrow">
          <i class="fa-solid fa-star-of-life"></i>
          کلینیک دندانپزشکی Dr. Mehrad — مشهد
        </span>

        <h1 class="hero__title">
          لبخندی که به آن
          <span class="hero__title-accent">افتخار می‌کنید</span>
        </h1>

        <p class="hero__desc">
          درمان‌های تخصصی و زیبایی دندان با جدیدترین تجهیزات و رویکردی کاملاً بدون درد؛
          از طراحی لبخند تا جراحی و پروتز، در کنار شما هستیم تا سلامت دهان و دندان‌هایتان را
          با اطمینان تجربه کنید.
        </p>

        <div class="hero__actions">
          <RouterLink to="/reservation" class="ds-btn ds-btn--primary ds-btn--lg">
            <i class="fa-regular fa-calendar-check"></i>
            رزرو نوبت آنلاین
          </RouterLink>
          <a href="#services" class="ds-btn ds-btn--outline ds-btn--lg">
            <i class="fa-solid fa-teeth"></i>
            مشاهده خدمات
          </a>
        </div>

        <ul class="hero__stats">
          <li v-for="stat in [
            { value: '+۱۲', label: 'سال تجربه بالینی' },
            { value: '+۴۵۰۰', label: 'بیمار راضی' },
            { value: '۹۸٪', label: 'رضایت از درمان' },
          ]" :key="stat.label">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </li>
        </ul>
      </div>

      <div class="hero__visual">
        <div class="hero__image-frame">
          <img src="../../assets/img/about-us.jpg" alt="دکتر آزاده مهرداد، دندانپزشک زیبایی" loading="eager" />
          <div class="hero__float hero__float--top">
            <i class="fa-solid fa-shield-heart"></i>
            <div>
              <strong>فلوشیپ زیبایی</strong>
              <span>دانشگاه جنوا ایتالیا</span>
            </div>
          </div>
          <div class="hero__float hero__float--bottom">
            <i class="fa-regular fa-clock"></i>
            <div>
              <strong>نوبت‌دهی سریع</strong>
              <span>کمتر از ۶۰ ثانیه</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  background: #0d3331;
  color: #eafaf8;
}

.hero__bg {
  position: absolute;
  inset: 0;
  background: url('../../assets/img/slide/pexels-cottonbro-studio-6528907.jpg') center/cover no-repeat;
  opacity: .28;
  transform: scale(1.04);
}

.hero__shapes { position: absolute; inset: 0; pointer-events: none; }
.hero__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
}
.hero__blob--1 { width: 420px; height: 420px; background: rgba(31, 160, 156, .45); top: -140px; inset-inline-start: -120px; }
.hero__blob--2 { width: 360px; height: 360px; background: rgba(14, 165, 233, .28); bottom: -160px; inset-inline-end: -100px; }

.hero__inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.08fr .92fr;
  align-items: center;
  gap: clamp(32px, 5vw, 72px);
  padding-block: clamp(64px, 9vw, 120px);
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--ds-fs-sm);
  font-weight: 700;
  color: #8fdcd6;
  background: rgba(143, 220, 214, .12);
  border: 1px solid rgba(143, 220, 214, .3);
  padding: 7px 16px;
  border-radius: var(--ds-radius-full);
  margin-bottom: 22px;
}
.hero__eyebrow i { font-size: 11px; }

.hero__title {
  color: #fff;
  font-size: clamp(2rem, 1.4rem + 3vw, 3.4rem);
  font-weight: 900;
  line-height: 1.45;
  margin-bottom: 18px;
}
.hero__title-accent {
  background: linear-gradient(120deg, #7fe0d8, #6ecbff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__desc {
  color: #b9ded9;
  font-size: var(--ds-fs-md);
  max-width: 54ch;
  margin-bottom: 30px;
}

.hero__actions { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 42px; }
.hero__actions .ds-btn--outline {
  border-color: rgba(143, 220, 214, .5);
  color: #cdeeeb;
}
.hero__actions .ds-btn--outline:hover {
  background: rgba(143, 220, 214, .16);
  border-color: #8fdcd6;
  color: #fff;
}

.hero__stats {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(20px, 4vw, 44px);
}
.hero__stats li { display: flex; flex-direction: column; }
.hero__stats strong {
  font-size: clamp(1.5rem, 1.2rem + 1vw, 2rem);
  font-weight: 900;
  color: #fff;
  line-height: 1.3;
}
.hero__stats span { font-size: var(--ds-fs-sm); color: #9ccac5; font-weight: 600; }

.hero__visual { display: flex; justify-content: center; }
.hero__image-frame { position: relative; max-width: 460px; width: 100%; }
.hero__image-frame > img {
  width: 100%;
  aspect-ratio: 4 / 4.6;
  object-fit: cover;
  border-radius: 32px 120px 32px 120px;
  border: 5px solid rgba(255, 255, 255, .14);
  box-shadow: 0 30px 70px -24px rgba(0, 0, 0, .6);
}

.hero__float {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, .96);
  color: var(--ds-gray-800);
  border-radius: 16px;
  padding: 13px 17px;
  box-shadow: var(--ds-shadow-lg);
  animation: float-y 5.5s ease-in-out infinite;
}
.hero__float i {
  font-size: 20px;
  color: var(--ds-primary-600);
}
.hero__float strong { display: block; font-size: var(--ds-fs-sm); font-weight: 800; line-height: 1.5; }
.hero__float span { display: block; font-size: var(--ds-fs-xs); color: var(--ds-text-muted); }
.hero__float--top { top: 8%; inset-inline-start: -34px; }
.hero__float--bottom {
  bottom: 9%;
  inset-inline-end: -30px;
  animation-delay: 1.6s;
}

@keyframes float-y {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

@media (max-width: 991.98px) {
  .hero__inner { grid-template-columns: 1fr; text-align: center; }
  .hero__desc { margin-inline: auto; }
  .hero__actions, .hero__stats { justify-content: center; }
  .hero__visual { order: -1; }
  .hero__image-frame { max-width: 380px; }
}

@media (max-width: 575.98px) {
  .hero__float { padding: 10px 13px; }
  .hero__float--top { inset-inline-start: -12px; }
  .hero__float--bottom { inset-inline-end: -10px; }
  .hero__image-frame > img { border-radius: 24px 70px 24px 70px; }
}
</style>
