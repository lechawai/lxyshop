<script setup>
import { useRouter } from "vue-router";
import TabBar from "./components/TabBar.vue";

const router = useRouter();

// 顶部返回按钮，返回上一页
const onClickLeft = () => {
  router.back();
};
</script>

<template>
  <!-- 顶部标题栏：由路由 meta.showNavBar 控制是否显示 -->
  <van-nav-bar
    v-if="$route.meta.showNavBar"
    :title="$route.meta.title"
    :left-arrow="$route.meta.showBack"
    @click-left="onClickLeft"
    fixed
    placeholder
  />

  <!-- ★ 修复：给 RouterView 加上 key，强制重新渲染 ★ -->
  <RouterView :key="$route.fullPath" />

  <!-- 底部导航栏：由路由 meta.showTabBar 控制是否显示 -->
  <TabBar v-if="$route.meta.showTabBar" />
</template>

<style lang="scss" scoped></style>