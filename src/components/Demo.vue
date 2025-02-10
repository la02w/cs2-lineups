<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 p-8">
    <h1 class="text-4xl font-bold text-center mb-8 text-blue-500">
      CSGO Lineups Guide
    </h1>

    <div class="max-w-162 mx-auto bg-gray-800 rounded-lg p-6 shadow-xl">
      <h2 class="text-2xl font-semibold mb-4 text-center">Mirage</h2>
      <div
        class="mb-6 border-2 border-gray-700 h-150 w-150 bg-cover rounded-lg overflow-hidden relative"
        style="background-image: url('/src/assets/d e_mirage_radar.png')"
      >
        <img
          v-for="(i, index) in data"
          :id="i.name"
          :key="index"
          :src="smokeICON"
          class="absolute w-5 h-5 bg-gray-700 rounded-full z-10 translate-[-50%] hover:bg-gray-200"
          :class="[i.end]"
          @click="showLineups(i.name)"
        />
        <div v-for="(i, index) in data" :key="index" :id="i.name">
          <div v-for="(i1, index1) in i.start" :key="index1">
            <div
              class="absolute h-[2px] z-0 bg-blue-500 origin-[0_0]"
              :class="['w-[290px] rotate-[-12deg]', i.end]"
            ></div>
            <div
              :id="i.name + '-' + index1"
              class="absolute w-3 h-3 translate-[-50%] z-10 bg-yellow-300 rounded-full"
              :class="[i1.marker]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const smokeICON =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeGVYSWZNTQAqAAAACAAEARoABQAAAAEAAAA+ARsABQAAAAEAAABGASgAAwAAAAEAAgAAh2kABAAAAAEAAABOAAAAAAAAASAAAAABAAABIAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUaADAAQAAAABAAAAUQAAAAAel8ReAAAACXBIWXMAACxLAAAsSwGlPZapAAAEqklEQVR4Ae2cSYxMQRyHjW3EvgcziNjFHjNImKPEQTg4SAiJi7g7u+LgKLEcRCIktpMDiTiJRBCDwQhGxhiJNZZBjGV8v8nraFM9na7X3a/edP7/5Mt7qquqq76uevW20a+fhRkwA2bADJgBM2AGzIAZMANmwAyYATNQUQa6urrq4TzUpqVjA9PSEKTU0JZ87fnG551wENbAVTgEFjKAwAZ4Dx15eM1nNyAT19kZZAYjA8g4lTHjse0kr0akBSIWw1cPedlZj6TBYP8UNKKDNuyBDzHasgGjk2OUq7wiiKiGtuwh5rG/O7SRNIxEORgCVTFlbEF4vlU9ZrWFF0uLxMJb7OZcTdJyNzm5lLRI/EmXu2J2W6c5O2KWLUmx4BKZikPpyULQlI4bm6hnQtzCxZaLexyK/b10dhyF18EiWAZzYDyMhGJiV1VV1dFiKugzZZGo695yxDUqDbLAhJjOC8r0i9dTr0Z24hFC4q8S9/I09alOLTDbSlx3QdWFkFhQwzwynSDvxSj/Zqa0jq+JRiVI/I6xvfAVpsBGSDQqQWI1q/J9rB2OzCU+pUNI/ENn2+Fj1Ok4G52Yq44vkOnDfvZbQaMx0QhxSiAB26ENloDOF7WyzoKpUA094x0Jr+Au3IQH0b7ucnefpDMa33E8VLrOOxONEBLVwU46/YStOKcEBIxiI5HzYRVMgiaQtGZopcx/KztlNKqzI/GLB315KInOdTKCPtGe2xEn1bgCIoi0nu0KIXEAjdjHKLrM9iFoUWhHolbZXoP8EqZLQ01XjdYVsB7OQNAIIVEdXhuh/Q7QDVkd7+6BRqPE6umeFgkdNyVsKcwD3WgYDJn4ndkJtQ0lMbu/w/mHRpbYEn2ghUTTuxZyLTRRtnRs0iAxl4nxJIo+EZlzrD7R2LQ2stIkOqt+EuIrTWISzpzvMImOEv8Ek+jvzClhEh0l/gkm0d+ZU8IkOkr8E0yivzOnhEl0lPgnmER/Z04Jk+go8U8wif7OnBIm0VHin2AS/Z05JUyio8Q/IcRNWd3OvwB6L1EvN+nutc+PqTcdWkCPE/TIIEQf+Np/EaoB+3kwdZPnKhNpyjSoAwlZCHpMMBr0YEpv0L6ARxE32DbCG8p/ofwx9vUiU9AIJbG744h4Q+/FLVlAitLHgmRKsJ4GPiffZ7a5wmcE5ypfkrQQEjXCahA2GDmd2b3g3xp5ryOyP3L2KT+GRI3YIHezsxsUQqKeOx+HJkQ8ZqtRqCnagkS9X+ME+XT81LSfCXo7Qn8tMBtmwREIGiEkauQMg5UR2yMD7ch6xr4WDInVNJ8LkrYAZsAIyBeqO/EpHkJibxJq+EA09JYhXzo/gPqilV7v7SQaif9qZezddOrW2xJXyvgdOauuJIl6T+cUXMrZ0zImpmk6F9VNFqU7VLC1qEpiFg4xEnWKU8oodX3ebQsh8Yd3K/MX+O9cM3/WCvmUVXQJ6K+q9N8PFBN3KLwTUv/WWNl+OjpfBwegGX5AIfGWTGdBf+Osc81URPDjCTJ0NbI4QifXujLJCNJU1WXgU9BNiEYWkJdsLcyAGTADZsAMmAEzYAbMgBkwA2bADJiBPmTgLyNSrUGA2OBuAAAAAElFTkSuQmCC'

const data = [
  {
    name: 'vip',
    end: 'top-[46%] left-[40%]',
    start: [
      {
        marker: 'top-[36%] left-[88%]',
        line: 'w-[290px] rotate-[-12deg]',
      },
      {
        marker: 'top-[48.50%] left-[54.00%]',
        line: 'w-[85px] rotate-[9deg]',
      },
    ],
  },
]
// 处理点击事件
// const handleClick = (event: MouseEvent) => {
//   const container = event.currentTarget as HTMLElement
//   const containerWidth = container.offsetWidth
//   const containerHeight = container.offsetHeight

//   const clickX = event.offsetX
//   const clickY = event.offsetY

//   const percentLeft = (clickX / containerWidth) * 100
//   const percentTop = (clickY / containerHeight) * 100

//   // 输出百分比值（可选）
//   console.log('Left Percentage:', percentLeft.toFixed(2) + '%')
//   console.log('Top Percentage:', percentTop.toFixed(2) + '%')
// }

const showLineups = (name: string) => {
  const id = name
  const element = document.getElementById(id)
  element?.classList.toggle('hidden')
}
</script>
