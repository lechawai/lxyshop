<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showToast, showLoadingToast, closeToast } from 'vant'
import { useOrderStore } from '@/stores/order'

const router = useRouter()
const route = useRoute()
const orderStore = useOrderStore()

// 从路由参数获取订单ID
const orderId = computed(() => Number(route.params.orderId))

// 查找订单
const order = computed(() => {
  return orderStore.orderList.find(item => item.id === orderId.value)
})

// 订单是否存在且状态为待付款
const isValidOrder = computed(() => {
  return order.value && order.value.status === '待付款'
})

// 支付金额
const totalPrice = computed(() => {
  if (!order.value) return 0
  return Number(order.value.price) * order.value.quantity
})

// 支付方式
const paymentMethods = [
  { label: '微信支付', value: 'wechat', icon: '微', color: '#07c160' },
  { label: '支付宝', value: 'alipay', icon: '支', color: '#1677ff' },
  { label: '银行卡支付', value: 'bank', icon: '银', color: '#ff8c00' }
]
const selectedPayment = ref('wechat')

// 密码弹层
const showPassword = ref(false)
const password = ref('')
const paying = ref(false)

// 当前选中的支付方式对象
const currentMethod = computed(() => {
  return paymentMethods.find(m => m.value === selectedPayment.value)
})

// 打开密码弹层
const openPassword = () => {
  if (!isValidOrder.value) {
    showToast({ message: '订单状态异常', className: 'custom-toast warn-toast', icon: 'warning-o', position: 'top' })
    return
  }
  password.value = ''
  showPassword.value = true
  paying.value = false
}

// 关闭密码弹层
const closePassword = () => {
  showPassword.value = false
  password.value = ''
}

// 支付处理
const processPayment = () => {
  if (paying.value) return
  paying.value = true
  showPassword.value = false

  showLoadingToast({
    message: '支付中...',
    forbidClick: true,
    duration: 0,
  })

  setTimeout(() => {
    closeToast()
    const success = orderStore.payOrder(orderId.value)
    if (success) {
      showToast({ message: '支付成功', className: 'custom-toast success-toast', position: 'top' })
      router.back()
    } else {
      showToast({ message: '支付失败，请重试', className: 'custom-toast warn-toast', icon: 'warning-o', position: 'top' })
      paying.value = false
    }
  }, 1500)
}

// 监听密码输入，满6位自动提交
watch(password, (newVal) => {
  if (newVal.length === 6 && !paying.value && isValidOrder.value) {
    processPayment()
  }
})
</script>

