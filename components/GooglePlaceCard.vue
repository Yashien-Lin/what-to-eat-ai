<template>
  <div
    v-for="restaurant in restaurants"
    :key="restaurant.place_id"
    class="flex items-center p-3 mb-4 transition bg-purple-100 border-purple-300 rounded-lg shadow cursor-pointer hover:shadow-md hover:bg-purple-200"
    @click="openMap(restaurant.mapUrl)"
  >
    <img
      v-if="restaurant.photos && restaurant.photos.length"
      :src="getPhotoUrl(restaurant.photos[0].photo_reference)"
      alt="restaurant photo"
      class="object-cover w-16 h-16 mr-3 rounded"
    />
    <div
      v-else
      class="flex items-center justify-center w-16 h-16 mr-3 text-sm text-gray-400 bg-gray-200 rounded"
    >
      No Image
    </div>
    <div class="flex-1 overflow-hidden">
      <h3 class="text-sm font-semibold text-gray-800 truncate">{{ restaurant.name }}</h3>
      <p class="text-xs text-gray-500 truncate">{{ restaurant.address }}</p>
      <a
        :href="restaurant.mapUrl"
        target="_blank"
        class="inline-block mt-1 text-sm font-bold text-purple-600"
        @click.stop
      >
        {{ language === 'zh' ? '🗺️ 查看地圖' : '🗺️ View Map' }}
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  restaurants: {
    type: Array,
    required: true,
  },
  language: {
    type: String,
    default: "zh",
  }
})

function getPhotoUrl(photoRef, maxWidth = 200) {
  const config = useRuntimeConfig();
  const apiKey = config.public.googleApiKey;

  const thumbnailUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoRef}&key=${apiKey}`
  return thumbnailUrl;
}

function openMap(url) {
  window.open(url, '_blank')
}
</script>
