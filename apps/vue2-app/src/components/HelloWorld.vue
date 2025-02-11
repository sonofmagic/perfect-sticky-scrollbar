<script lang="ts" setup>
import PerfectScrollbar from 'perfect-sticky-scrollbar'
import { onMounted, ref } from 'vue'
import 'perfect-sticky-scrollbar/style.css'

const tableRef = ref()

const tableData = Array.from({ length: 100 }).map(() => {
  return {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333,
  }
})

onMounted(() => {
  const bodyWrapper = tableRef.value.$el.querySelector('.el-table__body-wrapper') as HTMLDivElement
  // bodyWrapper.style.position = 'relative'

  if (bodyWrapper) {
    const ps = new PerfectScrollbar(bodyWrapper, {
      stickyXScrollbar: true,
      stickyXScrollbarOffset: 40,
    })
    bodyWrapper.style.overflowX = 'hidden'
    console.log(ps)
  }
})
</script>

<template>
  <div class="container mx-auto">
    <div class="w-160">
      <el-table ref="tableRef" class="sticky-x" :data="tableData">
        <el-table-column prop="date" label="日期" width="150" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="province" label="省份" width="120" />
        <el-table-column prop="city" label="市区" width="120" />
        <el-table-column prop="address" label="地址" width="300" />
        <el-table-column prop="zip" label="邮编" width="120" />
        <el-table-column prop="city" label="市区" width="120" />
        <el-table-column prop="address" label="地址" width="300" />
        <el-table-column prop="zip" label="邮编" width="120" />
        <el-table-column prop="city" label="市区" width="120" />
        <el-table-column prop="address" label="地址" width="300" />
        <el-table-column prop="zip" label="邮编" width="120" />
        <el-table-column label="操作" width="100">
          <template>
            <el-button type="text" size="small">
              查看
            </el-button>
            <el-button type="text" size="small">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="mt-100">
      1
    </div>
  </div>
</template>

<style lang="scss">
.ps__rail-x,
.ps__rail-y {
  opacity: 0.6;
}
</style>
