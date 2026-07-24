<script setup>
import { useRouter } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'
import { useCartstore } from '@/stores/cart'

const router = useRouter()
const cart = useCartstore()

// 跳转结算页
const goCheckout = () => {
  const selected = cart.items.filter((item) => item.checked)
  if (selected.length === 0) {
    showToast('请勾选需要结算的商品')
    return
  }
  router.push({ name: 'checkout' })
}

// 一键清空弹窗确认
const handleClearAll = async () => {
  if (cart.items.length === 0) {
    showToast('购物车暂无商品')
    return
  }
  try {
    await showConfirmDialog({
      title: '清空购物车',
      message: '确定要删除所有商品吗？',
    })
    cart.clearAllCart()
    showToast('已清空购物车')
  } catch {
    // 取消弹窗不做操作
  }
}
</script>

<template>
  <div class="cart">
    <van-empty v-if="cart.items.length === 0" description="购物车目前还没有商品">
      <router-link to="/">
        <van-button type="primary">去购物</van-button>
      </router-link>
    </van-empty>

    <van-swipe-cell v-for="item in cart.items" :key="item.id" class="cart-item">
      <div class="row">
        <van-checkbox :name="item.id" v-model="item.checked" />
        <van-image width="60" height="60" :src="item.image" />
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="bottom">
            <span class="price">￥<span class="symbol">{{ item.price }}</span></span>
            <van-stepper v-model="item.quantity" theme="round" button-size="22" disable-input />
          </div>
        </div>
      </div>
      <template #right>
        <van-button square type="danger" text="删除" class="delete-button" @click="cart.removeItem(item.id)" />
      </template>
    </van-swipe-cell>

    <van-submit-bar
      v-if="cart.items.length > 0"
      :price="Math.round(cart.totalPrice * 100)"
      button-text="去结算"
      @submit="goCheckout"
    >
      <van-checkbox v-model="cart.isAllChecked">全选</van-checkbox>
      <van-button size="mini" style="margin-left: 8px" @click="cart.reverseCheck">反选</van-button>
      <van-button size="mini" type="warning" style="margin-left: 8px" @click="handleClearAll">一键清空</van-button>
    </van-submit-bar>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  padding: 10px;
}
.cart-item {
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 0 5px #ccc;
  overflow: hidden;
}
.row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #fff;
}
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60px;

  .name {
    font-size: 14px;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .price {
    color: #c82519;
    font-size: 16px;
    .symbol {
      font-size: 12px;
    }
  }
}
.delete-button {
  height: 100%;
}
:deep(.van-submit-bar) {
  bottom: var(--van-tabbar-height);
}
</style>