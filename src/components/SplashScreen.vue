<template>
  <div class="app-loader">
    <div class="loader-container">
      <img :src="logo" alt="logo" class="logo-load"/>
      <span class="loader"></span>
    </div>
  </div>
</template>
<script setup>
import logo from '../assets/logo.png'
</script>
<style scoped>
.app-loader {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary-color);
}

.loader-container {
  gap: 40px;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
}

.logo-load {
  height: 80px;
  object-fit: contain;
  object-position: center;
}

.loader {
    position: relative;
    width:  60px;
    height: 60px;
    color: var(--background-color);
    background: var(--primary-color);
    transform: rotateX(65deg) rotate(45deg);
    animation: layers1 1s linear infinite alternate;
  }
  .loader:after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--light-color);
    animation: layerTr 1s linear infinite alternate;
  }

  @keyframes layers1 {
    0% { box-shadow: 0px 0px 0 0px  }
   90% , 100% { box-shadow: 20px 20px 0 -4px  }
  }
  @keyframes layerTr {
    0% { transform:  translate(0, 0) scale(1) }
    100% {  transform: translate(-25px, -25px) scale(1) }
  }
      
</style>
