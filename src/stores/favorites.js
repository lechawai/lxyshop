import { ref } from 'vue'
import { defineStore } from 'pinia'

// 收藏夹状态管理Store
export const useFavoritesStore = defineStore('favorites', () => {
  // 响应式数据定义
  const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))

  // 判断是否已收藏
  const isFavorited = (goodsId) => {
    //遍历收藏列表，判断是否存在匹配ID的商品
    return favorites.value.some((item) => item.id === goodsId)
  }

  //切换商品收藏状态
  const toggleFavorites = (goodsItem) => {
    //查找商品在收藏列表中的索引位置
    const index = favorites.value.findIndex((item) => item.id === goodsItem.id)
    if(index > -1){
      //若已存在，从收藏列表中移除该商品
      favorites.value.splice(index,1)
    }else{
      //若不存在，将商品信息存入收藏列表（只保留必要字段）
      favorites.value.push({
        id:goodsItem.id,
        name:goodsItem.name,
        image:goodsItem.image,
        price:goodsItem.price,
        spec:goodsItem.spec,
      })
    }
    //同步更新本地存储，确保收藏数据持久化
    localStorage.setItem('favorites',JSON.stringify(favorites.value))
  }
  const removeFavorite = (goodsId)=>{
    favorites.value= favorites.value.filter((item )=>item.id===goodsId)
    localStorage.setItem('favorites'.JSON.stringify(favorites.value))
  }
  //暴露状态和方法
  return { favorites,isFavorited,toggleFavorites,removeFavorite }
})