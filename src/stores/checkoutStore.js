import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCheckoutStore = defineStore('checkout', () => {
  const buyNowItem = ref(null) //临时存放立即购买的商品
  const setBuyNow = (product) => {
    buyNowItem.value = { ...product }
  }

  const clear = () => {
    buyNowItem.value = null
  }

  return { buyNowItem, setBuyNow, clear }
})