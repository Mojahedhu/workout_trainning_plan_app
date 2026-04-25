<script lang="ts" setup>
defineProps<{
  hello: string
  handleCloseModal: () => void
}>()
// const { hello, handleCloseModal } = defineProps({
//   hello: String,
//   handleCloseModal: Function,
// })
</script>

<template>
  <Teleport to="#portal">
    <h1>{{ hello }}</h1>
    <div class="portal-container fixed top-0 left-0 w-full h-full z-1001">
      <div
        role="button"
        tabindex="0"
        class="portal-underlay inset-0 absolute bg-(--background-primary) opacity-70 z-999 border-none p-0"
        @click="handleCloseModal!"
      ></div>
      <div
        class="portal-content absolute z-1000 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 max-w-[90vw] max-h-[90vh] grid place-items-center bg-(--background-primary) rounded-(--border-radius-small) p-4 border border-(--background-muted)"
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>
