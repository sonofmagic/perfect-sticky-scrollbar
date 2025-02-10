<script setup lang="ts">
import PerfectScrollbar from 'perfect-sticky-scrollbar'
import { onMounted, useTemplateRef } from 'vue'
import Demo from '../components/Demo.vue'
import 'perfect-sticky-scrollbar/style.css'

const demo = useTemplateRef('demo')

onMounted(() => {
  if (demo.value?.dom) {
    const ps = new PerfectScrollbar(demo.value.dom)
    console.log(ps)
  }
})
</script>

<template>
  <div>
    <Demo ref="demo" />
  </div>
</template>

<style>

</style>
