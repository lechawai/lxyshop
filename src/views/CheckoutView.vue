<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showToast } from 'vant'
import { useAddressStore } from '@/stores/address'
import { useCartstore } from '@/stores/cart'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { useOrderStore } from '@/stores/order'

const router = useRouter()
const route = useRoute()
const addressStore = useAddressStore()
const cartStore = useCartstore()
const checkoutStore = useCheckoutStore()
const orderStore = useOrderStore()

// ---------- 模式判断 ----------
const mode = computed(() => route.query.mode || 'cart') // 'cart' 或 'buyNow'

// ---------- 地址相关 ----------
const selectedAddressId = ref(null) // 从地址列表返回的 addressId
const selectedAddress = computed(() => {
  if (selectedAddressId.value) {
    const addr = addressStore.getAddress(selectedAddressId.value)
    if (addr) return addr
  }
  // 兜底：默认地址
  return addressStore.defaultAddress
})

// 地址卡片点击跳转地址列表（带 from=checkout）
const goToAddressList = () => {
  router.push({ name: 'addressList', query: { from: 'checkout' } })
}

// ---------- 商品数据 ----------
// 结算商品列表
const checkoutItems = ref([])

// 计算总金额
const totalPrice = computed(() => {
  return checkoutItems.value.reduce((sum, item) => {
    return sum + Number(item.price) * item.quantity
  }, 0)
})

// 格式化价格保留两位小数
const formatPrice = (val) => {
  return Number(val).toFixed(2)
}

// ---------- 初始化加载商品 ----------
const loadCheckoutItems = () => {
  if (mode.value === 'buyNow') {
    // 立即购买：从 checkoutStore 获取单商品
    const item = checkoutStore.buyNowItem
    if (item) {
      checkoutItems.value = [{ ...item }]
    } else {
      checkoutItems.value = []
      showToast({ message: '没有需要结算的商品', className: 'custom-toast warn-toast', icon: 'warning-o', position: 'top' })
    }
  } else {
    // 购物车结算：从购物车获取已勾选商品
    const checkedItems = cartStore.items.filter(item => item.checked)
    if (checkedItems.length === 0) {
      checkoutItems.value = []
      showToast({ message: '没有需要结算的商品', className: 'custom-toast warn-toast', icon: 'warning-o', position: 'top' })
    } else {
      checkoutItems.value = checkedItems.map(item => ({ ...item }))
    }
  }
}

// ---------- 提交订单 ----------
const submitOrder = () => {
  // 1. 校验地址
  if (!selectedAddress.value) {
    showToast({ message: '请选择收货地址', className: 'custom-toast warn-toast', icon: 'warning-o', position: 'top' })
    return
  }

  // 2. 校验商品
  if (checkoutItems.value.length === 0) {
    showToast({ message: '没有需要结算的商品', className: 'custom-toast warn-toast', icon: 'warning-o', position: 'top' })
    return
  }

  // 3. 生成订单
  orderStore.addOrder(checkoutItems.value, selectedAddress.value)

  // 4. 清理数据
  if (mode.value === 'buyNow') {
    // 立即购买：清空临时数据
    checkoutStore.clear()
  } else {
    // 购物车结算：移除已结算商品
    const idsToRemove = checkoutItems.value.map(item => item.id)
    idsToRemove.forEach(id => {
      cartStore.removeItem(id)
    })
  }

  // 5. 提示并跳转
  showToast({ message: '下单成功', className: 'custom-toast success-toast', position: 'top' })
  router.push({ name: 'orders' })
}

// ---------- 监听地址列表返回 ----------
onMounted(() => {
  // 检查 URL 是否有 addressId 参数（从地址列表返回时携带）
  const addrId = route.query.addressId
  if (addrId) {
    selectedAddressId.value = Number(addrId)
    // 清除 URL 中的参数，避免刷新后仍然使用
    router.replace({ query: { ...route.query, addressId: undefined } })
  }

  loadCheckoutItems()
})
</script>

