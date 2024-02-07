<template>
  <div class="popular-section">
    <div class="category-title">
      <h1>Apply for a job now</h1>
      <span></span>
    </div>
    <div v-if="pagedJobs.length > 0" class="popular-component">
      <div class="filter-component">
        <p>Page {{ currentPage }}</p>
        <div class="filter-dropdowns">
          <select id="location" v-model="selectedLocation" @change="filterJobs">
            <option value="">Search by Location</option>
            <option v-for="location in locations" :key="location">{{ location }}</option>
          </select>
          <select id="query" v-model="selectedQuery" @change="filterJobs">
            <option value="">Search by Job</option>
            <option v-for="query in queries" :key="query">{{ query }}</option>
          </select>
        </div>
      </div>

      <div v-for="item in pagedJobs" :key="item.id">
        <div class="popular-card">
          <div class="popular-header">
            <h1>{{ item.title }}</h1>
            <button class="popular-btn" @click="applyJob(item.id, item.company)">Get job</button>
          </div>
          <div class="info-inner-has">
            <div class="has-inner-top">
              <LocationIcon class="popular-icon-inner" />
              <span>{{ item.location }}</span>
            </div>
            <div class="has-contain">
              <div class="has-inner">
                <CloackIcon class="popular-icon-inner" />
                <span>{{ item.datePosted }}</span>
              </div>

              <div class="has-inner">
                <WorkerIcon class="popular-icon-inner" />
                <span>{{ item.staff }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-buttons">
        <button class="previous-btn" @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <button class="next-btn" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
    <div class="nothing-contain" v-else>
      <img :src="nothingImage" alt="empty" class="nothingImage" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const SERVER_RAPIDAPI_HOST = import.meta.env.VITE_X_RapidAPI_Host
const SERVER_RAPIDAPI_KEY = import.meta.env.VITE_X_RapidAPI_Key
const SERVER_URL = import.meta.env.VITE_URL

import nothingImage from '../assets/nothing.gif'
import WorkerIcon from '../icons/WorkerIcon.vue'
import LocationIcon from '../icons/LocationIcon.vue'
import CloackIcon from '../icons/CloackIcon.vue'

const jobData = ref([])
const router = useRouter()
const loading = ref(false)

const currentPage = ref(1)
const itemsPerPage = 2

const selectedLocation = ref('')
const selectedQuery = ref('')
const locations = ref(['Australia', 'Canada', 'Usa', 'Canada'])
const queries = ref(['Software Engineer', 'Registered nurse', 'Teacher', 'Accountant', "Marketing Specialist", 'Sales Representative' , 'Customer Service Representative', 'Administrative Assistant', 'Doctor', 'Engineer'])

const pagedJobs = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return jobData.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => Math.ceil(jobData.value.length / itemsPerPage))

const filterJobs = async () => {
  try {
    loading.value = true

    const response = await axios.get(SERVER_URL, {
      params: {
        query: selectedQuery.value || 'Engineering',
        location: selectedLocation.value || 'Canada',
        language: 'en_GB',
        datePosted: 'month',
        index: '0'
      },
      headers: {
        'X-RapidAPI-Key': SERVER_RAPIDAPI_KEY,
        'X-RapidAPI-Host': SERVER_RAPIDAPI_HOST
      }
    })

    localStorage.setItem('job', selectedQuery.value);
    localStorage.setItem('location', selectedLocation.value);
    jobData.value = response.data.jobs
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const applyJob = (id, name) => {
  router.push({
    name: 'Company',
    params: {
      id,
      company: name
    }
  })
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

onMounted(async () => {
  await filterJobs()
})
</script>

<style scoped>
@import '@/style/company.css';
</style>
