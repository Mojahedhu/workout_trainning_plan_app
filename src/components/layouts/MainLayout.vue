<script lang="ts" setup></script>

<template>
  <div class="bg-radial from-blue-50 via-blue-100/80 to-blue-200/80 h-full w-full">
    <header>
      <h1 class="text-gradient capitalize">Mojahed</h1>
    </header>
    <main class="">
      <slot />
    </main>
    <footer class="flex flex-col gap-2 items-center px-0 pt-2 pb-3">
      <small>Created by</small>
      <a
        href="https://www.github.com/Mojahedh"
        target="_blank"
        class="flex items-center gap-2 p-[0.3rem] pr-2 bg-(--background-muted) rounded-[4rem] border border-transparent duration-300 decoration-2 decoration-amber-200 hover:border-(--color-link)"
      >
        <img
          alt="pfp"
          src="https://avatars.githubusercontent.com/u/77163783?v=4"
          class="max-w-[30px]! aspect-square! border-[100%]!"
        />
        <p>mojahed</p>
        <i class="fa-brands fa-github"></i>
      </a>
    </footer>
  </div>
</template>

<style scoped>
header,
footer,
main {
  padding: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
</style>
