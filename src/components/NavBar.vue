<template>
  <div class="nav-section" id="Home">
    <div class="nav-container">
      <div class="nav-logo">
        <img :src="logo" alt="logo" class="logo-img" />
      </div>
      <div class="nav-middle">
        <RouterLink to="/" class="nav-link" v-if="routeName !== 'Home'">Home</RouterLink>
        <a href="#Home" class="nav-link" :class="activeClass('#Home')" v-else>Home</a>
        <a href="#company" class="nav-link" :class="activeClass('#company')">Job offers</a>
        <a href="#categories" class="nav-link" :class="activeClass('#categories')">Job categories</a>
        <a href="#about" class="nav-link" :class="activeClass('#about')">About us</a>
        <a href="#contact" class="nav-link" :class="activeClass('#contact')">Contact</a>
      </div>
      <div class="nav-end" v-if="authStore.token === null">
        <a href="#company" class="nav-link btn-apply">Apply now</a>
      </div>
      <div class="nav-end" v-else>
        <button class="btn-logout" @click="Logout">logout</button>
      </div>
      <div class="mobile-nav">
        <MenuIcon class="menu-icon" @click="toggleMenu" />
      </div>
    </div>
    <div class="mobile-nav-menu" v-if="mobileNavActive">
      <div class="nav-content-menu">
        <RouterLink to="/" class="nav-link" @click="toggleMenu" v-if="routeName === 'Home'"
          >Home</RouterLink
        >
        <a
          href="#Home"
          class="nav-link"
          @click="toggleMenu"
          :class="activeMobileClass('#Home')"
          v-else
          >Job</a
        >
    
        <a
          href="#company"
          class="nav-link"
          @click="toggleMenu"
          :class="activeMobileClass('#company')"
          >Job offers</a
        >
        <a href="#about" class="nav-link" @click="toggleMenu" :class="activeMobileClass('#about')"
          >About us</a
        >
        <a
          href="#categories"
          class="nav-link"
          @click="toggleMenu"
          :class="activeMobileClass('#categories')"
          >Categories</a
        >
        <a
          href="#contact"
          class="nav-link"
          @click="toggleMenu"
          :class="activeMobileClass('#contact')"
          >Contact</a
        >
      </div>
      <div class="nav-end-menu" v-if="authStore.token === null">
        <RouterLink to="/signup" class="nav-link menu-btn active-btn" @click="toggleMenu"
          >Signup</RouterLink
        >
        <a href="#company" class="nav-link menu-btn" @click="toggleMenu">Apply now</a>
      </div>
      <div class="nav-end-menu" v-else>
        <button class="menu-btn" @click="Logout">logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import MenuIcon from '@/icons/MenuIcon.vue'
import logo from '@/assets/logo.png'

const mobileNavActive = ref(false)
const authStore = useAuthStore()
const routeName = ref('Home')
const route = useRoute()

onMounted(() => {
  watchEffect(() => {
    routeName.value = route.hash
  })
})

const activeClass = (link) => {
  const style = ref(null)
  if (link === route.hash) {
    style.value = 'active'
  }

  return style.value
}

const Logout = () => {
  authStore.removeToken()
}

const activeMobileClass = (link) => {
  const style = ref(null)
  if (link === route.hash) {
    style.value = 'active-mobile'
  }

  return style.value
}

const toggleMenu = () => {
  mobileNavActive.value = !mobileNavActive.value
}
</script>

<style scoped>
@import '@/style/navbar.css';
</style>
