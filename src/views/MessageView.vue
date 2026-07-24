<script setup>
import { messages } from '@/mockData';
</script>

<template>
  <div class="message-page">
    <van-cell-group inset>
      <van-cell v-for="item in messages":key="item.id">
        <template #icon>
          <img class="avatar" :src="item.image"/>
        </template>
        <template #title>
          {{ item.title }}
        </template>
        <template #label>
          {{ item.label }}
        </template>
        <template #right-icon>
          <span class="time-text">{{ item.date }}</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 16px;
}
.page-header > van-icon {
  position: absolute;
  left: 16px;
  font-size: 20px;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right:10px ;
}
.time-text {
  color: #999;
  font-size: 13px;
}
</style>