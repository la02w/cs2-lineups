<template>
  <div class="flex gap-2 dark:bg-gray-900 transition-colors duration-300">
    <!-- 左侧地图容器 -->
    <div
      class="h-screen min-w-[100vh] bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors duration-300"
    >
      <div
        class="border-2 border-gray-300 dark:border-gray-600 rounded-lg h-full bg-contain bg-no-repeat overflow-hidden relative transition-colors duration-300"
        :style="{ backgroundImage: `url(${maps[selectedMap]})` }"
        @click="getCoordinate"
      >
        <img
          v-for="(item, index) in map[selectedMap]"
          :key="index"
          :src="smokeICON"
          :style="{ left: item.end.x, top: item.end.y }"
          class="absolute w-5 h-5 bg-gray-400 rounded-full z-10 translate-[-50%]"
          @click="showLineups(item.name)"
          @click.stop
        />
        <div
          v-for="(item, index) in map[selectedMap]"
          :key="index"
          :id="item.name"
          class="hidden"
        >
          <div v-for="(i, idx) in item.start" :key="idx">
            <div
              :style="{ left: i.marker.x, top: i.marker.y }"
              class="absolute w-3 h-3 translate-[-50%] z-10 bg-yellow-300 rounded-full group"
              @click="TutorialData = i"
              @click.stop
            >
              <div
                class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded-lg w-auto text-nowrap"
              >
                {{ i.desc }}
              </div>
            </div>
            <svg class="absolute top-0 left-0 h-full w-full z-0">
              <line
                :x1="item.end.x"
                :y1="item.end.y"
                :x2="i.marker.x"
                :y2="i.marker.y"
                stroke="blue"
                stroke-width="2"
              />
            </svg>
          </div>
        </div>
        <div
          :style="{
            left: newMarkerX ? newMarkerX : '',
            top: newMarkerY ? newMarkerY : '',
          }"
          id="newMarker"
          class="absolute hidden w-2 h-2 translate-[-50%] z-10 bg-red-300 rounded-full group"
        ></div>
        <div class="absolute right-2 top-2 rounded-lg text-black bg-white">
          <select v-model="selectedMap" @click.stop class="focus:outline-none">
            <option value="ancient">远古遗迹</option>
            <option value="anubis">阿努比斯</option>
            <option value="dust2">炙热沙城2</option>
            <option value="inferno">炼狱小镇</option>
            <option value="mirage">荒漠迷城</option>
            <option value="nuke">核子危机</option>
            <option value="train">列车停放站</option>
          </select>
        </div>
      </div>
    </div>
    <!-- 右侧教程面板-->
    <div
      id="tutorial"
      class="w-full h-screen min-w-[100vh] p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 overflow-auto myscrollbar text-black dark:text-white/75"
    >
      <div class="flex gap-5 text-black dark:text-white/75 relative">
        <button
          @click="showInput"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg active:scale-95"
        >
          ➕ 添加新道具
        </button>
        <div id="markInput" class="space-x-3 hidden">
          <input
            v-model="newMarkerX"
            class="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="X 坐标"
          />
          <input
            v-model="newMarkerY"
            class="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Y 坐标"
          />
          <input
            v-model="newMarkerDesc"
            class="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="道具描述"
          />
        </div>
        <!-- 主题切换按钮 -->
        <button
          @click="toggleDarkMode"
          class="absolute top-1 right-4 p-1 hover:scale-105 transition-transform"
        >
          <span v-if="!darkMode">🌙</span>
          <span v-else>☀️</span>
        </button>
      </div>
      <div id="newMarkerData" class="hidden">
        {{
          `
{
  marker: { x: '${newMarkerX}', y: '${newMarkerY}' },
  desc: '${newMarkerDesc}',
  image: [''],
},
          `
        }}
      </div>
      <Tutorial
        :itemName="TutorialData ? TutorialData.desc : ''"
        :itemImage="TutorialData ? TutorialData.image : ['']"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Tutorial from '@/components/Tutorial.vue'
import type { Start } from '@/maps/types'
import { map, maps } from '@/maps/types'
import { getDarkMode } from '@/utils/index'

const darkMode = ref(getDarkMode())

