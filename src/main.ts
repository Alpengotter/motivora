import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import lazyLoad from './directives/lazy-load'
import type { Router } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore'

import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import 'primeicons/primeicons.css';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router;
  }
}

const app = createApp(App)
const pinia = createPinia()
pinia.use(({store}) => {
  store.$router = markRaw(router)
})

app.use(pinia)
app.use(router)
app.use(createVuestic())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {

    }
  }
});

app.mount('#app')

app.directive('lazy-load', lazyLoad)

const authStore = useAuthStore()