<template>
  <div class="checkout-page">
    <!-- 地址卡片 -->
    <div class="address-card" @click="goToAddressList">
      <div v-if="selectedAddress" class="address-info">
        <div class="address-top">
          <span class="name">{{ selectedAddress.name }}</span>
          <span class="phone">{{ selectedAddress.phone }}</span>
        </div>
        <div class="address-detail">
          {{ selectedAddress.province }}{{ selectedAddress.city }}{{ selectedAddress.district }}{{ selectedAddress.detail }}
        </div>
      </div>
      <div v-else class="address-empty">
        <span>＋ 添加收货地址</span>
      </div>
      <van-icon name="arrow" class="arrow" />
    </div>

    <!-- 商品清单 -->
    <div class="goods-list">
      <div class="list-title">商品清单</div>
      <div v-for="item in checkoutItems" :key="item.id" class="goods-item">
        <van-image :src="item.image" width="80" height="80" fit="cover" />
        <div class="goods-info">
          <div class="goods-name">{{ item.name }}</div>
          <div class="goods-spec">{{ item.spec || item.specName || '' }}</div>
          <div class="goods-bottom">
            <span class="price">¥{{ formatPrice(item.price) }}</span>
            <span class="quantity">x{{ item.quantity }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 金额汇总 -->
    <div class="summary">
      <div class="summary-row">
        <span>商品合计</span>
        <span>¥{{ formatPrice(totalPrice) }}</span>
      </div>
      <div class="summary-row">
        <span>运费</span>
        <span class="free-shipping">包邮</span>
      </div>
      <div class="summary-row total">
        <span>实付金额</span>
        <span class="total-price">¥{{ formatPrice(totalPrice) }}</span>
      </div>
    </div>

    <!-- 底部提交栏 -->
    <div class="bottom-bar">
      <div class="total-label">
        实付：<span class="total-price">¥{{ formatPrice(totalPrice) }}</span>
      </div>
      <van-button class="submit-btn" type="primary" round @click="submitOrder">
        提交订单
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkout-page {
  background: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 80px;
}

/* 地址卡片 */
.address-card {
  background: #fff;
  margin: 10px 12px;
  padding: 14px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: background 0.2s;

  &:active {
    background: #f8f8f8;
  }

  .address-info {
    flex: 1;

    .address-top {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 4px;

      .name {
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }
      .phone {
        font-size: 14px;
        color: #666;
      }
    }
    .address-detail {
      font-size: 14px;
      color: #888;
      line-height: 1.5;
    }
  }

  .address-empty {
    flex: 1;
    font-size: 15px;
    color: #999;
  }

  .arrow {
    color: #ccc;
    font-size: 18px;
    flex-shrink: 0;
  }
}

/* 商品清单 */
.goods-list {
  background: #fff;
  margin: 10px 12px;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

  .list-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 10px;
  }

  .goods-item {
    display: flex;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .goods-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 14px;
        color: #333;
        line-height: 1.4;
      }

      .goods-spec {
        font-size: 12px;
        color: #999;
        margin-top: 2px;
      }

      .goods-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 4px;

        .price {
          color: #c82519;
          font-size: 15px;
          font-weight: 500;
        }

        .quantity {
          font-size: 13px;
          color: #999;
        }
      }
    }
  }
}

/* 金额汇总 */
.summary {
  background: #fff;
  margin: 10px 12px;
  border-radius: 8px;
  padding: 14px 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #666;
    padding: 6px 0;

    &.total {
      border-top: 1px solid #f0f0f0;
      margin-top: 4px;
      padding-top: 12px;
      font-size: 16px;
      font-weight: 600;
      color: #333;

      .total-price {
        color: #c82519;
        font-size: 20px;
        font-weight: bold;
      }
    }

    .free-shipping {
      color: #999;
      font-size: 13px;
    }
  }
}

/* 底部固定提交栏 */
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 10px 16px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
  z-index: 100;

  .total-label {
    font-size: 14px;
    color: #333;
    .total-price {
      color: #c82519;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .submit-btn {
    background: linear-gradient(to right, #ff5252, #f44336);
    border: none;
    color: #fff;
    font-size: 16px;
    padding: 0 28px;
    height: 44px;
    border-radius: 22px;
    font-weight: 500;
  }
}
</style>