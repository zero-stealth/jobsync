<template>
  <div>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="form-container">
      <div class="form-wrapper">
        <div class="form-group">
          <label for="name">Job Name:</label>
          <input v-model="JobName" type="text" class="form-g-input" placeholder="Software engineer " id="JobName" />
        </div>
        <div class="form-group">
          <label for="name">Job Title:</label>
          <input v-model="JobTitle" type="text" class="form-g-input" placeholder="Engineer" id="JobTitle" />
        </div>
        <div class="form-group">
          <label for="logo">Company Logo:</label>
          <input
            @change="handleFileUpload"
            type="file"
            class="form-g-input"
            id="Image"
            accept="image/*"
          />
        </div>
        <div class="form-group">
          <label for="location">Location:</label>
          <input
            v-model="location"
            type="text"
            class="form-g-input"
            placeholder="job location"
            id="location"
          />
        </div>
        <div class="form-group">
          <label for="duration">Roles:</label>
          <input
            v-model="roles"
            type="text"
            class="form-g-input"
            placeholder="What will you do"
            id="roles"
          />
        </div>
        <div class="form-group">
          <label for="duration">Salary:</label>
          <input
            v-model="salary"
            type="text"
            class="form-g-input"
            placeholder="$100"
            id="salary"
          />
        </div>
        <div class="form-group">
          <label for="duration">Staff:</label>
          <input
            v-model="staff"
            type="text"
            class="form-g-input"
            placeholder="100 - 150"
            id="staff"
          />
        </div>
      </div>
      <div class="form-wrapper">
        <div class="form-group">
          <label for="duration">Qualification:</label>
          <input
            v-model="qualification"
            type="text"
            class="form-g-input"
            placeholder="A degree"
            id="qualification"
          />
        </div>
        <div class="form-group">
          <label for="duration">Deadline:</label>
          <input
            v-model="deadline"
            type="text"
            class="form-g-input"
            placeholder="2024/02/12"
            id="deadline"
          />
        </div>
        <div class="form-group">
          <label for="duration">Duration:</label>
          <input
            v-model="duration"
            type="text"
            class="form-g-input"
            placeholder="fulltime/partime"
            id="duration"
          />
        </div>
        <div class="form-group">
          <label for="category">category:</label>
          <input
            v-model="category"
            type="text"
            class="form-g-input"
            placeholder="cleaning"
            id="category"
          />
        </div>
        <div class="form-group">
          <label for="company">Company:</label>
          <input
            v-model="company"
            type="text"
            class="form-g-input"
            placeholder="company"
            id="company"
          />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <input
            v-model="description"
            type="text"
            class="form-g-input"
            placeholder="description of the job"
            id="description"
          />
        </div>
        <button type="submit" class="btn-f-f">Add Job</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const JobName = ref('')
const JobTitle = ref('')
const staff = ref('')
const salary = ref('')
const deadline = ref('')
const qualification = ref('')
const roles = ref('')
const logo = ref(null)
const duration = ref('')
const location = ref('')
const company = ref('')
const category = ref('')
const description = ref('')

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    logo.value = file
  }
}

async function handleSubmit() {
  if (
    JobName.value.trim() !== '' &&
    logo.value !== null &&
    JobTitle.value.trim() !== '' &&
    staff.value.trim() !== '' &&
    salary.value.trim() !== '' &&
    deadline.value.trim() !== '' &&
    qualification.value.trim() !== ''&&
    roles.value.trim() !== ''&&
    location.value.trim() !== ''&&
    duration.value.trim() !== ''&&
    company.value.trim() !== ''&&
    category.value.trim() !== ''&&
    description.value.trim() !== ''
  ) {
    try {
      const formData = new FormData()
      formData.append('JobName', JobName.value)
      formData.append('JobTitle', JobTitle.value)
      formData.append('staff', staff.value)
      formData.append('salary', salary.value)
      formData.append('deadline', deadline.value)
      formData.append('qualification', qualification.value)
      formData.append('roles', roles.value)
      formData.append('logo', logo.value)
      formData.append('location', location.value)
      formData.append('duration', duration.value)
      formData.append('company', company.value)
      formData.append('category', category.value)
      formData.append('description', description.value)

      const user = JSON.parse(localStorage.getItem('token'))
      await axios.post(`${SERVER_HOST}/data/jobs/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user}`
        }
      })
      alert('Job added successfully!')
    } catch (err) {
      console.error(err)
      alert('An error occurred while adding the job.')
    }
  } else {
    alert('No empty fields allowed')
  }
}
</script>

<style>
@import '@/style/form.css';
</style>
