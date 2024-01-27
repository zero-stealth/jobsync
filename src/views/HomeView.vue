<script setup>
import HeroSection from '@/components/HeroSection.vue'
import CategorySection from '@/components/CategorySection.vue'
import CompanySection from '@/components/CompanySection.vue'
import AboutSection from '@/components/AboutSection.vue';
import FooterSection from '@/components/FooterSection.vue';
import TestimonySection from '@/components/TestimonialSection.vue';
</script>
<template>
  <div class="home-container">
    <HeroSection id="Home"/>
    <CompanySection id="company"/>
    <CategorySection id="categories"/>
    <AboutSection id="about"/>
    <TestimonySection />
    <FooterSection id="contact"/>
  </div>
</template>
<style scoped>
@import '@/style/home.css';
</style>
