<template>
  <div class="popular-section">
    <div class="category-title">
      <h1>Apply for a job now</h1>
      <span></span>
    </div>
    <div v-if="pagedJobs.length > 0" class="popular-component">
      <p>page number {{ currentPage }}</p>
      <div v-for="item in pagedJobs" :key="item.id">
        <div class="popular-card">
          <div class="popular-header">
            <h1>{{ item.title }}</h1>
            <button class="popular-btn" @click="ApplyJob(item.id, item.company)">Get job</button>
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

const SERVER_RapidAPI_Host = import.meta.env.VITE_X_RapidAPI_Host
const SERVER_RapidAPI_Key = import.meta.env.VITE_X_RapidAPI_Key
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

const pagedJobs = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return jobData.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => Math.ceil(jobData.value.length / itemsPerPage))

const getJob = async () => {
  try {
    loading.value = true

    const response = await axios.get(`${SERVER_URL}`, {
      params: {
        query: 'Engineering;Developer;Programmer' ,
        location: 'Canada;Usa',
        language: 'en_GB',
        datePosted: 'month',
        index: '0'
      },
      headers: {
        'X-RapidAPI-Key': SERVER_RapidAPI_Key,
        'X-RapidAPI-Host': SERVER_RapidAPI_Host
      }
    })

    jobData.value = response.data.jobs
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const ApplyJob = (id, name) => {
  router.push({
    name: 'Company',
    params: {
      id: id,
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

onMounted(() => {
  getJob()
})
</script>

<style scoped>
@import '@/style/company.css';
</style>
