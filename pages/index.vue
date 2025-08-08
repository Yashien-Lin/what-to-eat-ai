<template>
  <div class="min-h-screen p-4 mx-auto bg-gray-200 h-100">
    <!-- 中英切換按鈕 -->
    <div class="text-right">
      <div class="inline-flex overflow-hidden text-sm border border-purple-600 rounded-full">
        <button
          @click="toggleLang('zh')"
          :class="[
            'w-[60px] px-4 py-1 transition',
            language === 'zh'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          ]"
        >
          中文
        </button>
        <button
          @click="toggleLang('en')"
          :class="[
            'w-[60px] px-4 py-1 transition',
            language === 'en'
              ? 'bg-purple-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          ]"
        >
          EN
        </button>
      </div>
    </div>

    <div class="max-w-2xl p-6 mx-auto">
      <h1 class="mb-6 text-2xl font-bold text-center">🍲{{ data[language].title }}</h1>

      <!-- Step 1: 時段選擇 -->
      <div class="mb-6">
        <h2 class="mb-1 text-lg font-semibold text-center text-gray-800">
          {{ data[language].subTitles.meal }}
        </h2>
        <div class="flex flex-wrap justify-center gap-3">
          <button v-for="option in data[language].meals" :key="option" @click="selected.meal = option" :class="buttonClass(option, selected.meal)">
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Step 2: 場景選擇 -->
      <div class="mb-6">
        <h2 class="mb-1 text-lg font-semibold text-center text-gray-800">
          {{ data[language].subTitles.scene }}
        </h2>
        <div class="flex flex-wrap justify-center gap-3">
          <button v-for="option in data[language].scenes" :key="option" @click="selected.scene = option" :class="buttonClass(option, selected.scene)" >
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Step 3: 偏好選擇 -->
      <div class="p-4 border rounded-lg bg-amber-50 border-amber-200">
        <h2 class="mb-3 text-lg font-semibold text-center text-gray-800">
          {{ data[language].subTitles.preference }}
        </h2>
        <div class="flex flex-wrap justify-center gap-2">
          <button
            v-for="option in data[language].preferences"
            :key="option"
            @click="togglePreference(option)"
            :class="[
              'btn-small',
              selected.preferences.includes(option) && 'btn-small--selected'
            ]"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>
  
  <!-- 送出按鈕 -->
  <div class="my-5 text-center">
    <button
      class="px-6 py-3 text-white transition bg-purple-800 rounded-full hover:bg-purple-900"
      @click="getRecommendation"
      :disabled="loading"
    >
      🤖 {{ data[language].submit }}
    </button>
  </div>

  <div v-if="loading" class="flex flex-col items-center my-6 space-y-4">
    <!-- 鍋子動畫 -->
    <div v-if="selected.scene === '自己煮' || selected.scene === 'Home Cooking'" class="flex items-center space-x-2">
      <svg class="mb-2 w-9 h-9 animate-pot-swing" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 512 512" xml:space="preserve">
        <path style="fill:#D19B3F;" d="M478.261,261.244c0,9.209-7.463,16.676-16.67,16.676h-5.556v11.117H55.964v-11.117h-5.556
          c-9.206,0-16.67-7.466-16.67-16.676s7.463-16.676,16.67-16.676h250.359c-0.201-1.825-0.314-3.679-0.314-5.559
          c0-27.628,22.39-50.026,50.009-50.026s50.009,22.397,50.009,50.026c0,1.88-0.112,3.732-0.314,5.559h61.437
          C470.798,244.569,478.261,252.034,478.261,261.244z M444.922,155.635c-18.412,0-33.339,14.933-33.339,33.35
          c0,18.419,14.927,33.35,33.339,33.35c18.409,0,33.339-14.931,33.339-33.35C478.261,170.567,463.331,155.635,444.922,155.635z
          M417.14,88.934c9.205,0,16.67-7.466,16.67-16.675c0-9.209-7.465-16.676-16.67-16.676c-9.206,0-16.67,7.466-16.67,16.676
          C400.47,81.468,407.934,88.934,417.14,88.934z M461.592,33.35c9.205,0,16.67-7.466,16.67-16.676C478.261,7.466,470.796,0,461.592,0
          c-9.206,0-16.67,7.466-16.67,16.676C444.922,25.884,452.387,33.35,461.592,33.35z"/>
        <path style="fill:#E9B84C;" d="M389.357,233.452c0,12.279-9.951,22.233-22.226,22.233c-12.275,0-22.226-9.954-22.226-22.233
          s9.951-22.233,22.226-22.233C379.406,211.219,389.357,221.173,389.357,233.452z M450.479,166.752c-9.206,0-16.67,7.466-16.67,16.676
          s7.464,16.674,16.67,16.674c9.205,0,16.67-7.466,16.67-16.674C467.149,174.218,459.684,166.752,450.479,166.752L450.479,166.752z"/>
        <path style="fill:#8C9096;" d="M5.565,345.218v15.718c0,19.38,15.761,35.148,35.133,35.148h15.265v72.669
          c0,23.787,19.455,43.246,43.233,43.246h313.608c23.779,0,43.232-19.46,43.232-43.246v-72.669H471.3
          c19.374,0,35.134-15.767,35.134-35.148v-15.718c0-19.38-15.762-35.148-35.134-35.148h-15.264v-43.268H55.964v43.268H40.698
          C21.326,310.071,5.565,325.838,5.565,345.218z M456.036,373.85v-41.547H471.3c7.118,0,12.909,5.793,12.909,12.914v15.718
          c0,7.12-5.791,12.914-12.909,12.914h-15.264V373.85z M27.792,345.218c0-7.12,5.79-12.914,12.908-12.914h15.264v41.547H40.698
          c-7.117,0-12.908-5.793-12.908-12.914v-15.72H27.792z"/>
        <g>
          <path style="fill:#4D515A;" d="M5.565,345.218v15.718c0,19.38,15.761,35.148,35.133,35.148h15.265v72.669
            c0,23.787,19.455,43.246,43.233,43.246h313.608c23.779,0,43.232-19.46,43.232-43.246v-72.669H471.3
            c19.374,0,35.134-15.767,35.134-35.148v-15.718c0-19.38-15.762-35.148-35.134-35.148h-15.264v-43.268H189.321V444.67
            c0,12.279-9.951,22.233-22.226,22.233h-44.453c-12.276,0-22.226-9.954-22.226-22.233V266.802H55.964v43.268H40.698
            C21.326,310.071,5.565,325.838,5.565,345.218z M456.036,332.305H471.3c7.118,0,12.909,5.793,12.909,12.914v15.718
            c0,7.12-5.791,12.914-12.909,12.914h-15.264V332.305z M27.792,345.218c0-7.12,5.79-12.914,12.908-12.914h15.264v41.547H40.698
            c-7.117,0-12.908-5.793-12.908-12.914v-15.72H27.792z"/>
          <path style="fill:#4D515A;" d="M456.979,117.064c-1.412-5.975-7.401-9.675-13.371-8.261l-144.303,34.129l-2.971-12.57
            c-4.458-18.861-23.424-30.575-42.278-26.115l-15.289,3.616c-9.109,2.155-16.846,7.748-21.787,15.752
            c-4.941,8.003-6.476,17.428-4.323,26.537l2.97,12.57L71.323,196.854c-5.974,1.412-9.67,7.402-8.258,13.377
            c1.209,5.114,5.77,8.562,10.805,8.562c0.846,0,1.706-0.098,2.566-0.302l372.285-88.05
            C454.695,129.027,458.391,123.039,456.979,117.064z M234.287,145.038c-0.788-3.33-0.218-6.79,1.604-9.739
            c1.822-2.951,4.659-5.009,7.991-5.797l15.29-3.616c6.924-1.638,13.894,2.666,15.534,9.596l2.971,12.568l-40.418,9.56
            L234.287,145.038z"/>
        </g>
      </svg>
      <span class="font-semibold select-none text-md text-slate-800">
        {{ data[language].makingRecipe }}
      </span>
    </div>
    <!-- 雷達動畫 -->
    <div v-if="selected.scene === '外面吃' || selected.scene === 'Dining Out'" class="flex items-center justify-center my-2 text-lg font-semibold text-slate-600">
      <svg
        class="w-6 h-6 mr-4 animate-ping"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke-opacity="0.7" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" stroke-opacity="0.7" />
      </svg>
      <span class="font-semibold select-none text-md text-slate-800">{{ data[language].searchingMeals }}</span>
    </div>

    <!-- 進度條 -->
    <div class="relative w-3/4 h-2 my-8 overflow-hidden bg-gray-300 rounded-full">
      <div class="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-purple-400 via-purple-700 to-purple-400 animate-marquee"></div>
    </div>
  </div>


  <!-- 分隔線 -->
  <hr v-if="!loading && recipeList.length > 0" class="my-8 border-t-2 border-purple-200" />

  <!-- 顯示食譜清單 -->
  <div v-if="recipeList.length > 0" class="max-w-3xl mx-auto mb-8 space-y-6">
    <h3 class="text-xl font-bold text-center text-slate-800">🍽️ {{ data[language].recipeTitle }}</h3>

    <!-- 單欄卡片 -->
    <div
      v-for="(recipe, index) in recipeList"
      :key="index"
      class="w-full p-4 bg-white border shadow-sm rounded-xl"
    >
      <!-- 食譜標題 -->
      <h4 class="mb-2 text-lg font-semibold text-gray-800">🍳 {{ recipe.name }}</h4>

      <!-- 推薦理由 -->
      <p class="mb-3 text-sm text-gray-600">
        💡 <strong>推薦理由：</strong> {{ recipe.reason || '無提供' }}
      </p>

      <!-- 食材清單 -->
      <p class="mb-3 text-sm text-gray-700">
        🛒 <strong>食材：</strong> {{ recipe.ingredients.join('、') }}
      </p>

      <!-- 步驟說明 -->
      <div>
        <p class="mb-1 text-sm font-medium text-gray-700">👨‍🍳 <strong>做法：</strong></p>
        <ol class="pl-4 space-y-1 text-sm text-gray-700 list-decimal">
          <li v-for="(step, i) in recipe.steps" :key="i">{{ step }}</li>
        </ol>
      </div>
    </div>
  </div>
    
  <div v-if="nearbyPlaces.length" class="p-5 mt-6 bg-white border rounded-lg">
    <h3 class="mb-5 text-xl font-bold text-center text-slate-800">🎯 {{ data[language].mealsTitle }}</h3>
    <GooglePlaceCard :places="nearbyPlaces" :language="language" />
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref({
  meal: '',
  scene: '',
  preferences: []
})

