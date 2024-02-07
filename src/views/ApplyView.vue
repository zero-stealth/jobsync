<template>
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
          placeholder="social media link"
          id="link"
        />
      </div>
      <div class="company-group">
        <input
          v-model="phone"
          type="text"
          class="company-g-input"
          placeholder="your phone number"
          id="phone"
        />
      </div>
      <div class="company-group">
        <label for="cv">Upload CV (PDF or DOCX):</label>
        <input
          @change="handleFileUpload('cv', $event)"
          type="file"
          class="company-g-input"
          id="cv"
          accept=".pdf, image/*"
        />
      </div>
      <div class="company-group">
        <label for="certificate">Upload Certificate (PDF or JPEG):</label>
        <input
          @change="handleFileUpload('certificate', $event)"
          type="file"
          class="company-g-input"
          id="certificate"
          accept=".pdf, image/*"
        />
      </div>
      <button type="submit" class="btn-f-f">Submit Application</button>
      <span @click="goBack" class="company-btn">go back home</span>
    </div>
    <div class="company-info">
      <h1>Tip about us</h1>
      <p>
        We specialize in developing solutions to streamline and optimize the job
        application and recruitment processes.Our goal would be to enhance
        efficiency and effectiveness in the recruitment industry by providing tools that simplify
        and improve the hiring process for both employers and job seekers.
      </p>
    </div>
  </form>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST
const router = useRouter()
const route = useRoute()
// const data = ref({})
const fullname = ref('')
const email = ref('')
const link = ref('')
const phone = ref('')
const cv = ref(null)
const certificate = ref(null)

function handleFileUpload(type, event) {
  const file = event.target.files[0]
  if (file) {
    if (type === 'cv') {
      const allowedCVFileTypes = ['application/pdf', 'image/jpeg', 'image/png']
      if (allowedCVFileTypes.includes(file.type)) {
        cv.value = file
      } else {
        alert('Invalid file type for CV. Please upload a PDF or image file.')
        event.target.value = ''
      }
    } else if (type === 'certificate') {
      const allowedCertificateFileTypes = ['application/pdf', 'image/jpeg', 'image/png']
      if (allowedCertificateFileTypes.includes(file.type)) {
        certificate.value = file
      } else {
        alert('Invalid file type for Certificate. Please upload a PDF or image file.')
        event.target.value = ''
      }
    }
  }
}

const goBack = () => {
  router.go(-1)
}

// const getJob = async () => {
//   try {
//     const response = await axios.get(`${SERVER_HOST}/data/jobs/${route.params.id}`)
//     data.value = response.data
//   } catch (err) {
//     console.log(err)
//   }
// }

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
      formData.append('job', route.params.job)
      formData.append('fullname', fullname.value)
      formData.append('email', email.value)
      formData.append('link', link.value)
      formData.append('phone', phone.value)
      formData.append('cv', cv.value)
      formData.append('certificate', certificate.value)

      await axios.post(`${SERVER_HOST}/send-email`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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

// onMounted(() => {
//   getJob()
// })
</script>

<style scoped>
@import '@/style/companyview.css';
</style>
