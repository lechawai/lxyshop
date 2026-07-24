<script setup>
defineProps({
    list:{type:Array,default:()=>{}}
})
</script>
<template>
    <div class="goods-grid">
        <router-link
        v-for="(item, index) in list"
        :key="index"
        class="goods-item"
        :to="{name:'goodsDetail',params:{id:item.id}}">
            <div class="img-wrap"><img :src="item.image" /></div>
            <div class="title">{{ item.name }}<span class="spec">{{ item.spec }}</span></div>
            <div class="info">
                <span class="price">￥{{ item.price }}</span>
                <span class="stock">剩{{ item.stock }}</span>
            </div>
        </router-link>
    </div>
</template>
<style lang="scss" scoped>
.goods-grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 10px;
    box-sizing: border-box;
    contain: layout style;
    .goods-item{
        display: flex;
        flex-direction: column;
        border:1px solid #efeff4;
        border-radius: 8px;
        overflow: hidden;
        color: inherit;
        .img-wrap{
            width: 100%;
            aspect-ratio: 1;
            overflow: hidden;
            background: #f5f5f5;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .title{
            font-size: 14px;
            color: #333;
            margin: 8px 8px 0;
            line-height: 1.4;
            .spec{
                font-size: 12px;
                color: #999;
                margin-left: 4px;
            }
        }
        .info{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 6px 8px 10px;
            .price{
                color: #c82519;
                font-weight: bold;
                font-size: 16px;
            }
            .stock{
                font-size: 12px;
                color: #999;
            }
        }
    }
}
</style>