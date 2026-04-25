<!-- <script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useCounterStore } from './stores/counter'
import { storeToRefs } from 'pinia'

const { count, numb, doubleCount } = storeToRefs(useCounterStore())
const { increment } = useCounterStore()

const handleClick = () => {
  increment()
  console.log(count.value, numb.value)
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper text-red-500 flex-col gap-2">
      <HelloWorld msg="You did it!" />
      <h1 class="my-5 bg-gray-100 flex-1">Here is the counter: {{ count }} _ {{ numb }}</h1>
      <h1 class="my-5 bg-gray-200 flex-1">Here is the counter: {{ doubleCount }}</h1>
      <button class="bg-gray-300 py-2 px-3 text-gray-900 my-5 flex-1" @click="handleClick()">
        Add
      </button>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import MainLayout from './components/layouts/MainLayout.vue'
import MainDashboard from './components/pages/MainDashboard.vue'
import MainWorkout from './components/pages/MainWorkout.vue'
import WelcomeView from './components/pages/WelcomeView.vue'
import { workoutProgram } from './utils'

export type Exercise = {
  name: string
  sets: number
  reps: number
}
export type WorkoutDay = {
  warmup: Exercise[]
  workout: Exercise[]
}
export type workoutProgram = Record<number, WorkoutDay>
export type DefaultData = Record<number, Record<string, string>>

function createDefaultData(): DefaultData {
  const defaultData: DefaultData = Object.fromEntries(
    Object.entries(workoutProgram).map(([idx, workoutData]) => [
      Number(idx),
      Object.fromEntries(workoutData.workout.map((e) => [e.name, ''])),
    ]),
  )
  return defaultData
}

// for (const [workoutIdx, workoutData] of Object.entries(workoutProgram)) {
//   const idx = Number(workoutIdx)
//   // create for loop where we iterate over every workout
//   defaultData[idx] = {} // Initialize the workout data obj

//   // Nested loop to loop every exercise within a workout, and initialize it's input value to an empty string
//   for (const e of workoutData.workout) {
//     defaultData[idx][e.name ] = ''
//   }
// }

const selectedDisplay = ref<1 | 2 | 3>(1)
const data = ref<DefaultData>(createDefaultData()) // {1.....30: {exercise_name: '', ....}}
const selectedWorkout = ref<number>(-1)

const isWorkoutCompleted = computed(() => {
  const currentWorkout = data.value[selectedWorkout.value]
  if (!currentWorkout) {
    return false
  } // guard clause to exit function
  const isCompleted = Object.values(currentWorkout).every((ex) => {
    return !!ex
  })
  console.log('isCompleted: ', isCompleted)
  return isCompleted
})

const firstIncompleteWorkoutIdx = computed(() => {
  const allWorkouts = data.value

  if (!allWorkouts) return -1

  // Loop over every key value pair, and check if the workout is completed or not
  for (const [idx, workout] of Object.entries(allWorkouts)) {
    const isCompleted = Object.values(workout).every((ex) => !!ex)

    if (!isCompleted) {
      return Number.parseInt(idx)
    }
  }

  return -1 // if loop completes, it means all workouts are completed
})

function handleDisplay(idx: 1 | 2 | 3) {
  selectedDisplay.value = idx
}

function handleSelectedWorkout(idx: number) {
  selectedWorkout.value = idx
  selectedDisplay.value = 3
}

function handleSaveWorkout() {
  // Save the current data snapshot to the localstorage so that we can retrieve it in the next time
  localStorage.setItem('workouts', JSON.stringify(data.value))

  // show the dashboard
  selectedDisplay.value = 2

  // deselected work out
  selectedWorkout.value = -1
}

function handleResetPlan() {
  selectedDisplay.value = 1
  selectedWorkout.value = -1
  data.value = createDefaultData()
  localStorage.removeItem('workouts')
}

onMounted(() => {
  if (!localStorage) return
  if (localStorage.getItem('workouts')) {
    // Only enter the if block only we find some data saved to the key workouts in the localStorage database
    const saveData = JSON.parse(localStorage.getItem('workouts')!)
    data.value = saveData
    selectedDisplay.value = 2 // if they have data, we don't want them loading on the welcome screen every time they enter the app
  }
})
</script>

<template>
  <MainLayout>
    <!-- PAGE 1 -->
    <WelcomeView :handle-change-display="handleDisplay" v-if="selectedDisplay == 1" />
    <!-- PAGE 2 -->
    <MainDashboard
      :first-incomplete-workout-idx="firstIncompleteWorkoutIdx"
      :handle-reset-plan="handleResetPlan"
      :handleSelectedWorkout="handleSelectedWorkout"
      :selected-workout="selectedWorkout"
      v-if="selectedDisplay == 2"
    />
    <!-- PAGE 3 -->
    <MainWorkout
      :handle-save-workout="handleSaveWorkout"
      :is-workout-complete="isWorkoutCompleted"
      :data="data"
      :selected-workout="selectedWorkout"
      v-if="workoutProgram?.[selectedWorkout as keyof typeof workoutProgram]"
    />
  </MainLayout>
</template>

<style scoped></style>
