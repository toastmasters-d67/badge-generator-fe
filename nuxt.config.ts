// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  runtimeConfig: {
    public: {
      API_UPLOAD_URL: process.env.API_UPLOAD_URL,
      API_DOWNLOAD_URL: process.env.API_DOWNLOAD_URL
    }
  }
})