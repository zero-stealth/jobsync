<template>
  <div class="popular-section">
    <h1>
      <span>{{ data.length }} company </span> available
    </h1>

    <div v-if="data.length > 0">
      <div class="popular-component" v-for="item in data[0]" :key="item._id">
        <div class="popular-card">
          <div class="popular-header">
            <div class="p-header-inner">
              <img :src="item.logo" :alt="item.job" class="popular-img" />
              <div class="popular-header-title">
                <h1>{{ item.company }}</h1>
                <span>{{ item.location }}</span>
              </div>
            </div>
            <button class="popular-btn" @click="ApplyJob(item._id, item.company)">Get job</button>
          </div>
          <div class="popular-info-inner">
            <div class="info-inner-has">
              <h1>{{ item.title }}</h1>
              <div class="has-contain">
                <div class="has-inner">
                  <CloackIcon class="popular-icon" />
                  <span>{{ item.duration }}</span>
                </div>
                <div class="has-inner">
                  <WorkerIcon class="popular-icon" />
                  <span>{{ item.staff }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="popular-footer">
            <div class="popular-footer-inner">
              <JobIcon class="popular-icon" />
              <span>{{ item.category }}</span>
            </div>
            <div class="popular-footer-inner">
              <PaymentIcon class="popular-icon" />
              <span>{{ item.salary }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="nothing-contain" v-else>
      <img :src="nothingImage" alt="empty" class="nothingImage" />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import nothingImage from '../assets/nothing.gif'
import WorkerIcon from '../icons/WorkerIcon.vue'
import PaymentIcon from '../icons/PaymentIcon.vue'
import CloackIcon from '../icons/CloackIcon.vue'
import JobIcon from '../icons/JobIcon.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const data = ref([])
const router = useRouter()

const getJob = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/data/jobs/`)
    data.value = response.data.length > 0 ? [response.data] : []
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getJob()
})

const ApplyJob = (id, name) => {
  router.push({
    name: 'Company',
    params: {
      id: id,
      company: name
    }
  })
}
</script>

<style>
@import '@/style/company.css';
</style>
