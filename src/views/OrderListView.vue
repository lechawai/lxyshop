<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'
import { useOrderStore } from '@/stores/order'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()

// 页签列表
const tabs = ['全部', '待付款', '待收货', '待评价', '退款/售后']

// 默认激活的页签来自地址栏 ?status，没有就显示"全部"
const active = ref(route.query.status || '全部')

// 按当前页签筛选订单
const filteredOrders = computed(() => {
  if (active.value === '全部') {
    return orderStore.orderList
  }
  return orderStore.orderList.filter((order) => order.status === active.value)
})

/**
 * 将状态值转换为合法的 CSS 类名
 * 例如："退款/售后" -> "refund"
 */
const statusClass = (status) => {
  const map = {
    '待付款': 'pending',
    '待收货': 'shipping',
    '待评价': 'review',
    '退款/售后': 'refund'
  }
  return map[status] || status
}

// 取消订单
const handleCancelOrder = async (orderId) => {
  try {
    await showConfirmDialog({
      title: '取消订单',
      message: '确定要取消该订单吗？',
    })
    const success = orderStore.cancelOrder(orderId)
    if (success) {
      showToast({ message: '订单已取消', className: 'custom-toast success-toast', position: 'top' })
    } else {
      showToast({ message: '取消失败', className: 'custom-toast warn-toast', icon: 'warning-o', position: 'top' })
    }
  } catch {
    // 用户取消
  }
}

// 去付款：跳转到支付页
const goPayment = (orderId) => {
  router.push({ name: 'payment', params: { orderId } })
}
</script>

<template>
  <van-tabs v-model:active="active">
    <van-tab v-for="tab in tabs" :key="tab" :title="tab" :name="tab" />
  </van-tabs>

  <van-empty v-if="filteredOrders.length === 0" description="暂无相关订单" />

  <div v-else class="order-list">
    <div class="order" v-for="order in filteredOrders" :key="order.id">
      <!-- 订单头部 -->
      <div class="order-head">
        <span class="order-no">订单号：{{ order.orderNo }}</span>
        <span class="status" :class="statusClass(order.status)">{{ order.status }}</span>
      </div>

      <!-- 商品信息 -->
      <div class="order-body">
        <van-image width="60" height="60" :src="order.image" fit="cover" />
        <div class="info">
          <div class="name">{{ order.name }}</div>
          <div class="spec">{{ order.spec }}</div>
        </div>
        <div class="right">
          <div class="price">¥{{ Number(order.price).toFixed(2) }}</div>
          <div class="qty">x{{ order.quantity }}</div>
        </div>
      </div>

      <!-- 底部：时间和操作按钮 -->
      <div class="order-foot">
        <span class="date">下单时间：{{ order.date }}</span>
        <div v-if="order.status === '待付款'" class="actions">
          <van-button size="small" plain type="default" @click.stop="handleCancelOrder(order.id)">取消订单</van-button>
          <van-button size="small" type="danger" @click.stop="goPayment(order.id)">去付款</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-list {
  padding: 10px;

  .order {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 5px #eee;
    margin-top: 10px;
    padding: 12px;

    .order-head {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #999;
      margin-bottom: 8px;

      .order-no {
        font-size: 12px;
        color: #999;
      }

      .status {
        font-weight: 500;
      }
      .status.pending {
        color: #f44336;
      }
      .status.shipping {
        color: #ff9800;
      }
      .status.review {
        color: #2196f3;
      }
      .status.refund {
        color: #9e9e9e;
      }
    }

    .order-body {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 0;

      .info {
        flex: 1;
        .name {
          font-size: 14px;
          color: #333;
        }
        .spec {
          font-size: 12px;
          color: #999;
          margin-top: 2px;
        }
      }

      .right {
        text-align: right;
        .price {
          color: #c82519;
          font-size: 15px;
          font-weight: 500;
        }
        .qty {
          font-size: 12px;
          color: #999;
          margin-top: 2px;
        }
      }
    }

    .order-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      border-top: 1px solid #f0f0f0;
      margin-top: 8px;

      .date {
        font-size: 12px;
        color: #999;
      }

      .actions {
        display: flex;
        gap: 8px;

        .van-button {
          height: 28px;
          padding: 0 12px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>