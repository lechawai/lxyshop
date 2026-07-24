<script setup>
import { useRouter, useRoute } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'
import { useAddressStore } from '@/stores/address'

const router = useRouter()
const route = useRoute()
const addressStore = useAddressStore()

const goToAdd = () => {
  router.push({ name: 'addressEdit', query: { mode: 'add' } })
}

const goToEdit = (id) => {
  router.push({ name: 'addressEdit', query: { mode: 'edit', id: String(id) } })
}

/**
 * ★ 新增：地址卡片点击（支持 from=checkout 模式）★
 */
const onAddressClick = (addr) => {
  // 如果是从 checkout 页面来的，则选择地址并返回
  if (route.query.from === 'checkout') {
    router.replace({
      path: '/checkout',
      query: { addressId: addr.id, mode: route.query.mode || undefined },
    })
    return
  }
  // 否则进入编辑页
  goToEdit(addr.id)
}

/**
 * 删除地址：
 * - 默认地址 + 有多个地址 → 阻止删除，提示"默认地址不可删除"
 * - 默认地址 + 只有一个地址 → 允许删除（删除后列表为空）
 * - 非默认地址 → 允许删除
 */
const handleDelete = async (id) => {
  const addr = addressStore.getAddress(id)
  if (!addr) return

  if (addr.isDefault && addressStore.totalCount > 1) {
    showToast({
      message: '默认地址不可删除',
      className: 'custom-toast warn-toast',
      icon: 'warning-o',
      position: 'top',
    })
    return
  }

  if (addr.isDefault && addressStore.totalCount === 1) {
    const result = addressStore.deleteAddress(id)
    if (result.success) {
      showToast({ message: '已删除', className: 'custom-toast success-toast', position: 'top' })
    }
    return
  }

  try {
    await showConfirmDialog({
      title: '删除地址',
      message: `确认删除「${addr.name}」的收货地址吗？`,
    })
    const result = addressStore.deleteAddress(id)
    if (result.success) {
      showToast({ message: result.message, className: 'custom-toast success-toast', position: 'top' })
    }
  } catch {
    // 用户取消
  }
}

const handleSetDefault = (id) => {
  const success = addressStore.setDefault(id)
  if (success) {
    showToast({ message: '已设为默认地址', className: 'custom-toast success-toast', position: 'top' })
  }
}

/**
 * 取消默认：
 * - 有多个地址 → 将默认转移给第一个其他地址
 * - 只有一个地址 → 直接取消默认（该地址变为非默认，此时可删除）
 */
const handleCancelDefault = async (id) => {
  const currentDefault = addressStore.defaultAddress
  if (!currentDefault) return

  const others = addressStore.addressList.filter((addr) => addr.id !== id)

  if (others.length === 0) {
    try {
      await showConfirmDialog({
        title: '取消默认地址',
        message: `确认取消「${currentDefault.name}」的默认地址状态吗？取消后该地址将变为非默认地址。`,
      })
      const success = addressStore.cancelDefault(id)
      if (success) {
        showToast({ message: '已取消默认地址', className: 'custom-toast success-toast', position: 'top' })
      }
    } catch {
      // 用户取消
    }
    return
  }

  try {
    await showConfirmDialog({
      title: '取消默认地址',
      message: `将把默认地址转移给「${others[0].name}」的地址，确认继续吗？`,
    })
    const success = addressStore.setDefault(others[0].id)
    if (success) {
      showToast({ message: '已取消默认，转移给其他地址', className: 'custom-toast success-toast', position: 'top' })
    }
  } catch {
    // 用户取消
  }
}

const formatFullAddress = (addr) => {
  return `${addr.province}${addr.city}${addr.district}${addr.detail}`
}
</script>

<template>
  <div class="address-list-page">
    <!-- 空状态 -->
    <van-empty v-if="addressStore.totalCount === 0" description="暂无收货地址">
      <van-button round type="primary" @click="goToAdd">新增地址</van-button>
    </van-empty>

    <!-- 地址列表 -->
    <div v-else class="address-list">
      <van-swipe-cell
        v-for="addr in addressStore.addressList"
        :key="addr.id"
        class="address-item-wrap"
      >
        <div class="address-card" @click.stop="onAddressClick(addr)">
          <div class="card-top">
            <span class="name">{{ addr.name }}</span>
            <span class="phone">{{ addr.phone }}</span>
            <van-tag v-if="addr.isDefault" type="danger" size="small" round>默认</van-tag>
          </div>

          <div class="card-address">{{ formatFullAddress(addr) }}</div>

          <div class="card-actions">
            <div class="action-left">
              <span
                v-if="!addr.isDefault"
                class="set-default"
                @click.stop="handleSetDefault(addr.id)"
              >
                设为默认
              </span>
              <span
                v-else
                class="cancel-default"
                @click.stop="handleCancelDefault(addr.id)"
              >
                取消默认
              </span>
            </div>
            <div class="action-right">
              <van-icon name="edit" class="action-icon" @click.stop="goToEdit(addr.id)" />
              <van-icon name="delete-o" class="action-icon" @click.stop="handleDelete(addr.id)" />
            </div>
          </div>
        </div>

        <template #right>
          <van-button square type="danger" text="删除" class="delete-btn" @click="handleDelete(addr.id)" />
        </template>
      </van-swipe-cell>
    </div>

    <div class="bottom-btn-wrap">
      <van-button type="primary" block round size="large" @click="goToAdd">
        <van-icon name="plus" /> 新增地址
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.address-list-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 80px;
}

.address-list {
  padding: 10px 12px;
}

.address-item-wrap {
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
}

.address-card {
  background: #fff;
  padding: 14px 16px;
  border-radius: 8px;
  cursor: pointer;

  .card-top {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;

    .name {
      font-size: 15px;
      font-weight: 600;
      color: #333;
    }

    .phone {
      font-size: 13px;
      color: #666;
    }
  }

  .card-address {
    font-size: 13px;
    color: #888;
    line-height: 1.6;
    margin-bottom: 10px;
  }

  .card-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid #f0f0f0;

    .action-left {
      display: flex;
      gap: 12px;

      .set-default {
        font-size: 12px;
        color: #1989fa;
        cursor: pointer;
        padding: 2px 6px;

        &:active {
          opacity: 0.6;
        }
      }

      .cancel-default {
        font-size: 12px;
        color: #ff6b6b;
        cursor: pointer;
        padding: 2px 6px;

        &:active {
          opacity: 0.6;
        }
      }
    }

    .action-right {
      display: flex;
      gap: 16px;

      .action-icon {
        font-size: 18px;
        color: #999;
        cursor: pointer;

        &:active {
          opacity: 0.6;
        }
      }
    }
  }
}

.delete-btn {
  height: 100%;
  border-radius: 0;
}

.bottom-btn-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: #fff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
  z-index: 100;

  .van-button {
    height: 48px;
    font-size: 16px;
  }
}

:deep(.van-empty) {
  margin-top: 60px;

  .van-empty__description {
    font-size: 14px;
    color: #999;
  }

  .van-button {
    margin-top: 16px;
  }
}
</style>