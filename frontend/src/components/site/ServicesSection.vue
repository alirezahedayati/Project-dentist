<script setup>
import { RouterLink } from 'vue-router'
import SectionHeading from '../ui/SectionHeading.vue'

const services = [
    {
        icon: 'fa-solid fa-teeth',
        title: 'طراحی لبخند',
        desc: 'لمینت، کامپوزیت و بلیچینگ با پلن دیجیتال و پیش‌نمایش نتیجه قبل از درمان.',
    },
    {
        icon: 'fa-solid fa-gears',
        title: 'ارتودنسی',
        desc: 'بریس‌های شفاف و متحرک اینویزالاین برای مرتب‌سازی دندان‌ها بدون دغدغه ظاهری.',
    },
    {
        icon: 'fa-solid fa-tooth',
        title: 'ایمپلنت و جراحی',
        desc: 'کاشت دندان با ایمپلنت‌های نسل جدید و جراحی‌های تخصصی فک با کمترین تهاجم.',
    },
    {
        icon: 'fa-solid fa-child-reaching',
        title: 'دندانپزشکی کودکان',
        desc: 'محیطی دوستانه و بدون استرس برای کوچک‌ترین members خانواده با مراقبت ویژه.',
    },
    {
        icon: 'fa-solid fa-user-doctor',
        title: 'عصب‌کشی (اندو)',
        desc: 'درمان ریشه با میکروسکوپ و تجهیزات روتاری، سریع، دقیق و کاملاً بدون درد.',
    },
    {
        icon: 'fa-solid fa-crown',
        title: '_prost_ و روکش',
        desc: 'زیرکونیا و ایمپرس دیجیتال اسکنر سه‌بعدی؛ روکهایی طبیعی‌تر و بادوام‌تر.',
    },
]
</script>

<template>
  <section id="services" class="ds-section services">
    <div class="ds-container">
      <SectionHeading
        eyebrow="خدمات تخصصی"
        title="هر آنچه برای لبخند سالم نیاز دارید"
        description="مجموعه‌ای کامل از خدمات دندانپزشکی عمومی و زیبایی، ارائه‌شده توسط تیم متخصص و با به‌روزترین فناوری‌های روز dunia."
      />

      <div class="services__grid">
        <article v-for="(service, i) in services" :key="service.title" class="service-card ds-reveal" :style="{ transitionDelay: `${i * 70}ms` }">
          <div class="service-card__top">
            <span class="service-card__icon"><i :class="service.icon"></i></span>
            <span class="service-card__num">{{ String(i + 1).padStart(2, '0') }}</span>
          </div>
          <h3 class="service-card__title">{{ service.title }}</h3>
          <p class="service-card__desc">{{ service.desc }}</p>
          <RouterLink to="/reservation" class="service-card__link">
            رزرو نوبت <i class="fa-solid fa-arrow-left-long"></i>
          </RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services { background: #fff; }

.services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.service-card {
  position: relative;
  padding: 30px 28px;
  border-radius: var(--ds-radius-lg);
  border: 1px solid var(--ds-border);
  background: linear-gradient(180deg, #fff, var(--ds-gray-50));
  overflow: hidden;
  transition: transform var(--ds-dur) var(--ds-ease),
              box-shadow var(--ds-dur) var(--ds-ease),
              border-color var(--ds-dur) var(--ds-ease);
}
.service-card::before {
  content: '';
  position: absolute;
  inset-block-start: 0;
  inset-inline: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--ds-primary-400), var(--ds-accent-400));
  transform: scaleX(0);
  transform-origin: right;
  transition: transform .35s var(--ds-ease);
}
.service-card:hover {
  transform: translateY(-8px);
  border-color: var(--ds-primary-200);
  box-shadow: var(--ds-shadow);
}
.service-card:hover::before { transform: scaleX(1); }

.service-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
}
.service-card__icon {
  width: 62px;
  height: 62px;
  display: grid;
  place-items: center;
  font-size: 26px;
  border-radius: 20px;
  color: var(--ds-primary-700);
  background: var(--ds-primary-50);
  border: 1px solid var(--ds-primary-100);
  transition: all .3s var(--ds-ease);
}
.service-card:hover .service-card__icon {
  background: linear-gradient(135deg, var(--ds-primary-500), var(--ds-primary-700));
  color: #fff;
  border-color: transparent;
  box-shadow: var(--ds-shadow-brand);
}
.service-card__num {
  font-size: var(--ds-fs-xl);
  font-weight: 900;
  color: var(--ds-gray-100);
  -webkit-text-stroke: 1.5px var(--ds-gray-200);
}

.service-card__title { font-size: var(--ds-fs-lg); font-weight: 800; margin-bottom: 10px; }
.service-card__desc { color: var(--ds-text-muted); font-size: var(--ds-fs-base); margin-bottom: 18px; }

.service-card__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--ds-fs-sm);
  font-weight: 800;
  color: var(--ds-primary-700);
}
.service-card__link i { transition: transform .25s var(--ds-ease); font-size: 12px; }
.service-card__link:hover i { transform: translateX(-5px); }
</style>
