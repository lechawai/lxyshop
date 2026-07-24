<script setup lang="ts">
import { topPicks } from '@/mockData';
</script>
<template>
    <div class="home-top">
        <h3>人气推荐</h3>
        <div class="content">
            <van-card v-for="item in topPicks" :key="item.id"
            :tag="item.tag"
            :price="item.price"
            :desc="item.desc"
            :title="item.title"
            :thumb="item.image"
            :origin-price="item.originPrice"/>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.home-top {
    h3{
        font-size: 22px;
        line-height: 30px;
        text-align: center;
        margin: 0.5em auto;
    }
    .content{
        :deep(.van-card){
            .van-card__title {
                font-size: 15px;
                line-height: 20px;
            }
        }
    }
}
</style>