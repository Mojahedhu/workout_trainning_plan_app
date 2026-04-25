<script lang="ts" setup>
defineProps<{
  handleChangeDisplay: (idx: 1 | 2 | 3) => void
}>()
</script>

<template>
  <section id="welcome" class="flex flex-col gap-6 sm:px-8">
    <div class="benefits flex flex-col gap-2">
      <h2>Complete this program<br />if you want...</h2>
      <div>
        <p>✅ Follow a simple program with proven results.</p>
        <p>✅ Get fit, healthy, strong and absolutely shredded.</p>
        <p>✅ Learn more about gym, training and technique</p>
      </div>
    </div>
    <div>
      <h3>The Training Plan</h3>
      <p>This training plan follows a structure known as the <strong>Bro Split</strong>.</p>
      <h5><i>Push &rarr; Pull &rarr; Legs &rarr; Repeat</i></h5>
    </div>
    <div class="card challenge flex flex-col gap-1 sm:gap-1">
      <h3>🔥 Your Challenge</h3>
      <p>Complete all the workouts and track your progress along the way!</p>
      <p>Do you accept?</p>
      <button @click="() => handleChangeDisplay(2)">Begin &rarr;</button>
    </div>
  </section>
</template>