const smokeICON =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeGVYSWZNTQAqAAAACAAEARoABQAAAAEAAAA+ARsABQAAAAEAAABGASgAAwAAAAEAAgAAh2kABAAAAAEAAABOAAAAAAAAASAAAAABAAABIAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUaADAAQAAAABAAAAUQAAAAAel8ReAAAACXBIWXMAACxLAAAsSwGlPZapAAAEqklEQVR4Ae2cSYxMQRyHjW3EvgcziNjFHjNImKPEQTg4SAiJi7g7u+LgKLEcRCIktpMDiTiJRBCDwQhGxhiJNZZBjGV8v8nraFM9na7X3a/edP7/5Mt7qquqq76uevW20a+fhRkwA2bADJgBM2AGzIAZMANmwAyYATNQUQa6urrq4TzUpqVjA9PSEKTU0JZ87fnG551wENbAVTgEFjKAwAZ4Dx15eM1nNyAT19kZZAYjA8g4lTHjse0kr0akBSIWw1cPedlZj6TBYP8UNKKDNuyBDzHasgGjk2OUq7wiiKiGtuwh5rG/O7SRNIxEORgCVTFlbEF4vlU9ZrWFF0uLxMJb7OZcTdJyNzm5lLRI/EmXu2J2W6c5O2KWLUmx4BKZikPpyULQlI4bm6hnQtzCxZaLexyK/b10dhyF18EiWAZzYDyMhGJiV1VV1dFiKugzZZGo695yxDUqDbLAhJjOC8r0i9dTr0Z24hFC4q8S9/I09alOLTDbSlx3QdWFkFhQwzwynSDvxSj/Zqa0jq+JRiVI/I6xvfAVpsBGSDQqQWI1q/J9rB2OzCU+pUNI/ENn2+Fj1Ok4G52Yq44vkOnDfvZbQaMx0QhxSiAB26ENloDOF7WyzoKpUA094x0Jr+Au3IQH0b7ucnefpDMa33E8VLrOOxONEBLVwU46/YStOKcEBIxiI5HzYRVMgiaQtGZopcx/KztlNKqzI/GLB315KInOdTKCPtGe2xEn1bgCIoi0nu0KIXEAjdjHKLrM9iFoUWhHolbZXoP8EqZLQ01XjdYVsB7OQNAIIVEdXhuh/Q7QDVkd7+6BRqPE6umeFgkdNyVsKcwD3WgYDJn4ndkJtQ0lMbu/w/mHRpbYEn2ghUTTuxZyLTRRtnRs0iAxl4nxJIo+EZlzrD7R2LQ2stIkOqt+EuIrTWISzpzvMImOEv8Ek+jvzClhEh0l/gkm0d+ZU8IkOkr8E0yivzOnhEl0lPgnmER/Z04Jk+go8U8wif7OnBIm0VHin2AS/Z05JUyio8Q/IcRNWd3OvwB6L1EvN+nutc+PqTcdWkCPE/TIIEQf+Np/EaoB+3kwdZPnKhNpyjSoAwlZCHpMMBr0YEpv0L6ARxE32DbCG8p/ofwx9vUiU9AIJbG744h4Q+/FLVlAitLHgmRKsJ4GPiffZ7a5wmcE5ypfkrQQEjXCahA2GDmd2b3g3xp5ryOyP3L2KT+GRI3YIHezsxsUQqKeOx+HJkQ8ZqtRqCnagkS9X+ME+XT81LSfCXo7Qn8tMBtmwREIGiEkauQMg5UR2yMD7ch6xr4WDInVNJ8LkrYAZsAIyBeqO/EpHkJibxJq+EA09JYhXzo/gPqilV7v7SQaif9qZezddOrW2xJXyvgdOauuJIl6T+cUXMrZ0zImpmk6F9VNFqU7VLC1qEpiFg4xEnWKU8oodX3ebQsh8Yd3K/MX+O9cM3/WCvmUVXQJ6K+q9N8PFBN3KLwTUv/WWNl+OjpfBwegGX5AIfGWTGdBf+Osc81URPDjCTJ0NbI4QifXujLJCNJU1WXgU9BNiEYWkJdsLcyAGTADZsAMmAEzYAbMgBkwA2bADJiBPmTgLyNSrUGA2OBuAAAAAElFTkSuQmCC'

const selectedMap = ref('mirage')
const TutorialData = ref<Start | null>(null)
const newMarkerX = ref<string | null>(null)
const newMarkerY = ref<string | null>(null)
const newMarkerDesc = ref<string | null>(null)

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  document.body.classList.toggle('dark')
}

const showInput = () => {
  const markInput = document.getElementById('markInput') as HTMLElement
  const newMarker = document.getElementById('newMarker') as HTMLElement
  const newMarkerData = document.getElementById('newMarkerData') as HTMLElement
  markInput.classList.toggle('hidden')
  newMarker.classList.toggle('hidden')
  newMarkerData.classList.toggle('hidden')
}

const getCoordinate = (event: MouseEvent) => {
  if (document.getElementById('newMarker')?.classList.contains('hidden')) {
    return
  } else {
    const container = event.currentTarget as HTMLElement
    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight

    const clickX = event.offsetX
    const clickY = event.offsetY

    const percentLeft = (clickX / containerWidth) * 100
    const percentTop = (clickY / containerHeight) * 100
    newMarkerX.value = percentLeft.toFixed(2) + '%'
    newMarkerY.value = percentTop.toFixed(2) + '%'
  }
}
const showLineups = (id: string) => {
  document.getElementById(id)?.classList.toggle('hidden')
}
</script>
