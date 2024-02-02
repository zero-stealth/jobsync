<template>
  <div class="hero-component">
    <div class="hero-wrapper">
      <div class="hero-section">
        <div class="hero-img">
          <h1><span>Jobs </span> in the <span>Us, Canada ,Uk</span> and <span>Australia</span></h1>
          <p>
            Embark on a journey towards success with our exciting job opportunities in the USA!
            Unlock your potential and join innovative companies that value your skills and
            expertise. Elevate your career and embrace a future filled with growth, challenges, and
            endless possibilities. Your dream job awaits – seize the opportunity today!
          </p>
        </div>
        <img :src="connectImage" alt="connect image" class="connect-image" />
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
import { ref, onMounted } from 'vue'
import heroImage from '@/assets/heroImage.png'
import connectImage from '@/assets/connect.png'
const SERVER_URL = import.meta.env.VITE_URL
// const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const SERVER_RapidAPI_Key = import.meta.env.VITE_X_RapidAPI_Key
const SERVER_RapidAPI_Host = import.meta.env.VITE_X_RapidAPI_Host
import CompanySlide from '@/components/CompanySlide.vue'

const jobData = ref([])
const loading = ref(false)

// const getJob = async () => {
//   try {
//     loading.value = true
//     const response = await axios.get(`${SERVER_HOST}/data/jobs/`)
//     jobData.value = response.data.length > 0 ? [response.data] : []
//   } catch (err) {
//     console.error(err)
//   } finally {
//     loading.value = false
//   }
// }

const getJob = async () => {
  try {
    loading.value = true;

    const response = await axios.get(`${SERVER_URL}`, {
      params: {
        query: 'Techjob',
        location: 'Uk',
        language: 'en_GB',
        datePosted: 'month',
        index: '0'
      },
      headers: {
        'X-RapidAPI-Key': SERVER_RapidAPI_Key,
        'X-RapidAPI-Host': SERVER_RapidAPI_Host
      }
    });

    jobData.value = response.data.jobs;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};


onMounted(() => {
  getJob()
})
</script>

<style scoped>
@import '@/style/hero.css';
</style>
