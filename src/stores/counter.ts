import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  let numb = 0
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
    numb++
  }

  return { count, doubleCount, increment, numb }
})
