import { defineNuxtConfig } from "nuxt/config";


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '../assets/css/global.css',
  ],
  modules: ['@element-plus/nuxt'],
})
