<script lang="ts" setup>
import { onMounted } from 'vue'
// import { vTable } from './vScrollbarTable'
// import { useStickyBox } from './use-sticky-box'

onMounted(() => {

})

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
  <ElTable class="sticky-x" :data="tableData" stripe style="width: 100%">
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
  <div class="mt-100">
    111
  </div>
</template>

<style lang="scss">
.el-table.sticky-x {
  position: static;
  overflow: initial;

  .el-table__body-wrapper {
    position: static;
    overflow: initial;

    .el-scrollbar {
      position: static;
      overflow: initial;

      .el-scrollbar__bar.is-horizontal {
        position: sticky;
        bottom: 20px !important;
        height: 0px;

        .el-scrollbar__thumb {
          height: 6px;
        }
      }
    }
  }
}
</style>
