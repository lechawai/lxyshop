<script setup>
import { ref } from 'vue'
import { goods } from '@/mockData'
import GoodsGrid from '@/components/GoodsGrid.vue'

// 筛选今日爆款商品（取 category_id 为 2, 3, 4 的商品，模拟爆款）
const hotSaleList = ref(
  goods.filter(item => [2, 3, 4].includes(item.category_id)).slice(0, 8)
)
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1>🔥 今日爆款</h1>
      <p>限时特惠 · 手慢无</p>
    </div>
    <GoodsGrid :list="hotSaleList" />
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background: #fff5f5;
  min-height: 100vh;
  padding: 12px 0 80px;
}
.page-header {
  text-align: center;
  padding: 20px 0 12px;
  h1 {
    font-size: 24px;
    color: #c82519;
    margin: 0;
  }
  p {
    font-size: 14px;
    color: #999;
    margin: 4px 0 0;
  }
}
</style>