<script setup>
import { showToast } from 'vant'

const handleCall = () => {
  showToast({ message: '拨打电话 400-888-9999', className: 'custom-toast', position: 'top' })
}

const handleChat = () => {
  showToast({ message: '在线客服接入中...', className: 'custom-toast', position: 'top' })
}
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1>💬 我的客服</h1>
      <p>贴心服务 · 有问必答</p>
    </div>

    <div class="service-card">
      <div class="service-item" @click="handleChat">
        <div class="icon-wrap">
          <van-icon name="chat-o" size="32" color="#1989fa" />
        </div>
        <div class="info">
          <div class="title">在线客服</div>
          <div class="desc">人工服务 · 即时响应</div>
        </div>
        <van-icon name="arrow" class="arrow" />
      </div>

      <div class="service-item" @click="handleCall">
        <div class="icon-wrap">
          <van-icon name="phone-o" size="32" color="#07c160" />
        </div>
        <div class="info">
          <div class="title">电话客服</div>
          <div class="desc">400-888-9999</div>
        </div>
        <van-icon name="arrow" class="arrow" />
      </div>

      <div class="service-item">
        <div class="icon-wrap">
          <van-icon name="clock-o" size="32" color="#ff9800" />
        </div>
        <div class="info">
          <div class="title">服务时间</div>
          <div class="desc">周一至周日 9:00 - 21:00</div>
        </div>
      </div>

      <div class="service-item">
        <div class="icon-wrap">
          <van-icon name="edit" size="32" color="#9e9e9e" />
        </div>
        <div class="info">
          <div class="title">意见反馈</div>
          <div class="desc">您的建议是我们成长的动力</div>
        </div>
        <van-icon name="arrow" class="arrow" />
      </div>
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
.service-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);

  .service-item {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background 0.2s;

    &:last-child {
      border-bottom: none;
    }
    &:active {
      background: #f8f8f8;
    }

    .icon-wrap {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .info {
      flex: 1;
      margin-left: 14px;
      .title {
        font-size: 15px;
        color: #333;
        font-weight: 500;
      }
      .desc {
        font-size: 13px;
        color: #999;
        margin-top: 2px;
      }
    }

    .arrow {
      color: #ccc;
      font-size: 16px;
    }
  }
}
</style>