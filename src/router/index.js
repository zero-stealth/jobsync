import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ResetView from '@/views/ResetView.vue';
import SupportView from '@/views/SupportView.vue';
import PanelView from '@/views/PanelView.vue';
import PolicyView from '@/views/PolicyView.vue';
import DisclaimerView from '@/views/DisclaimerView.vue';
import TermsView from '@/views/TermsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import CompanyView from '@/views/CompanyView.vue'
import ApplyView from '@/views/ApplyView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: "JobSync Network - Home",
    }
  },
  {
    path: '/company/:id/:company',
    name: 'Company',
    component: CompanyView,
    meta: {
      title: "JobSync Network - Company",
    }
  },
  {
    path: '/company/apply/:job/',
    name: 'Apply',
    component: ApplyView,
    meta: {
      title: "JobSync Network - Apply",
    }
  },
  {
    path: '/reset-password',
    name: 'Reset',
    component: ResetView,
    meta: {
      title: "JobSync Network - Reset Password",
    }
  },
  {
    path: '/support',
    name: 'Support',
    component: SupportView,
    meta: {
      title: "JobSync Network - Support",
    }
  },
  {
    path: '/panel',
    name: 'Panel',
    component: PanelView,
    meta: {
      isAdmin: true,
      title: "JobSync Network - Admin Panel",
    }
  },
  {
    path: '/policy',
    name: 'Policy',
    component: PolicyView,
    meta: {
      title: "JobSync Network - Privacy Policy",
    }
  },
  {
    path: '/disclaimer',
    name: 'Disclaimer',
    component: DisclaimerView,
    meta: {
      title: "JobSync Network - Disclaimer",
    }
  },
  {
    path: '/terms',
    name: 'Terms',
    component: TermsView,
    meta: {
      title: "JobSync Network - Terms and Conditions",
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView,
    meta: {
      title: "404 - Page not found",
    }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const isAdmin = () => {
  const admin = localStorage.getItem('admin');
  return admin === 'true'; 
};

const dynamicTitleGuard = (to, from, next) => {
  document.title = to.meta.title || 'JobSync Network - Job Application Agency';
  next();
};

const adminGuard = (to, from, next) => {
  if (to.matched.some((record) => record.meta.isAdmin)) {
    if (isAdmin()) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
};

router.beforeEach(dynamicTitleGuard);
router.beforeEach(adminGuard);

export default router;
