<script setup>
import { ref } from 'vue'
import { goods } from '@/mockData'
import GoodsGrid from '@/components/GoodsGrid.vue'

// 推荐购买（取 category_id 为 12, 13, 14 的商品）
const recommendList = ref(
  goods.filter(item => [12, 13, 14].includes(item.category_id)).slice(0, 8)
)
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1>👍 推荐购买</h1>
      <p>精选好物 · 品质保证</p>
    </div>
    <GoodsGrid :list="recommendList" />
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background: #f5f0ff;
  min-height: 100vh;
  padding: 12px 0 80px;
}
.page-header {
  text-align: center;
  padding: 20px 0 12px;
  h1 {
    font-size: 24px;
    color: #7c4dff;
    margin: 0;
  }
  p {
    font-size: 14px;
    color: #999;
    margin: 4px 0 0;
  }
}
</style>