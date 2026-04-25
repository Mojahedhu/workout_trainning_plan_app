<script lang="ts" setup>
import { workoutProgram } from '@/utils'

defineProps<{
  handleSelectedWorkout: (idx: number) => void
  firstIncompleteWorkoutIdx: number
  handleResetPlan: () => void
}>()

const workoutTypes = ['Push', 'Pull', 'Legs']
</script>

<template>
  <section id="grid" class="grid grid-cols-3 gap-4 sm:grid-cols-4 flex-1">
    <button
      :disabled="workoutIdx > 0 && workoutIdx > firstIncompleteWorkoutIdx!"
      @click="
        () => {
          handleSelectedWorkout!(workoutIdx)
        }
      "
      :key="workoutIdx"
      v-for="(workout, workoutIdx) in Object.keys(workoutProgram)"
      class="card-button plan-card w-full! flex flex-col disabled:cursor-not-allowed! disabled:shadow-none!"
    >
      <div class="flex items-center gap-2 justify-between">
        <p class="text-left">Day {{ workoutIdx < 9 ? '0' + (workoutIdx + 1) : workoutIdx + 1 }}</p>
        <i class="fa-solid fa-dumbbell" v-if="workoutIdx % 3 == 0"></i>
        <i class="fa-solid fa-weight-hanging" v-if="workoutIdx % 3 == 1"></i>
        <i class="fa-solid fa-bolt" v-if="workoutIdx % 3 == 2"></i>
      </div>
      <h3 class="font-bold">{{ workoutTypes[workoutIdx % 3] }}</h3>
    </button>
    <button
      class="card-button w-full plan-card-reset flex items-center justify-center gap-4"
      :disabled="firstIncompleteWorkoutIdx !== -1"
      @click="handleResetPlan!"
    >
      <p>Reset</p>
      <i class="fa-solid fa-rotate-left"></i>
    </button>
  </section>
</template>
