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
        <button type="submit" class="btn-f-f">Update Job</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['formSubmit'])

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

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    logo.value = file
  }
}

function handleSubmit() {
  try {
    const formData = {
      JobName: JobName.value,
      logo: logo.value,
      JobTitle: JobTitle.value,
      staff: staff.value,
      salary: salary.value,
      deadline: deadline.value,
      qualification: qualification.value,
      roles: roles.value,
      location: location.value,
      duration: duration.value,
      company: company.value,
      category: category.value,
      description: description.value
    }

    emit('formSubmit', formData)
  } catch (err) {
    console.log(err)
  }
}
</script>

<style>
@import '@/style/games.css';
</style>
