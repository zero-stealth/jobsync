<template>
  <div class="company-container">
    <div class="company-info">
      <div class="company-h-logo" :style="{ 'background-image': `url(${data.logo})` }">
      </div>
      <div class="company-header">
        <h1>Applying for {{ data.company }}</h1>
          <h2></h2>
      </div>
      <div class="company-inner">
        <h2>Job title</h2>
        <p>{{ data.title }}</p>
      </div>
      <div class="company-inner">
        <h2>Job description</h2>
        <p>{{ data.description }}</p>
      </div>
      <div class="company-footer">
        <div class="company-footer-inner">
          <CloackIcon class="company-icon" />
          <span>{{ data.duration }}</span>
        </div>
        <div class="company-footer-inner">
          <WorldIcon class="company-icon" />
          <span>{{ data.location }}</span>
        </div>
        <div class="company-footer-inner">
          <WorkerIcon class="company-icon" />
          <span>{{ data.staff }}</span>
        </div>
        <div class="company-footer-inner">
          <JobIcon class="company-icon" />
          <span>{{ data.category }}</span>
        </div>
        <div class="company-footer-inner">
          <PaymentIcon class="company-icon" />
          <span>{{ data.salary }}</span>
        </div>
      </div>
      <button @click="applyJob(data.title)" class="btn-f-f">Send Application</button>
    </div>
  </div>
</template>

<script setup>
import WorldIcon from '../icons/WorldIcon.vue'
import WorkerIcon from '../icons/WorkerIcon.vue'
import PaymentIcon from '../icons/PaymentIcon.vue'
import CloackIcon from '../icons/CloackIcon.vue'
import JobIcon from '../icons/JobIcon.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const router = useRouter()
const route = useRoute()
const data = ref({})

const getJob = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/data/jobs/${route.params.id}`)
    data.value = response.data
  } catch (err) {
    console.log(err)
  }
}

const applyJob = (name) => {
  router.push({
    name: 'Apply',
    params: {
      job: name
    }
  })
}

onMounted(() => {
  getJob()
})
</script>

<style scoped>
@import '@/style/companyview.css';
</style>
