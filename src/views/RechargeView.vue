<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'

const phone = ref('')
const amount = ref(100)

const amounts = [50, 100, 200, 300, 500]

const handleRecharge = () => {
  if (!phone.value || phone.value.length !== 11) {
    showToast({ message: '请输入正确的手机号', className: 'custom-toast warn-toast', icon: 'warning-o', position: 'top' })
    return
  }
  showToast({ message: `充值 ${amount.value} 元成功！`, className: 'custom-toast success-toast', position: 'top' })
  phone.value = ''
}
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1>⚡ 立即充值</h1>
      <p>话费秒到 · 安全快捷</p>
    </div>

    <div class="recharge-card">
      <div class="input-group">
        <label>手机号码</label>
        <van-field
          v-model="phone"
          type="tel"
          placeholder="请输入手机号"
          maxlength="11"
          clearable
        />
      </div>

      <div class="amount-group">
        <label>选择金额</label>
        <div class="amount-options">
          <span
            v-for="a in amounts"
            :key="a"
            class="amount-item"
            :class="{ active: amount === a }"
            @click="amount = a"
          >
            ¥{{ a }}
          </span>
        </div>
      </div>

      <van-button class="recharge-btn" round block type="primary" @click="handleRecharge">
        确认充值 ¥{{ amount }}
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background: #f5f5f5;
  min-height: 100vh;
  padding: 12px 16px 80px;
}
.page-header {
  text-align: center;
  padding: 16px 0;
  h1 {
    font-size: 24px;
    color: #333;
    margin: 0;
  }
  p {
    font-size: 14px;
    color: #999;
    margin: 4px 0 0;
  }
}
.recharge-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);

  .input-group {
    margin-bottom: 20px;
    label {
      font-size: 14px;
      color: #333;
      font-weight: 500;
      display: block;
      margin-bottom: 6px;
    }
    :deep(.van-field) {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 8px 12px;
    }
  }

  .amount-group {
    margin-bottom: 24px;
    label {
      font-size: 14px;
      color: #333;
      font-weight: 500;
      display: block;
      margin-bottom: 10px;
    }
    .amount-options {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      .amount-item {
        padding: 8px 20px;
        border: 2px solid #e8e8e8;
        border-radius: 20px;
        font-size: 15px;
        color: #333;
        cursor: pointer;
        transition: all 0.2s;
        &.active {
          border-color: #c82519;
          color: #c82519;
          background: #fff5f5;
        }
        &:active {
          opacity: 0.6;
        }
      }
    }
  }

  .recharge-btn {
    height: 48px;
    background: linear-gradient(to right, #ff6b6b, #c82519);
    border: none;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>