// i18n
const language = ref('zh')  // 預設中文
const data = {
  zh: {
    title: '今天吃什麼？',
    subTitles: {
      meal: '請選擇用餐時段',
      scene: '你打算在哪裡用餐？',
      preference: '請勾選飲食偏好（可複選）'
    },
    mealTitle: '請選擇用餐時段',
    meals: ['早餐', '午餐', '晚餐', '宵夜'],
    scenes: ['自己煮', '外面吃'],
    preferences: [
      '不吃辣', '不吃海鮮', '素食',
      '不吃澱粉', '低碳', '清爽', '重口味',
      '熱食', '冷食', '需含肉', '需含菜', '需含蛋白質',
      '飯類', '麵類', '醬汁類', '甜食', '點心',
      '小吃', '便當', '餐廳', 
      '中式料理', '西式料理', '日式料理', '韓式料理', '東南亞料理', 
    ],
    submit: '來點美味的吧，AI！',
    makingRecipe: ' AI 正在為您客製專屬菜單...',
    recipeTitle: '專屬你的美味上桌囉！',
    searchingMeals: 'AI 美食雷達偵測中...',
    mealsTitle: 'AI 為您精選推薦 ！'
  },
  en: {
    title: 'What to Eat Today?',
    subTitles: {
      meal: 'Select a Meal Time',
      scene: 'Where Are You Eating?',
      preference: 'Select Your Food Preferences (Multiple Select)'
    },
    mealTitle: 'Nearby Eats from AI',    
    meals: ['Breakfast', 'Lunch', 'Dinner', 'Midnight Snack'],
    scenes: ['Home Cooking', 'Dining Out'],
    preferences: [
      'No spicy food', 'No seafood', 'Vegetarian',
      'No carbs', 'Low carbs', 'Light', 'Strong flavor',
      'Hot food', 'Cold food', 'Must contain meat', 'Must contain vegetables', 'Must contain protein',
      'Rice dishes', 'Noodle dishes', 'Saucy dishes', 'Desserts', 'Snacks',
      'Street food', 'Bento', 'Restaurant',
      'Chinese cuisine', 'Western cuisine', 'Japanese cuisine', 'Korean cuisine', 'Southeast Asian cuisine',
    ],
    submit: 'Feed Me, AI!',
    makingRecipe: 'Cooking up your custom menu...',
    recipeTitle: 'Dishes Cooked Just for You!',
    searchingMeals: 'Looking for tasty bites nearby...',
    mealsTitle: 'Handpicked by AI – Delish Inside!'
  }
}

