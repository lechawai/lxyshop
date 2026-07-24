<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HomeSwiper from '@/components/HomeSwiper.vue';
import HomeGrid from '@/components/HomeGrid.vue';
import HomeProduct from '@/components/HomeProduct.vue';
import HomeNew from '@/components/HomeNew.vue';
import HomeTop from '@/components/HomeTop.vue';
const router = useRouter();

const search = ref('');

const onSearch = function(){
  const keyword = search.value.trim();
  if(!keyword) return;
  router.push({name:"search",query:{keyword}})
}

const onCancel = function(){
  search.value = '';
}
</script>

<template>
  <van-search v-model="search" show-action placeholder="请输入关键词" @search="onSearch"></van-search>
  <HomeSwiper />
  <HomeGrid />
  <HomeProduct />
  <HomeNew />
  <HomeTop />
</template>

<style scoped></style>