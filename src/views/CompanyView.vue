<template>
  <div class="company-container">
    <div class="company-info">
      <div class="company-header">
        <img :src="data.logo" :alt="data.company" class="company-h-logo" />
      <div class="company-header-inner">
        <h1>Applying for {{ data.company }}</h1>
        <h1>Job {{ data.title }}</h1>
      </div>
 
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
          <span> {{ data.location }}</span>
        </div>
        <div class="company-footer-inner">
          <WorkerIcon class="company-icon" />
          <span> {{ data.staff }}</span>
        </div>
        <div class="company-footer-inner">
          <JobIcon class="company-icon" />
          <span>{{ data.category }}</span>
        </div>
        <div class="company-footer-inner">
          <PaymentIcon class="company-icon" />
          <span> {{ data.salary }}</span>
        </div>
      </div>
    </div>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="apply-page">
      <div class="company-wrapper">
        <h1>Apply for the company</h1>
        <div class="company-group">
          <input
            v-model="fullname"
            type="text"
            class="company-g-input"
            placeholder="Full Name"
            id="nafullnameme"
          />
        </div>
        <div class="company-group">
          <input
            v-model="email"
            type="text"
            class="company-g-input"
            placeholder="your email"
            id="email"
          />
        </div>
        <div class="company-group">
          <input
            v-model="link"
            type="text"
            class="company-g-input"
            placeholder="work link"
            id="link"
          />
        </div>
        <div class="company-group">
          <input
            v-model="phone"
            type="text"
            class="company-g-input"
            placeholder="phone number"
            id="phone"
          />
        </div>
        <div class="company-group">
          <label for="cv">Upload CV (PDF or Image):</label>
          <input
            @change="handleFileUpload('cv', $event)"
            type="file"
            class="company-g-input"
            id="cv"
            accept=".pdf, image/*"
          />
        </div>
        <div class="company-group">
          <label for="certificate">Upload Certificate (PDF or Image):</label>
          <input
            @change="handleFileUpload('certificate', $event)"
            type="file"
            class="company-g-input"
            id="certificate"
            accept=".pdf, image/*"
          />
        </div>
        <button type="submit" class="btn-f-f">Submit Application</button>
        <span  @click="goBack" class="company-btn">go back home</span>
      </div>
    </form>
  </div>
</template>

<script setup>
import WorldIcon from '../icons/WorldIcon.vue'
import WorkerIcon from '../icons/WorkerIcon.vue'
import PaymentIcon from '../icons/PaymentIcon.vue'
import CloackIcon from '../icons/CloackIcon.vue'
import { useRoute, useRouter } from 'vue-router'
import JobIcon from '../icons/JobIcon.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const router = useRouter()
const route = useRoute()
const data = ref({})
const fullname = ref('')
const email = ref('')
const link = ref('')
const phone = ref('')
const cv = ref(null)
const certificate = ref(null)

function handleFileUpload(type, event) {
  const file = event.target.files[0];
  if (file) {
    if (type === 'cv') {
      const allowedCVFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (allowedCVFileTypes.includes(file.type)) {
        cv.value = file;
      } else {
        alert('Invalid file type for CV. Please upload a PDF or image file.');
        event.target.value = '';
      }
    } else if (type === 'certificate') {
      const allowedCertificateFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (allowedCertificateFileTypes.includes(file.type)) {
        certificate.value = file;
      } else {
        alert('Invalid file type for Certificate. Please upload a PDF or image file.');
        event.target.value = '';
      }
    }
  }
}

const goBack = () => {
  router.go(-1)
}

const getJob = async () => {
  try {
    const response = await axios.get(`${SERVER_HOST}/data/jobs/${route.params.id}`)
    data.value = response.data
  } catch (err) {
    console.log(err)
  }
}

async function handleSubmit() {
  if (
    fullname.value.trim() !== '' &&
    email.value.trim() !== '' &&
    link.value.trim() !== '' &&
    phone.value.trim() !== '' &&
    cv.value !== null &&
    certificate.value !== null
  ) {
    try {
      const formData = new FormData()
      formData.append('fullname', fullname.value)
      formData.append('email', email.value)
      formData.append('link', link.value)
      formData.append('phone', phone.value)
      formData.append('cv', cv.value)
      formData.append('certificate', certificate.value)

      const user = JSON.parse(localStorage.getItem('token'))
      await axios.post(`${SERVER_HOST}/data/jobs/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user}`
        }
      })
      alert('Application sent successfully!')
    } catch (err) {
      console.error(err)
      alert('Application failed')
    }
  } else {
    alert('No empty fields allowed')
  }
}

onMounted(() => {
  getJob()
})
</script>

<style scoped>
@import '@/style/companyview.css';
</style>
