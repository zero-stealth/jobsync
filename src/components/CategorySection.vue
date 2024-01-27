<template>
  <div class="category-section">
    <div class="category-header">
      <div class="category-title">
        <h1>Company categories</h1>
        <span></span>
      </div>
      <p>
        Explore  job opportunities we offer across various industries and company, spanning
        entry-level to experienced positions.We foster a dynamic and inclusive work
        environment, providing roles in technology, healthcare, finance, and more.
      </p>
    </div>
    <div class="category-component">
      <div class="category-card" v-for="d in data" :key="d.id" onclick="">
        <img :src="d.image" :alt="d.title" class="card-img" />
        <div class="card-info">
          <h1>{{ d.title }}</h1>
          <p>{{ d.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import tech from '@/assets/tech.jpg'
import marketing from '@/assets/marketing.png'
import management from '@/assets/management.png'
import electrician from '@/assets/electrician.jpg'
import finance from "@/assets/finance.png"

const data = ref([
  {
    id: 1,
    image: tech,
    title: 'Tech companies',
    description: 'Get job in tech related field that suit your needs and qualification'
  },
  {
    id: 2,
    image: marketing,
    title: 'Marketing and advertisement ',
    description: 'Get job in all form marketing comapany like design, social media, brand ambassador among others'
  },
  {
    id: 3,
    image: management,
    title: 'Management ',
    description: 'Get job in any management required field such as in finance, business, real estate among others'
  },
  {
    id: 4,
    image: electrician,
    title: 'Electrician ',
    description: 'work in electric company to solve the energy crisis'
  },
  {
    id: 5,
    image: finance,
    title: 'Finance ',
    description: 'work in Finance comapanies and agency to ensure to profit increase and mitigate losses'
  }
])
</script>
<style>
@import '@/style/category.css';
</style>
