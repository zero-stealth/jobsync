<template>
  <div class="hero-component">
    <div class="hero-wrapper">
      <div class="hero-section">
        <a class="job-count job-top" href="#company">
          <h1>{{jobData.length}} +</h1>
          <span>Current jobs available</span>
        </a>
        <div class="hero-img">
          <h1>
            <span>Tech Job </span> from companies in the
            <span>USA, CANADA</span> and  <span>Australia</span> 
          </h1>
          <p>
            Embark on a journey towards success with our exciting job opportunities in the USA!
            Unlock your potential and join innovative companies that value your skills and
            expertise. Elevate your career and embrace a future filled with growth, challenges, and
            endless possibilities. Your dream job awaits – seize the opportunity today!
          </p>
        </div>
        <img :src="connectImage" alt="connect image" class="connect-image" />
        <div class="job-count job-bottom">
          <h1>1000+ candidates</h1>
          <div class="job-img-contain">
            <img
              src="https://randomuser.me/api/portraits/women/47.jpg"
              alt="participants"
              class="p-img p-mva"
            />
            <img
              src="https://randomuser.me/api/portraits/men/27.jpg"
              alt="participants"
              class="p-img p-mvb"
            />
            <img
              src="https://randomuser.me/api/portraits/women/49.jpg"
              alt="participants"
              class="p-img p-mvc"
            />
            <img
              src="https://randomuser.me/api/portraits/men/19.jpg"
              alt="participants"
              class="p-img p-mvd"
            />
            <div class="p-img p-icon-contain p-mve" @click="Login()">
              <AddIcon class="icon-add" />
            </div>
          </div>
        </div>
        <div class="hero-info">
          <img :src="heroImage" alt="hero image" class="hero-image" />
        </div>
      </div>
    </div>
  </div>
  <CompanySlide />
</template>

<script setup>
import axios from 'axios'
import AddIcon from '@/icons/AddIcon.vue'
import heroImage from '@/assets/heroImage.png'
import connectImage from '@/assets/connect.png'
import { ref, onMounted } from 'vue'
import CompanySlide from '@/components/CompanySlide.vue'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const jobData = ref([])
const loading = ref(false)

const getJob = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${SERVER_HOST}/data/jobs/`)
    jobData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}


onMounted(() => {
  getJob()
})
</script>

<style scoped>
@import '@/style/hero.css';
</style>
