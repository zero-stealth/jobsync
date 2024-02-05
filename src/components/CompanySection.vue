<template>
  <div class="popular-section">
    <div class="category-title">
        <h1>Apply for a job now</h1>
        <span></span>
      </div>
    <div v-if="jobData.length > 0" class="popular-component" ref="popularContainer">
      <div  v-for="item in jobData" :key="item.id" >
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
    </div>
    <div class="nothing-contain" v-else>
      <img :src="nothingImage" alt="empty" class="nothingImage" />
    </div>
  </div>
</template>

<script setup>
const SERVER_RapidAPI_Host = import.meta.env.VITE_X_RapidAPI_Host
const SERVER_RapidAPI_Key = import.meta.env.VITE_X_RapidAPI_Key
// const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
import { ref, onMounted, onBeforeUnmount } from 'vue';
const SERVER_URL = import.meta.env.VITE_URL
import nothingImage from '../assets/nothing.gif'
import WorkerIcon from '../icons/WorkerIcon.vue'
import LocationIcon from '../icons/LocationIcon.vue'
import CloackIcon from '../icons/CloackIcon.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const jobData = ref([])
const router = useRouter()
const loading = ref(false)
// const getJob = async () => {
//   try {
//     const response = await axios.get(`${SERVER_HOST}/jobData/jobs/`)
//     jobData.value = response.jobData.length > 0 ? [response.jobData] : []
//   } catch (err) {
//     console.log(err)
//   }
// }

const getJob = async () => {
  try {
    loading.value = true;

    const response = await axios.get(`${SERVER_URL}`, {
      params: {
        query: 'Techjob',
        location: 'Canada, Usa',
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




const popularContainer = ref(null);
let animationInterval;

const scrollImages = () => {
  const container = popularContainer.value;
  if (container) {
    container.scrollLeft += 2; 
    if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
      container.scrollLeft = 0;
    }
  }
};

const ApplyJob = (id, name) => {
  router.push({
    name: 'Company',
    params: {
      id: id,
      company: name
    }
  })
}

onMounted(() => {
  animationInterval = setInterval(scrollImages, 50);
  getJob()
})

onBeforeUnmount(() => {
  clearInterval(animationInterval);
});
</script>

<style scoped>
@import '@/style/company.css';
</style>
