<script setup>
import { ref } from 'vue'
import { goods } from '@/mockData'
import GoodsGrid from '@/components/GoodsGrid.vue'

// 特价优惠（取价格低于 200 的商品）
const specialList = ref(
  goods.filter(item => Number(item.price) < 200).slice(0, 8)
)
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1>💰 特价优惠</h1>
      <p>低价好物 · 限时抢购</p>
    </div>
    <GoodsGrid :list="specialList" />
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
    color: #e74c3c;
    margin: 0;
  }
  p {
    font-size: 14px;
    color: #999;
    margin: 4px 0 0;
  }
}
</style>