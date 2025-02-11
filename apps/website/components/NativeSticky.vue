<script lang="ts" setup>
import ContentBox from './ContentBox.vue'
import Sidebar from './Sidebar.vue'
import StickyBox from './StickyBox.vue'
</script>

<template>
  <div class="mx-auto p-4">
    <div class="max-h-60 overflow-auto">
      <div class=" bg-gray-100 rounded-2xl flex items-start gap-6 p-4">
        <StickyBox :offsetTop="20" :offsetBottom="20">
          <Sidebar />
        </StickyBox>
        <ContentBox />
        <StickyBox :offsetTop="20" :offsetBottom="20" bottom class="self-end">
          <Sidebar />
        </StickyBox>
      </div>
    </div>
  </div>
</template>

<style></style>
