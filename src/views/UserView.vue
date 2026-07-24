<script setup>
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import { useUserStore } from '@/stores/user';
const router = useRouter()
const userStore=useUserStore()
const goFavorites=()=>router.push({name:'favorites'})
const goAddress = ()=>router.push({name:'addressList'})

const onLogout=()=>{
    userStore.logout()
    showToast('已退出登录')
}
const goOrders = (status) => {
    router.push({name:'orders',query:status?{status}:{}})
}

const sorry =()=>showToast("该功能在后续实现")
</script>
<template>
    <van-row class="user-info" align="center">
        <template v-if="userStore.isLoggedIn">
            <div class="avatar-text">{{ userStore?.currentUser?.username?.charAt(0) }}</div>
            <span class="user-info-name">{{ userStore?.currentUser?.username }}</span>
            </template>

            <template v-else>
        <van-image src="/images/avatar_default.png" round width="100" height="100" />
            <RouterLink :to="{name:'login'}">
            <span class="user-info-name">登录</span>
        </RouterLink>
        <span class="user-info-name">|</span>
            <RouterLink :to="{name:'register'}">
            <span class="user-info-name">注册</span>
        </RouterLink>
    </template>
    
 </van-row>
 <van-row class="user-links">
    <van-col span="6" @click="goOrders('待付款')">
    <van-icon name="pending-payment" />
    待付款
    </van-col>
    <van-col span="6" @click="goOrders('待收获')">
    <van-icon name="records-o" />
    待收获
    </van-col>
    <van-col span="6" @click="goOrders('待评价')">
    <van-icon name="tosend" />
    待评价
    </van-col>
    <van-col span="6" @click="goOrders('退款/售后')">
    <van-icon name="after-sale" />
    退款/售后
    </van-col>
 </van-row>
 <van-cell-group>
    <van-cell icon="records-o" title="全部订单" is-link @click="goOrders()"></van-cell>
    <van-cell icon="location-o" title="收货地址" is-link @click="goAddress()"></van-cell>
    <van-cell icon="like-o" title="我的收藏" is-link @click="goFavorites"></van-cell>
    <van-cell icon="points" title="我的积分" is-link @click="sorry"></van-cell>
    <van-cell icon="gift-o" title="我的红包" is-link @click="sorry"></van-cell>
    <van-cell icon="service-o" title="联系客服" is-link @click="sorry"></van-cell>
</van-cell-group>
<div v-if="userStore.isLoggedIn" class="logout-wrap">
    <van-button block round @click="onLogout">退出登录</van-button>
    </div>
</template>

<style lang="scss" scoped>
.user-info {
    padding: 15px;
    background: url(/images/user_head_bg.png) no-repeat center;
    .user-info-name {
        display: inline-block;
        color: white;
        padding: 0 5px;
    }
}
.user-links{
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    .van-icon{
        display: block;
        font-size: 24px;
    }
}.avatar-text {
  /*文字头像*/
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #c82519;
  color: #fff;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}
</style>