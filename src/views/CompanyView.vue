<template>
  <div class="company-container">
    <div class="company-info" v-for="data in jobData" :key="data.id">
      <div class="company-h-logo" :style="{ 'background-image': `url(${data.image})` }">
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
        <p>
          {{ isFullDescription ? data.description : truncateDescription(data.description) }}
          <span v-if="data.description.length > 100">
            <button @click="toggleDescription" class="Read-d">
              {{ isFullDescription ? 'Read Less' : 'Read More' }}
            </button>
          </span>
        </p>
      </div>
      <div class="company-footer">
        <div class="company-footer-inner">
          <CloackIcon class="company-icon" />
          <span>{{ data.datePosted }}</span>
        </div>
        <div class="company-footer-inner">
          <WorldIcon class="company-icon" />
          <span>{{ data.location }}</span>
        </div>
        <div class="company-footer-inner">
          <WorkerIcon class="company-icon" />
          <span>{{ data.employmentType }}</span>
        </div>
        <div class="company-footer-inner">
          <JobIcon class="company-icon" />
          <span>{{ data.title }}</span>
        </div>
        <div class="company-footer-inner">
          <PaymentIcon class="company-icon" />
          <span>{{ data.salaryRange }}</span>
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

const SERVER_RapidAPI_Host = import.meta.env.VITE_X_RapidAPI_Host
const SERVER_RapidAPI_Key = import.meta.env.VITE_X_RapidAPI_Key
const SERVER_URL = import.meta.env.VITE_URL

const router = useRouter()
const loading = ref(false)
const route = useRoute()
const jobData = ref({})
const isFullDescription = ref(false);

const truncateDescription = (description) => {
  return description.slice(0, 200) + '...';
};

const toggleDescription = () => {
  isFullDescription.value = !isFullDescription.value;
};

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

    const filteredData = response.data.jobs.filter(item => {
      return item.id === route.params.id;
    });

    jobData.value = filteredData;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const applyJob = (name) => {
  router.push({
    name: 'Apply',
    params: {
      job: name
    }
  });
};

onMounted(() => {
  getJob();
});
</script>

<style scoped>
@import '@/style/companyview.css';
</style>