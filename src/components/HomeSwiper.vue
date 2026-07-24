<script setup>
//轮播图内容
import { banners } from '@/mockData.js';
</script>
<template>
<van-swipe
    class="home-swiper"
    :autoplay="3000"
    indicator-color="var{--van-primary-color}">
    <van-swipe-item v-for="item in banners" :key="item">
    <img :src="item" />
    </van-swipe-item>
 </van-swipe>
</template>
<style lang="scss" scoped>
.home-swiper {
    width: 100%;
    img {
        width: 100%;
    }
}
</style>