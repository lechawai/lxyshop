<script setup>
import { gridMenu } from '@/mockData.js'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

const handleGridClick = (item) => {
  if (item.link) {
    router.push(item.link)
  } else {
    showToast({ message: '功能开发中', className: 'custom-toast warn-toast', icon: 'warning-o', position: 'top' })
  }
}
</script>

<template>
  <div class="home-grid">
    <van-grid square :column-num="5">
      <van-grid-item
        v-for="item in gridMenu"
        :key="item.id"
        @click="handleGridClick(item)"
      >
        <van-image :src="item.image" />
        <span>{{ item.text }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<style lang="scss" scoped>
.home-grid {
  .van-image {
    width: 55%;
  }
  span {
    margin-top: 5px;
    font-size: 12px;
  }
}
</style>