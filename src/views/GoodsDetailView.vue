<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccessToast, showToast } from 'vant'
import { useCartstore } from '@/stores/cart.js'
import { goods } from '@/mockData.js'
import { useCheckoutStore } from '@/stores/checkoutStore.js'
import { useUserStore } from '@/stores/user'
import { useFavoritesStore } from '@/stores/favorites'

// 路由参数id
const props = defineProps({
  id: { type: String, required: true },
})

const router = useRouter()
const user = useUserStore()
const cart = useCartstore()
const checkout = useCheckoutStore()
const favorites = useFavoritesStore()

// 状态定义
const showPopup = ref(false)
const selectedColor = ref('')
const selectedSize = ref('')
const popupQuantity = ref(1)

// 当前商品是否已收藏
const isFav = computed(() => goodsItem.value && favorites.isFavorited(goodsItem.value.id))

// 打开弹窗时重置状态
const openPopup = () => {
  selectedColor.value = ''
  selectedSize.value = ''
  popupQuantity.value = 1
  showPopup.value = true
}

// 计算属性
const specName = computed(() => {
  if (!selectedColor.value || !selectedSize.value) return ''
  return `${goodsItem.value.name}(${selectedColor.value}/${selectedSize.value})`
})

// 校验和操作
const validateSku = () => {
  if (!selectedColor.value || !selectedSize.value) {
    showToast({
      message: '请选择颜色和尺寸',
      className: 'custom-toast warn-toast',
      icon: 'warning-o',
      position: 'top',
    })
    return false
  }
  return true
}

const addCartFromPopup = () => {
  if (!validateSku()) return
  cart.addToCart(goodsItem.value, specName.value)
  showSuccessToast({
    message: '已加入购物车',
    className: 'custom-toast success-toast',
    position: 'top',
  })
  showPopup.value = false
}

// 立即购买（从弹窗）
const buyNowFromPopup = () => {
  if (!validateSku()) return
  // 构造商品信息
  const product = {
    id: goodsItem.value.id,
    name: goodsItem.value.name,
    image: goodsItem.value.image,
    price: goodsItem.value.price,
    quantity: popupQuantity.value,
    specName: specName.value, // 如 "黑色/M"
    color: selectedColor.value,
    size: selectedSize.value,
  }
  checkout.setBuyNow(product)
  showPopup.value = false
  router.push({ name: 'checkout', query: { mode: 'buyNow' } })
}

// 按id查询商品
const goodsItem = computed(() => goods.find((item) => item.id === Number(props.id)))

// 加入购物车
const addCart = () => {
  cart.addToCart(goodsItem.value)
  showSuccessToast('已加入购物车')
}

const goCart = () => router.push({ name: 'cart' })
const sorry = () => showToast('该功能将在后续课程实现')

// 收藏
const onFavorite = () => {
  if (!user.isLoggedIn) {
    showToast({
      message: '请先登录',
      className: 'custom-toast warn-toast',
      position: 'top',
    })
    return
  }
  favorites.toggleFavorites(goodsItem.value)
}
</script>

