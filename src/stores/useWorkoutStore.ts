import { workoutProgram } from '@/utils'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// types
type DefaultData = Record<number, Record<string, string>>

export const useWorkoutStore = defineStore(
  'workout',
  () => {
    // --STATE--

    const defaultData: DefaultData = Object.fromEntries(
      Object.entries(workoutProgram).map(([idx, workoutData]) => [
        Number(idx),
        Object.fromEntries(workoutData.workout.map((e) => [e.name, ''])),
      ]),
    )

    const selectedDisplay = ref<1 | 2 | 3>(1)
    const data = ref<DefaultData>({ ...defaultData })
    const selectedWorkout = ref<number>(-1)

    // --- GETTER (computed) ---

    const isWorkoutCompleted = computed(() => {
      const currentWorkout = data.value[selectedWorkout.value]

      if (!currentWorkout) return false // guard clause to exit function

      return Object.values(currentWorkout).every((ex) => !!ex) // return true if every value is true
    })

    const firstInCompleteWorkoutIdx = computed(() => {
      const allWorkouts = data.value

      if (!allWorkouts) return -1

      for (const [idx, workout] of Object.entries(allWorkouts)) {
        const isCompleted = Object.values(workout).every((ex) => !!ex)

        if (!isCompleted) return Number.parseInt(idx)
      }
      return -1
    })

    // --- ACTIONS (functions) ---
    function handleDisplay(idx: 1 | 2 | 3) {
      selectedDisplay.value = idx
    }

    function handleSelectedWorkout(idx: number) {
      selectedWorkout.value = idx
      selectedDisplay.value = 3
    }

    function handleSaveWorkout() {
      localStorage.setItem('workouts', JSON.stringify(data.value))

      // show the dashboard
      selectedDisplay.value = 2

      // deselected work out
      selectedWorkout.value = -1
    }

    function handleResetPlane() {
      selectedDisplay.value = 1

      selectedWorkout.value = -1
      data.value = { ...defaultData }
      localStorage.removeItem('workouts')
    }

    function loadFromStorage() {
      const store = localStorage.getItem('workouts')
      if (store) {
        data.value = JSON.parse(store)
      }
    }

    return {
      // state
      selectedDisplay,
      data,
      selectedWorkout,

      // getters
      isWorkoutCompleted,
      firstInCompleteWorkoutIdx,

      // actions
      handleDisplay,
      handleSelectedWorkout,
      handleSaveWorkout,
      handleResetPlane,
    }
  },

  {
    persist: {
      key: 'workout-store',

      storage: localStorage,
      pick: ['data'], // only persist workout data
    }, // THIS enables auto persistence
  },
)

// export function syncAcrossTabs() {
//   window.addEventListener('storage', (event) => {
//     if (event.key === 'workout-store') {
//       const newState = JSON.parse(event.newValue || '{}')

//       // IMPORTANT: patch instead of replace
//       $patch(newState)
//     }
//   })
// }
