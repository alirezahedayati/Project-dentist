<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <section id="cta" class="cta">
        <div class="container" data-aos="zoom-in">
            <div class="text-center">
                <h3>همین الان نوبت خود را بگیرید </h3>
                <p>با اهمیت به دندان هایتان همه از ارتباط با شما خوشحال میشوند</p>
                <RouterLink class="cta-btn scrollto" to="/reservation">همین الان نوبت بگیرید </RouterLink>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Add your component-specific styles here */
</style>