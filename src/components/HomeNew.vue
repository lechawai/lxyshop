<script setup>
import { weeklyNew } from '@/mockData';
</script>
<template>
    <div class="home-new">
        <div class="title">
            <h3>每周上新</h3>
        </div>
        <ul>
            <li v-for="item in weeklyNew" :key="item.id">
                <img :src="item.image" />
                <p>{{ item.name }}</p>
                <p><span>$</span>{{ item.price }}</p>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
.home-new {
    margin-top: 0.5em;
    .title {
        text-align: center;
        font-size: 16px;
        height: 25px;
        h3{
            width: 50%;
            border-top: 2px solid #ccc;
            margin: 0 auto;
        }
    }
        ul{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 1em 0 0;
            li{
                margin-top: 2px;
                width: 49.5%;
                background-color: rgb(245, 245, 245);
                img{
                    width: 100%;
                }
                p{
                    text-align: center;
                    margin: 0.5em auto;
                }
                span{
                    color: red;
                    font-size: 14px;
                    margin-right: 2px;
                }
            }
        }
    
}
</style>