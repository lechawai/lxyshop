<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'

const tips = ref([
  { id: 1, title: '如何挑选高品质羽绒服？', date: '2026-07-01', views: 1234 },
  { id: 2, title: '网购避坑指南：这5点要注意', date: '2026-06-28', views: 856 },
  { id: 3, title: '换季护肤必买清单', date: '2026-06-25', views: 2341 },
  { id: 4, title: '家电选购小技巧', date: '2026-06-20', views: 567 },
  { id: 5, title: '母婴用品推荐', date: '2026-06-18', views: 789 },
])

const handleTipClick = (tip) => {
  showToast({ message: `阅读：${tip.title}`, className: 'custom-toast', position: 'top' })
}
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1>📝 购物心得</h1>
      <p>分享经验 · 聪明消费</p>
    </div>

    <div class="tips-list">
      <div
        v-for="tip in tips"
        :key="tip.id"
        class="tip-item"
        @click="handleTipClick(tip)"
      >
        <div class="tip-title">{{ tip.title }}</div>
        <div class="tip-meta">
          <span>📅 {{ tip.date }}</span>
          <span>👁️ {{ tip.views }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background: #f5f5f5;
  min-height: 100vh;
  padding: 12px 16px 80px;
}
.page-header {
  text-align: center;
  padding: 16px 0;
  h1 {
    font-size: 24px;
    color: #333;
    margin: 0;
  }
  p {
    font-size: 14px;
    color: #999;
    margin: 4px 0 0;
  }
}
.tips-list {
  .tip-item {
    background: #fff;
    border-radius: 8px;
    padding: 14px 16px;
    margin-bottom: 10px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    cursor: pointer;
    transition: all 0.2s;
    &:active {
      opacity: 0.6;
    }
    .tip-title {
      font-size: 15px;
      color: #333;
      font-weight: 500;
    }
    .tip-meta {
      display: flex;
      gap: 16px;
      margin-top: 6px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>