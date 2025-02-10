<script lang="ts" setup>

</script>

<template>
  <div class="content">
    <div class="sticky-element">
      我是粘性元素
    </div>
    <div class="main-content">
      <!-- 内容区域 -->
      <p>滚动内容</p>
    <!-- 可以添加更多内容让页面可滚动 -->
    </div>
  </div>
</template>

<style>
.sticky-element {
  position: sticky;
  top: 0; /* 距离顶部为0 */
  z-index: 1000; /* 保证粘性元素在页面上层 */
  background-color: #fff; /* 背景色 */
  box-shadow: 0 4px 2px -2px gray; /* 添加阴影，使粘性元素在滚动时更明显 */
  padding: 10px;
  font-size: 16px;
}
</style>
