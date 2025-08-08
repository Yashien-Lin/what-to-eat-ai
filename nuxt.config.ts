// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY, // 僅 server 可用
    googleApiKey: process.env.GOOGLE_API_KEY, // 私密的，只會在後端用
    public: {
      googleApiKey: process.env.GOOGLE_API_KEY, // 公開的，可以在前端使用（放在 public 物件裡）
    },
  },
  css: ['@/assets/css/tailwind.scss'],
})