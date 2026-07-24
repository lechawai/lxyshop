<script setup>
import { useCartstore } from '@/stores/cart';
//读取购物车store
const cart = useCartstore()
</script>

<template>
  <van-tabbar route fixed placeholder>
    <van-tabbar-item icon="home-o" replace to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" replace to="/category">分类</van-tabbar-item>
    <van-tabbar-item icon="cart-o" replace to="/cart"
    :badge="cart.totalCount > 0 ? cart.totalCount :''"
    >购物车</van-tabbar-item>
    <van-tabbar-item icon="chat-o" replace to="/message">消息</van-tabbar-item>
    <van-tabbar-item icon="user-o" replace to="/user">我的</van-tabbar-item>
  </van-tabbar>
</template>

