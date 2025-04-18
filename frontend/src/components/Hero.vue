<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section id="hero">
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
      <div id="hero-carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner" role="listbox">
        <div class="carousel-item active">
          <img src="../assets/img/slide/pexels-andrea-piacquadio-3881449.jpg" class="d-block w-100 h-100" alt="...">
          <div class="container position-absolute card-none">
            <h2>سایت دکتر آزاده مهرداد</h2>
            <p> دکتر آزاده مهرداد ،یکی از بهترین دندانپزشکان زیبایی در مشهد,ایران می باشد.</p>
            <RouterLink to="#" class="btn-get-started scrollto">بیشتر بخوانید ...</RouterLink>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/img/slide/slide-2.jpg" class="d-block w-100 h-100" alt="...">
          <div class="container position-absolute card-none">
            <h2>سایت دکتر آزاده مهرداد</h2>
            <p>لبخند تو زیباست براش ارزش قائل باش.</p>
            <RouterLink to="#" class="btn-get-started scrollto">بیشتر بخوانید ...</RouterLink>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/img/slide/pexels-cottonbro-studio-6528907.jpg" class="d-block w-100 h-100" alt="...">
          <div class="container position-absolute card-none">
            <h2>سایت دکتر آزاده مهرداد</h2>
            <p>با اهمیت به دندان هایتان شخصیت خود را خریداری کنید.</p>
            <RouterLink to="#" class="btn-get-started scrollto">بیشتر بخوانید ...</RouterLink>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true">
          <i class="fa-sharp fa-solid fa-angle-right"></i>
        </span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true">
          <i class="fa-sharp fa-solid fa-angle-left"></i>
        </span>
      </button>
    </div>
  </section>
</template>

<style scoped>
/* Add your component-specific styles here */
</style>