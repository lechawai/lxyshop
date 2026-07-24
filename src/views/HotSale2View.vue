<script setup>
import { ref } from 'vue'
import { goods } from '@/mockData'
import GoodsGrid from '@/components/GoodsGrid.vue'

// 今日爆款2（取 category_id 为 22, 23, 26 的商品）
const hotSaleList = ref(
  goods.filter(item => [22, 23, 26].includes(item.category_id)).slice(0, 8)
)
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1>🔥 限时爆款</h1>
      <p>今日特价 · 不容错过</p>
    </div>
    <GoodsGrid :list="hotSaleList" />
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background: #fff8f0;
  min-height: 100vh;
  padding: 12px 0 80px;
}
.page-header {
  text-align: center;
  padding: 20px 0 12px;
  h1 {
    font-size: 24px;
    color: #e17055;
    margin: 0;
  }
  p {
    font-size: 14px;
    color: #999;
    margin: 4px 0 0;
  }
}
</style>