<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section id="featured-services" class="featured-services">
    <div class="container" data-aos="fade-up">

      <div class="row">
        <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
          <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
            <div class="icon"><i class="fas fa-heartbeat"></i></div>
            <h4 class="title"><RouterLink to="">خدمات</RouterLink></h4>
            <div class="icon-star">
              <h6>نظر شما در مورد خدمات ما</h6>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
          <div class="icon-box" data-aos="fade-up" data-aos-delay="200">
            <div class="icon"><i class="fas fa-tooth"></i></div>
            <h4 class="title"><RouterLink to="">تجهیزات</RouterLink></h4>
            <div class="icon-star">
              <h6>نظر شما در مورد تجهیزات ما</h6>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
          <div class="icon-box" data-aos="fade-up" data-aos-delay="300">
            <div class="icon"><i class="fas fa-pills"></i></div>
            <h4 class="title"><RouterLink to="">مشاوره</RouterLink></h4>
            <div class="icon-star">
              <h6>نظر شما در مورد مشاوران ما</h6>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
          <div class="icon-box" data-aos="fade-up" data-aos-delay="400">
            <div class="icon"><i class="fas fa-user-nurse fa-hair"></i></div>
            <h4 class="title"><RouterLink to="">درمان‌</RouterLink></h4>
            <div class="icon-star">
              <h6>نظر شما در مورد درمان تون</h6>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Add your component-specific styles here */
</style>