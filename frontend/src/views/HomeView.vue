<script setup>
import Topbar from '../components/Topbar.vue';
import Header from '../components/Header.vue';
import Hero from '../components/Hero.vue';
import Services from '../components/Services.vue';
import CallToAction from '../components/CallToAction.vue';
import Departments from '../components/Departments.vue';
import Gallery from '../components/Gallery.vue';
import AboutUs from '../components/AboutUs.vue';
import AskedQuestioins from '../components/AskedQuestioins.vue';
import Contact from '../components/Contact.vue';
import Footer from '../components/Footer.vue';
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' }); // اسکرول نرم
  }
};
</script>

<template>
  <Topbar />
  <Header />
  <Hero />
  <Services />
  <CallToAction />
  <Departments />
  <Gallery />
  <AboutUs />
  <AskedQuestioins />
  <Contact />
  <Footer />
</template>

<style scoped>
/* Add any home styles here */
</style>
