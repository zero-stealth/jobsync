<template>
  <div class="abt-section">
    <div class="abt-contain">
      <div class="abt-info">
        <div class="abt-h">
          <span>About JobSync Network</span>
          <h1>A bridge to your dream company</h1>
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
  </div>
</template>
<script setup>
import aboutImage from '../assets/about.png'
</script>
<style>
@import '@/style/about.css';
</style>
