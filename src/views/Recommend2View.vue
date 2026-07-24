<script setup>
import { ref } from 'vue'
import { goods } from '@/mockData'
import GoodsGrid from '@/components/GoodsGrid.vue'

const recommendList = ref(
  goods.filter(item => [16, 17, 18, 19].includes(item.category_id)).slice(0, 8)
)
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1>👍 精选推荐</h1>
      <p>为你精挑细选的好物</p>
    </div>
    <GoodsGrid :list="recommendList" />
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background: #fafffe;
  min-height: 100vh;
  padding: 12px 0 80px;
}
.page-header {
  text-align: center;
  padding: 20px 0 12px;
  h1 {
    font-size: 24px;
    color: #00b894;
    margin: 0;
  }
  p {
    font-size: 14px;
    color: #999;
    margin: 4px 0 0;
  }
}
</style>