<template>
  <div class="payment-page">
    <!-- 订单不存在 -->
    <van-empty v-if="!order" description="订单不存在" />

    <!-- 订单已存在且可支付 -->
    <template v-else-if="isValidOrder">
      <!-- 订单卡片 -->
      <div class="order-card">
        <div class="order-no">订单号：{{ order.orderNo }}</div>
        <div class="order-item">
          <van-image :src="order.image" width="80" height="80" fit="cover" />
          <div class="item-info">
            <div class="name">{{ order.name }}</div>
            <div class="spec">{{ order.spec }}</div>
            <div class="bottom">
              <span class="price">¥{{ Number(order.price).toFixed(2) }}</span>
              <span class="qty">x{{ order.quantity }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 支付金额 -->
      <div class="amount-section">
        <span class="label">支付金额</span>
        <span class="amount">¥{{ totalPrice.toFixed(2) }}</span>
      </div>

      <!-- 支付方式 -->
      <div class="payment-methods">
        <div class="method-title">选择支付方式</div>
        <van-radio-group v-model="selectedPayment">
          <van-cell-group inset>
            <van-cell
              v-for="method in paymentMethods"
              :key="method.value"
              :title="method.label"
              clickable
              @click="selectedPayment = method.value"
            >
              <template #icon>
                <div class="method-icon" :style="{ backgroundColor: method.color }">
                  {{ method.icon }}
                </div>
              </template>
              <template #right-icon>
                <van-radio :name="method.value" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>

      <!-- 底部确认按钮 -->
      <div class="bottom-bar">
        <van-button class="confirm-btn" type="primary" round block @click="openPassword">
          确认支付 ¥{{ totalPrice.toFixed(2) }}
        </van-button>
      </div>
    </template>

    <!-- 订单状态非待付款 -->
    <van-empty v-else description="该订单不可支付" />
  </div>

  <!-- ★ 密码弹层：使用自定义遮罩 + 绝对定位 ★ -->
  <div v-if="showPassword" class="password-overlay" @click="closePassword">
    <!-- 密码卡片：居中 -->
    <div class="password-popup" @click.stop>
      <div class="popup-title">请输入支付密码</div>
      <!-- ★ 支付金额 ★ -->
      <div class="popup-amount">¥{{ totalPrice.toFixed(2) }}</div>
      <!-- ★ 支付方式 ★ -->
      <div class="popup-method">{{ currentMethod?.label || '微信支付' }}</div>

      <!-- ★ 密码点 ★ -->
      <div class="password-dots">
        <span
          v-for="i in 6"
          :key="i"
          class="dot"
          :class="{ filled: i <= password.length }"
        ></span>
      </div>

      <div class="popup-actions">
        <van-button size="small" plain @click="closePassword">取消</van-button>
      </div>
    </div>

    <!-- ★ 数字键盘：固定在底部 ★ -->
    <div class="keyboard-wrapper" @click.stop>
      <van-number-keyboard
        v-model="password"
        :show="showPassword"
        :maxlength="6"
        :hide-on-click-outside="false"
        safe-height="0"
        theme="custom"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.payment-page {
  background: #f5f5f5;
  min-height: 100vh;
  padding: 12px 16px 80px;
}

.order-card {
  background: #fff;
  border-radius: 8px;
  padding: 14px 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

  .order-no {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }

  .order-item {
    display: flex;
    gap: 12px;
    align-items: center;

    .item-info {
      flex: 1;
      .name {
        font-size: 14px;
        color: #333;
        margin-bottom: 2px;
      }
      .spec {
        font-size: 12px;
        color: #999;
        margin-bottom: 6px;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price {
          color: #c82519;
          font-size: 15px;
          font-weight: 500;
        }
        .qty {
          font-size: 13px;
          color: #999;
        }
      }
    }
  }
}

.amount-section {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

  .label {
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }
  .amount {
    font-size: 24px;
    color: #c82519;
    font-weight: bold;
  }
}

.payment-methods {
  background: #fff;
  border-radius: 8px;
  margin-top: 10px;
  padding: 12px 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

  .method-title {
    padding: 0 16px 8px;
    font-size: 16px;
    color: #333;
    font-weight: 500;
    border-bottom: 1px solid #f0f0f0;
  }

  .method-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    margin-right: 12px;
  }

  :deep(.van-cell-group) {
    margin: 0;
  }
  :deep(.van-cell) {
    padding: 12px 16px;
    align-items: center;
  }
  :deep(.van-radio) {
    margin-left: auto;
  }
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: #fff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
  z-index: 100;

  .confirm-btn {
    height: 48px;
    background: linear-gradient(to right, #ff5252, #f44336);
    border: none;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    border-radius: 24px;
  }
}

/* ★ 密码弹层：自定义遮罩 ★ */
.password-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 300;
}

/* ★ 密码卡片：居中 ★ */
.password-popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  background: #fff;
  border-radius: 16px;
  padding: 28px 24px 20px;
  width: 340px;
  max-width: 92vw;
  text-align: center;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);

  .popup-title {
    font-size: 18px;
    color: #333;
    font-weight: 500;
    margin-bottom: 6px;
  }

  /* ★ 支付金额 ★ */
  .popup-amount {
    font-size: 36px;
    color: #c82519;
    font-weight: bold;
    margin: 8px 0 4px;
    letter-spacing: 1px;
  }

  /* ★ 支付方式 ★ */
  .popup-method {
    font-size: 14px;
    color: #666;
    background: #f0f0f0;
    display: inline-block;
    padding: 4px 20px;
    border-radius: 14px;
    margin-bottom: 18px;
  }

  /* ★ 密码点 ★ */
  .password-dots {
    display: flex;
    justify-content: center;
    gap: 14px;
    margin: 6px 0 16px;

    .dot {
      width: 38px;
      height: 38px;
      border: 2px solid #ddd;
      border-radius: 50%;
      background: #fafafa;
      transition: all 0.2s;

      &.filled {
        border-color: #1989fa;
        background: #1989fa;
        &::after {
          content: '';
          display: block;
          width: 14px;
          height: 14px;
          background: #fff;
          border-radius: 50%;
          margin: 10px auto 0;
        }
      }
    }
  }

  .popup-actions {
    .van-button {
      color: #999;
    }
  }
}

/* ★ 键盘：固定在底部 ★ */
.keyboard-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>