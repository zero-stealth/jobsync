<template>
  <div class="hero-component">
    <div class="hero-wrapper">
      <div class="top-section">
        <h1>
          Discover <span>job opportunities</span> with leading companies in the
          <span>USA</span> through us!
        </h1>
        <p>
          Embark on a journey towards success with our exciting job opportunities in the USA! Unlock
          your potential and join innovative companies that value your skills and expertise. Elevate
          your career and embrace a future filled with growth, challenges, and endless
          possibilities. Your dream job awaits – seize the opportunity today!
        </p>
      </div>
      <div class="hero-section">
        <div class="job-count job-top">
          <h1>550+</h1>
          <span>Companies available</span>
        </div>
        <div class="hero-img">
            <img :src="heroImage" alt="hero image" class="hero-image" />
        </div>
        <img :src="connectImage" alt="connect image" class="connect-image" />

        <div class="job-count job-bottom">
          <h1>1000+ candidates</h1>
          <div class="job-img-contain">
            <img src="https://randomuser.me/api/portraits/women/47.jpg" alt="participants" class="p-img p-mva" />
            <img src="https://randomuser.me/api/portraits/men/27.jpg" alt="participants" class="p-img p-mvb" />
            <img src="https://randomuser.me/api/portraits/women/49.jpg" alt="participants" class="p-img p-mvc" />
            <img src="https://randomuser.me/api/portraits/men/19.jpg" alt="participants" class="p-img p-mvd" />
            <div class="p-img p-icon-contain p-mve" @click="Login()">
              <AddIcon class="icon-add" />
            </div>
          </div>
        </div>
        <div class="hero-info">
          <form @submit.prevent="searchCompany()" class="hero-form">
            <h1>Search for your dream company</h1>
            <div class="form-group">
              <input v-model="company" type="text" class="form-g-input" placeholder="company" id="search" />
            </div>
            <div class="form-group">
              <input v-model="title" type="text" class="form-g-input" placeholder="name" id="name" />
            </div>
            <div class="form-group">
              <input v-model="location" type="text" class="form-g-input" placeholder="location" id="location" />
            </div>
            <button type="button" class="btn-form" @click="showResult">Search</button>
          </form>
        </div>
      </div>
    </div>
    <CompanySlide />
  </div>
</template>

<script setup>
import axios from 'axios'
import AddIcon from '@/icons/AddIcon.vue'
import heroImage from '@/assets/heroImage.png'
import connectImage from '@/assets/connect.png'
import { ref, watchEffect, onMounted } from 'vue'
import CompanySlide from '@/components/CompanySlide.vue'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const location = ref('')
const search = ref('')
const title = ref('')
const jobData = ref([])
const filteredData = ref([])
const loading = ref(false)

const getJob = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`${SERVER_HOST}/data/jobs/`)
    jobData.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false;
  }
}

const showResult = () => {
  if (location.value === '' && search.value === '') {
    filteredData.value = jobData.value
  } else {
    searchJobs()
  }
}

const searchJobs = () => {
  const searchTerm = search.value.toLowerCase().trim()
  const locationTerm = location.value.toLowerCase().trim()

  if (jobData.value && jobData.value.length > 0) {
    filteredData.value = jobData.value.filter((d) => {
      const jobTitle = d.job ? d.job.toLowerCase() : ''
      const jobLocation = d.location ? d.location.toLowerCase() : ''

      return jobTitle.includes(searchTerm) || jobLocation.includes(locationTerm)
    })
  } else {
    filteredData.value = []
  }

}

watchEffect(() => {
  searchJobs()
})

onMounted(() => {
  getJob()
})
</script>

<style scoped>
@import '@/style/hero.css';
</style>
