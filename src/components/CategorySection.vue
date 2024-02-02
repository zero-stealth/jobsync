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
import analyst from '../assets/analyst.jpg'
import developer from '../assets/developer.jpg'
import director from '../assets/director.jpg'
import scientist from '../assets/scientist.jpg'
import support from '../assets/support.jpg'
import technician from '../assets/technician.jpg'

const data = ref([
  {
    id: 1,
    image: technician,
    title: 'IT Technician',
    description: 'Collaborates with support specialists to analyze and diagnose computer issues.  '
  },
  {
    id: 2,
    image: support,
    title: 'Support specialist',
    description: 'You are responsible for reviewing and solving computer network and hardware problems for a business. '
  },
  {
    id: 3,
    image: developer,
    title: ' Web developer ',
    description: 'Web developers design the appearance, navigation and content organization of a website. '
  },
  {
    id: 4,
    image: analyst,
    title: ' Systems analyst ',
    description: ' Reviews design components and use their knowledge of information technology to solve business problems. '
  },
  {
    id: 5,
    image: scientist,
    title: 'Data scientist ',
    description: 'Analyzes and organizes data to determine trends that can influence business decisions.'
  },
  {
    id:6,
    image:  director,
    title:  'IT director',
    description: "Oversees the strategy and execution of IT operations for an organization."
  }
])
</script>
<style>
@import '@/style/category.css';
</style>
