<template>
    <ul class="flex m-9 justify-center">
      <li>
        <button
          @click="changePage(prev)"
          class="mx-1 bg-white cursor-pointer rounded-full p-2 w-12 h-12 text-center text-lg text-black"
          :disabled="currentPage === 1"
        >
          <oh-vue-icon name="bi-arrow-left" scale="1.5" />
        </button>
      </li>
      <li
        v-for="page in pages"
        class="mx-1 border font-semibold border-blue rounded-full p-2 w-12 h-12 text-center text-sm text-black flex  h[calc(100% -20%)] left-[19.5%] justify-center items-center cursor-pointer', currentPage === page ? 'bg-blue-950 text-white' : 'text-blur-950"
        :class="page === currentPage ? 'bg-blue-950 text-white' : 'text-blue-950'"
        v-bind:key="page"
        @click="changePage(page)"
      >
        {{ page }}
      </li>
      <li>
        <button
          class="mx-1 bg-white cursor-pointer rounded-full p-2 w-12 h-12  text-center text-lg text-black"
          :disabled="currentPage === totalPag"
          @click="changePage(next)"
        >
        <oh-vue-icon name="bi-arrow-right" scale="1.5"/> 
        </button>
      </li>
    </ul>
  </template>
  

<script lang="ts" setup>
import OhVueIcon from "../../plugins/oh-vue-icon.ts"

interface Props {
  pages: Array<number | string>;
    currentPage: number;
    totalPag: number;
    next: number;
    prev: number;
}

const { pages, currentPage, totalPag, next, prev } = defineProps<Props>();

type Emits = {
    (event: "method", page: number | string): void;
}

const emits = defineEmits<Emits>();

const changePage = (page: number | string) => {
    emits("method", page)
}



</script>

<style lang="scss" scoped>


</style>