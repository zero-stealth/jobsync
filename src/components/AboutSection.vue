<template>
  <div class="abt-section">
    <div class="abt-contain">
      <div class="abt-info">
        <div class="abt-h">
          <span>About JobSync Network</span>
          <h1>A bridge you to your dream company</h1>
        </div>
        <p>
          We have been dedicated to serving the job market for over three decades providing many job seekers access to their dream job. Our commitment to excellence and innovation has made us a trusted name in the industry.  Our mission is to connect the right talent with the right opportunities.
        </p>
        <div class="abt-list">
          <li>24hrs application</li>
          <li>100% Job Employment</li>
          <li>Best companies available</li>
          <li>Guranteed better working conditions</li>
        </div>
      </div>
      <div class="abt-img">
        <img :src="aboutImage" alt="about image" class="about-image" />
      </div>
    </div>
    <div class="abt-steps">
      <span>Your journey begins here</span>
      <h1>Follow these steps to get started</h1>
    </div>
    <div class="step-contain">
      <div class="step-wrap">
        <div class="step-icon">
          <LoginIcon class="step-icon-c" />
        </div>
        <p>Login or create an account</p>
      </div>
      <div class="step-wrap">
        <div class="step-icon">
          <JobIcon class="step-icon-c" />
        </div>
        <p>Search for the company you want</p>
      </div>
      <div class="step-wrap">
        <div class="step-icon">
          <ApplyIcon class="step-icon-c" />
        </div>
        <p>Apply for your dream company</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import JobIcon from '../icons/JobIcon.vue'
import aboutImage from '../assets/about.png'
import LoginIcon from '../icons/LoginIcon.vue'
import ApplyIcon from '../icons/ApplyIcon.vue'
</script>
<style>
@import '@/style/about.css';
</style>
