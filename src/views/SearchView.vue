<script setup>
import GoodsGrid from '@/components/GoodsGrid.vue';
import { ref,computed,watch } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { goods } from '@/mockData';
const route=useRoute()
const router=useRouter()
const keyword=ref(route.query.keyword||'')
    watch(
        ()=> route.query.keyword,
        (kw)=>{keyword.value=kw || ''}
    )
    const list = computed(()=>{
        const kw = keyword.value.trim()
        if(!kw)return[]
        return goods.filter((item)=>item.name.includes(kw))
    })
    const onSearch=()=>{
        router.replace({name:'search',query:{keyword:keyword.value.trim()}})
    }
</script>
<template>
<van-search placeholder="搜索商品" v-model="keyword" show-action @search="onSearch">
    <template #action>
        <div @click="onSearch">搜索</div>
    </template>
</van-search>
<van-empty v-if="!keyword.trim()" description="请输入关键词搜索"/>
<van-empty v-else-if="list.length === 0" description="没有找到相关商品"/>
<GoodsGrid v-else :list="list"/>
</template>
<style scoped>

</style>