// 切換語言
function toggleLang(lan) {
  language.value = lan
}

function togglePreference(pref) {
  const index = selected.value.preferences.indexOf(pref)
  if (index >= 0) {
    selected.value.preferences.splice(index, 1)
  } else {
    selected.value.preferences.push(pref)
  }
}

function buttonClass(option, current) {
  return [
    'px-4 py-2 rounded-full border',
    'transition',
    option === current ? 'bg-purple-500 text-white border-purple-600' : 'bg-gray-100 text-gray-800 border-purple-300'
  ]
}


const loading = ref(false)
const recipeList = ref([])

const getRecommendation = async () => {
  if (selected.value.scene === '') {
    language.value === 'zh' 
    ? alert('請先選擇你打算在哪裡用餐')
    : alert('Please select where you plan to dine first')
    return
  }

  loading.value = true
  recipeList.value = []

  // 判斷選擇場景
  const scene = selected.value.scene
  const isHome = scene === '自己煮' || scene === 'Home Cooking'
  const isOut = scene === '外面吃' || scene === 'Dining Out'

  if (isHome) {
    // 呼叫推薦餐點 API
    const data = await $fetch('/api/recommend', {
      method: 'POST',
      body: {
        meal: selected.value.meal,
        scene,
        preferences: selected.value.preferences,
        language: language.value
      }
    })
    recipeList.value = data;
    loading.value = false
  
  } else if (isOut) {
    await getNearbyRestaurants(); // 呼叫附近地點 API
  } 
}

// 取得使用者位置
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        resolve({ lat, lng })
      },
      (err) => reject(err)
    )
  })
}

// 呼叫google api，取得定位及附近餐廳
const nearbyPlaces = ref([])
const getNearbyRestaurants = async () => {
  const { lat, lng } = await getUserLocation()

  const keyword = `${selected.value.meal} ${selected.value.scene} ${selected.value.preferences.join(' ')}`
  console.log('google: ', keyword);

  const res = await $fetch('/api/google', {
    method: 'POST',
    body: { lat, lng, keyword, language: language.value }
  })
  
  console.log('google recipeList: ', res);

  nearbyPlaces.value = res.results || []
  loading.value = false
}



</script>

<style lang="scss" scoped>

// 鍋子動畫
@keyframes pot-swing {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(25deg);
  }
  50% {
    transform: rotate(-25deg);
  }
  75% {
    transform: rotate(25deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

// 雷達動畫
.animate-pot-swing {
  animation: pot-swing 1s ease-in-out infinite;
  transform-origin: center;
}

// 進度條動畫 
@keyframes marquee {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-marquee {
  animation: marquee 2s linear infinite;
}


</style>