<script lang="ts" setup>
import { gymHealthFacts } from '@/utils/index'
import GridComponent from '../GridComponent.vue'

const props = defineProps<{
  handleResetPlan: () => void
  firstIncompleteWorkoutIdx: number
  handleSelectedWorkout: (idx: number) => void
  selectedWorkout: number
}>()
// generate a random whole integer number between 0 and array length - 1
const randomNumber = Math.floor(Math.random() * gymHealthFacts.length)
const todaysFact = gymHealthFacts[randomNumber]

const startWorkout = () => {
  const index = props.firstIncompleteWorkoutIdx ?? 0
  props.handleSelectedWorkout(index < 0 ? 0 : index)
}
</script>

<template>
  <section id="dashboard" class="flex flex-col gap-8">
    <div class="card tip-container flex flex-col gap-2 sm:gap-4">
      <h2 class="font-bold">Welcome Smoldier</h2>
      <div class="flex">
        <p class="tip"><strong>Daily Tip</strong><br />{{ todaysFact }}</p>
      </div>
      <button @click="startWorkout">Start workout &rarr;</button>
    </div>
    <GridComponent v-bind="props" />
  </section>
</template>