<template>
  <div class="detail" v-if="goodsItem">
    <van-image width="100%" :src="goodsItem.image" />

    <div class="head">
      <div class="price">
        <span class="symbol">¥</span>{{ goodsItem.price }}

        <span class="spec">{{ goodsItem.spec }}</span>
      </div>
      <div class="name">{{ goodsItem.name }}</div>
      <div class="extra">运费: 包邮 | 库存: {{ goodsItem.stock }}件</div>
      <div class="section-title">—商品详情—</div>
      <p class="description">{{ goodsItem.description }}</p>

      <!-- 底部操作栏 -->
      <div class="bottom-action-bar">
        <div class="action-icons">
          <div class="action-icon" @click="sorry">
            <van-icon name="chat-o" size="20" />
            <span>客服</span>
          </div>

          <div class="action-icon" @click="goCart">
            <van-icon name="cart-o" size="20" :badge="cart.totalCount > 0 ? cart.totalCount : ''" />
            <span>购物车</span>
          </div>

          <div class="action-icon" @click="onFavorite">
            <van-icon :name="isFav ? 'like' : 'like-o'" size="20" :color="isFav ? '#c82519' : ''" />
            <span :style="{ color: isFav ? '#c82519' : '#666' }">收藏</span>
          </div>
        </div>

        <div class="action-button">
          <van-button class="add-cart-btn" @click="openPopup">加入购物车</van-button>
          <van-button class="buy-now-btn" @click="openPopup">立即购买</van-button>
        </div>
      </div>
    </div>

    <!-- SKU规格选择弹窗 -->
    <van-popup class="sku-popup" v-model:show="showPopup" position="bottom" round :closeable="true">
      <div class="sku-header">
        <van-image width="80" height="80" :src="goodsItem.image" />
        <div class="sku-header-info">
          <div class="sku-price">¥{{ goodsItem.price }}</div>
          <div class="sku-stock">库存:{{ goodsItem.stock }}件</div>
        </div>
      </div>

      <div class="sku-section" v-if="goodsItem.colors">
        <div class="sku-label">颜色</div>
        <div class="sku-options">
          <span
            v-for="color in goodsItem.colors"
            :key="color"
            class="sku-option"
            :class="{ active: selectedColor === color }"
            @click="selectedColor = color"
          >
            {{ color }}
          </span>
        </div>
      </div>

      <div class="sku-section" v-if="goodsItem.sizes">
        <div class="sku-label">尺寸</div>
        <div class="sku-options">
          <span
            v-for="size in goodsItem.sizes"
            :key="size"
            class="sku-option"
            :class="{ active: selectedSize === size }"
            @click="selectedSize = size"
          >
            {{ size }}
          </span>
        </div>
      </div>

      <div class="sku-section">
        <div class="sku-label">数量</div>
        <van-stepper v-model="popupQuantity" :min="1" :max="goodsItem.stock" />
      </div>

      <div class="sku-actions">
        <van-button class="sku-cart-btn" @click="addCartFromPopup">加入购物车</van-button>
        <van-button class="sku-buy-btn" @click="buyNowFromPopup">立即购买</van-button>
      </div>
    </van-popup>
  </div>
  <van-empty v-else description="商品不存在" />
</template>

<style scoped lang="scss">
.detail {
  padding-bottom: 60px;

  .head {
    padding: 12px;

    .price {
      color: #c82519;
      font-size: 22px;

      .symbol {
        font-size: 14px;
      }
    }

    .spec {
      font-size: 12px;
      color: #999;
      margin-left: 8px;
    }

    .name {
      font-size: 16px;
      margin-top: 6px;
    }

    .extra {
      margin-top: 8px;
      font-size: 12px;
      color: #999;
    }
  }

  .section-title {
    text-align: center;
    color: #999;
    padding: 16px 0 8px;
    font-size: 14px;
  }

  .description {
    padding: 0 12px 12px;
    font-size: 14px;
    color: #333;
    line-height: 1.6;
  }
}
.bottom-action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background: #fff;
  padding: 8px 12px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;

  .action-icons {
    display: flex;
    gap: 16px;
    margin-right: 12px;

    .action-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      padding: 4px 8px;
      transition: all 0.3s;

      &:active {
        opacity: 0.6;
      }

      span {
        font-size: 11px;
        color: #666;
        margin-top: 2px;
      }
    }
  }

  .action-button {
    flex: 1;
    display: flex;
    gap: 8px;

    .van-button {
      flex: 1;
      height: 40px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }

    .add-cart-btn {
      background: linear-gradient(to right, #ffa726, #ff9800);
      color: #fff;
      border: none;
    }

    .buy-now-btn {
      background: linear-gradient(to right, #ff5252, #f44336);
      color: #fff;
      border: none;
    }
  }
}
.sku-popup {
  padding: 16px;
}

.sku-header {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;

  .sku-header-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .sku-price {
      color: #c82519;
      font-size: 20px;
      font-weight: bold;
    }

    .sku-stock {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}
.sku-section {
  margin-bottom: 16px;

  .sku-label {
    font-size: 14px;
    color: #333;
    margin-bottom: 8px;
  }

  .sku-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .sku-option {
    padding: 6px 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 13px;
    color: #333;
    cursor: pointer;
    transition: all 0.2s;

    &.active {
      border-color: #c82519;
      color: #c82519;
      background: #fff5f5;
    }
  }
}
.sku-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;

  .van-button {
    flex: 1;
    height: 44px;
    border-radius: 22px;
    font-size: 15px;
    border: none;
    color: #fff;
  }

  .sku-cart-btn {
    background: #ff9800;
  }

  .sku-buy-btn {
    background: #f44336;
  }
}
</style>