<template>
  <div class="companies-title">
    <h1>Companies seeking talents through us</h1>
  </div>
  <div class="companies-component">
    <div class="company-autoscroll">
      <template v-if="data.length > 0">
        <div class="company-container" ref="companyContainer">
          <img v-for="d in data" :key="d.id" @click="ApplyJob(d.id, d.name)" :src="d.image" :alt="d.company" class="league-c-img" />
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()


const data = ref([

  {
    id: 2,
    name: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8dnYZKFN7akNCaoFuUvfm4GNTxS3wtOltpTeQ&s=0',
   
  },
  {
    id: 3,
    name: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkoLx5noMsD3MQ03N4Cr7SmtrjXhO4JAi_dZFN&s=0',
   
  },
  {
    id: 4,
    name: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdMVUNivMZMzOue48X2VFmMzfK9p4wP7dopSc6&s=0',
   
  },
  {
    id: 5,
    name: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMcGTFe52sOjNfJqqWLzpRFHpIkschndtg0bJ2&s=0',
  },

    {
    id: 6,
    name: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8xLPd8lH8ru19bZE1ubm28KTF3ZW9R_9lGR-&s=0',
   
  },
  {
    id: 7,
    name: 'Novosynergy Technologies',
    image: 'https://www.novosynergytechnologies.com/assets/img/logo.svg',
   
  },
  {
    id: 8,
    name: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw52ekJQZFdXVA-LMQLODqnn7QRYStzE7CLhGZ&s=0',
   
  },

  {
    id: 10,
    name: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkOaiflbCsXuHHhlFqUh8RgwOvwZ91xj2bVaEY&s=0',
   
  },
  {
    id: 11,
    name: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRshqXKm4dMg-weQFjOYQRereza3E1Ji3-m5V-b&s=0',
   
  },
  {
    id: 12,
    name: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1QveDnpij5CvvCgOpFRPMsBiIx28zkGKrkdxc&s=0',
   
  },
  {
    id: 13,
    name: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPeDKh7gXJhUiguYrSJm0T6DU6M6KODpiVIAGQ&s=0',
   
  },

  {
    id: 15,
    name: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYryWjAKgwrssMlSFXwN5oCj2Nw2Lgl9RbzlsjQFA&s',
  },
  {
    id: 16,
    name: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-VWDMaK6ExKrCUgO6w-Dsknzys82e0yMy0S-&s=0',
  },
  {
    id: 17,
    name: '',
    image:'https://seeklogo.com/images/D/doctor-medical-mk-logo-A197A7A78F-seeklogo.com.png',
  },

])

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
});

onBeforeUnmount(() => {
  clearInterval(animationInterval);
});
</script>

<style scoped>
@import '@/style/companies.css';
</style>
