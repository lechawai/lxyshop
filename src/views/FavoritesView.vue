<script setup></script>

<template>
  <div class="favorites-list">
    <van-empty description="暂无收藏" />

    <van-swipe-cell>
      <div class="fav-item">
        <van-image width="80" height="80" radius="4" />
        <div class="fav-info">
          <div class="fav-name">连衣裙</div>
          <div class="fav-spec">均码</div>
          <div class="fav-price">199</div>
        </div>
      </div>

      <template #right>
        <van-button square type="danger" text="取消收藏" class="delete-btn" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<style lang="scss">
.favorites-list{
    padding: 10px;
}.fav-item {
  display: flex;
  gap: 12px;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;

  .fav-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .fav-name {
      font-size: 15px;
      color: #333;
      font-weight: 500;
    }

    .fav-spec {
      font-size: 12px;
      color: #999;
    }

    .fav-price {
      font-size: 16px;
      color: #c82519;
      font-weight: bold;
    }
  }
}

.delete-btn {
  height: 100%;
}
</style>