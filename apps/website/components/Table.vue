<script lang="ts" setup>
import { vTable } from './vScrollbarTable'

const tableData = Array.from({
  length: 100,
}).map(() => {
  return {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }
})
</script>

<template>
  <ElTable v-table :data="tableData" stripe style="width: 100%">
    <ElTableColumn prop="date" label="Date" width="180" />
    <ElTableColumn prop="name" label="Name" width="180" />
    <ElTableColumn prop="name" label="Name" width="180" />
    <ElTableColumn prop="name" label="Name" width="180" />
    <ElTableColumn prop="name" label="Name" width="180" />
    <ElTableColumn prop="address" label="Address" width="280" />
    <ElTableColumn prop="address" label="Address" width="280" />
    <ElTableColumn prop="address" label="Address" width="280" />
    <ElTableColumn prop="address" label="Address" width="280" />
    <ElTableColumn prop="address" label="Address" width="280" />
  </ElTable>
</template>
