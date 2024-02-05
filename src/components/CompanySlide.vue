<template>
  <div class="companies-title">
    <h1>Companies seeking talents through us</h1>
  </div>
  <div class="companies-component">
    <div class="company-autoscroll">
      <template v-if="jobData.length > 0">
        <div class="company-container" ref="companyContainer">
          <img v-for="d in jobData" :key="d.id" @click="ApplyJob(d.id, d.company)" :src="d.image" :alt="d.company" class="league-c-img" />
        </div>
      </template>
      <template v-else>
        <div class="error">
          <h1>No companies found</h1>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
const SERVER_RapidAPI_Host = import.meta.env.VITE_X_RapidAPI_Host
const SERVER_RapidAPI_Key = import.meta.env.VITE_X_RapidAPI_Key
import { ref, onMounted, onBeforeUnmount } from 'vue';
const SERVER_URL = import.meta.env.VITE_URL
import { useRouter } from 'vue-router'
const router = useRouter()
const loading = ref(false)
import axios from 'axios'
const jobData = ref([])

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


const companyContainer = ref(null);
let animationInterval;

const scrollImages = () => {
  const container = companyContainer.value;
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
});

onBeforeUnmount(() => {
  clearInterval(animationInterval);
});
</script>

<style scoped>
@import '@/style/companies.css';
</style>
