<script setup>
import { ref } from 'vue'
import { goods } from '@/mockData'
import GoodsGrid from '@/components/GoodsGrid.vue'

// 筛选好物分享商品（取 category_id 为 6, 7, 8 的商品）
const shareList = ref(
  goods.filter(item => [6, 7, 8].includes(item.category_id)).slice(0, 8)
)
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1>✨ 好物分享</h1>
      <p>大家都在推荐的好东西</p>
    </div>
    <GoodsGrid :list="shareList" />
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background: #f0f8ff;
  min-height: 100vh;
  padding: 12px 0 80px;
}
.page-header {
  text-align: center;
  padding: 20px 0 12px;
  h1 {
    font-size: 24px;
    color: #2196f3;
    margin: 0;
  }
  p {
    font-size: 14px;
    color: #999;
    margin: 4px 0 0;
  }
}
</style>