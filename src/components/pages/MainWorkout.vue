<script lang="ts" setup>
import type { DefaultData } from '@/App.vue'
import PortalModel from '@/PortalModel.vue'
import { workoutProgram } from '@/utils'
import { exerciseDescriptions } from '@/utils'
import { computed, ref } from 'vue'

const workoutTypes = ['Push', 'Pull', 'Legs']

const { data, selectedWorkout } = defineProps<{
  data: DefaultData
  selectedWorkout: number
  handleSaveWorkout: () => void
  isWorkoutComplete: Boolean
}>()

const { workout, warmup } = workoutProgram[selectedWorkout! as keyof typeof workoutProgram]

const selectedExercise = ref<string | null>(null)
const exerciseDescription = computed(
  () => exerciseDescriptions[selectedExercise.value! as keyof typeof exerciseDescriptions],
)
</script>

<template>
  <PortalModel
    v-if="selectedExercise"
    :handle-close-modal="
      () => {
        selectedExercise = null
      }
    "
    hello="hello"
  >
    <div class="exercise-description flex flex-col gap-4 w-full">
      <h3 class="capitalize">{{ selectedExercise }}</h3>
      <div>
        <small>Description</small>
        <p>{{ exerciseDescription }}</p>
      </div>
      <button @click="selectedExercise = null">
        Close <i style="padding-left: 0.5rem" class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </PortalModel>
  <section id="workout-card" class="flex flex-col gap-6">
    <div class="plan-card card flex flex-col">
      <div class="plan-card-header flex items-center justify-between gap-4">
        <p>Day {{ selectedWorkout! < 9 ? '0' + (selectedWorkout! + 1) : selectedWorkout! + 1 }}</p>
        <i class="fa-solid fa-dumbbell"></i>
      </div>
      <h2>{{ workoutTypes[selectedWorkout! % 3] }} Workout</h2>
    </div>
    <div class="workout-grid grid grid-cols-7 gap-4">
      <h4 class="grid-name col-span-3 flex items-center gap-4">Warmup</h4>
      <h6>Sets</h6>
      <h6>Reps</h6>
      <h6 class="grid-weights grid-cols-2">Weights</h6>
      <div
        class="workout-grid-row grid grid-cols-7 gap-4 col-span-7 group"
        v-for="(w, wIdx) in warmup"
        :key="wIdx"
      >
        <div class="grid-name col-span-3 flex items-center gap-4">
          <p class="capitalize">{{ w.name }}</p>
          <button
            @click="selectedExercise = w.name"
            class="hover:text-(--color-link) opacity-0 group-hover:opacity-100 group-hover:cursor-pointer shadow-none! p-0! border-none!"
          >
            <i class="fa-regular fa-circle-question"></i>
          </button>
        </div>
        <p>{{ w.sets }}</p>
        <p>{{ w.reps }}</p>
        <input class="grid-weights col-span-2" placeholder="14kg" type="text" disabled />
      </div>
      <div class="workout-grid-line col-span-7 mx-0 my-2"></div>
      <h4 class="grid-name col-span-3 flex items-center gap-4">Workout</h4>
      <h6>Sets</h6>
      <h6>Reps</h6>
      <h6 class="grid-weights grid-cols-2">Weights</h6>
      <div
        class="workout-grid-row grid grid-cols-7 gap-4 col-span-7 group"
        v-for="(w, wIdx) in workout"
        :key="wIdx"
      >
        <div class="grid-name col-span-3 flex items-center gap-4">
          <p class="capitalize">{{ w.name }}</p>
          <button
            class="hover:text-(--color-link) opacity-0 group-hover:opacity-100 group-hover:cursor-pointer shadow-none! p-0! border-none!"
            @click="selectedExercise = w.name"
          >
            <i class="fa-regular fa-circle-question"></i>
          </button>
        </div>
        <p>{{ w.sets }}</p>
        <p>{{ w.reps }}</p>
        <input
          v-if="data![selectedWorkout]"
          v-model="data![selectedWorkout]![w.name]"
          class="grid-weights col-span-2"
          placeholder="14kg"
          type="text"
        />
      </div>
    </div>
    <div class="card workout-btns flex items-center justify-between gap-4">
      <button class="flex-1" @click="handleSaveWorkout!">
        Save & Exit <i style="padding-left: 0.5rem" class="fa-solid fa-save"></i>
      </button>
      <button class="flex-1" :disabled="!isWorkoutComplete" @click="handleSaveWorkout!">
        Complete <i style="padding-left: 0.5rem" class="fa-solid fa-check"></i>
      </button>
    </div>
  </section>
</template>
