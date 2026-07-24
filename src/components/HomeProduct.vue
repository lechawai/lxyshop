<script setup lang="ts">
import { homeProducts } from '@/mockData';
</script>
<template>
<div class="home-product">
    <ul>
        <li v-for="item in homeProducts" :key="item.id">
            <img :src="item.image" />
            <h4>{{ item.name }}</h4>
        </li>
    </ul>
</div>

</template>
<style lang="scss" scoped>
.home-product {
    &>ul{
        display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
        width: 46.5%;
        position: relative;
        img{
            width: 100%;
        }
        h4{
            position: absolute;
            font-size: 14px;
            left: 0;
            top: 0;
            background-color: lightcoral;
            color: white;
            padding: 2px 4px;
            border-radius:0 0 20% 0 ;
        }
    }
    }
}
</style>