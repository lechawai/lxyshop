<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { categories as menus } from '@/mockData';

// 顶部安全偏移量：标题距离滚动区域顶部的距离，可根据遮挡程度微调
const TOP_OFFSET = 12

const activeIndex = ref(0)
const rightScrollRef = ref(null)
const cateRefs = ref([])

// 点击左侧导航：右侧平滑滚动到对应分类
const handleNavClick = (index) => {
  activeIndex.value = index
  const targetEl = cateRefs.value[index]
  if (targetEl && rightScrollRef.value) {
    // 核心修复：减去顶部偏移量，让标题完整露出，不贴顶不遮挡
    const targetTop = targetEl.offsetTop - TOP_OFFSET
    rightScrollRef.value.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    })
  }
}

// 右侧滚动反向联动左侧高亮
const handleScroll = () => {
  const scrollTop = rightScrollRef.value.scrollTop
  for (let i = cateRefs.value.length - 1; i >= 0; i--) {
    const el = cateRefs.value[i]
    if (!el) continue
    // 同步偏移量，保证联动判断和点击位置一致
    if (el.offsetTop - TOP_OFFSET <= scrollTop) {
      activeIndex.value = i
      break
    }
  }
}

onMounted(() => {
  nextTick(() => {
    rightScrollRef.value.addEventListener('scroll', handleScroll)
  })
})

onUnmounted(() => {
  if (rightScrollRef.value) {
    rightScrollRef.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div class="menu">
    <div class="left">
      <ul>
        <li
          v-for="(item, index) in menus"
          :key="item.id"
          :class="{ active: activeIndex === index }"
          @click="handleNavClick(index)"
        >
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>

    <div class="right" ref="rightScrollRef">
      <ul>
        <li
          class="cate"
          v-for="(item, index) in menus"
          :key="item.id"
          :ref="el => { if (el) cateRefs[index] = el }"
        >
          <h4 class="title">{{ item.name }}</h4>
          <ul class="item">
            <li v-for="child in item.children" :key="child.id">
              <router-link :to="{name:'goodslist',params:{categoryId:child.id}}">
                <img :src="child.image" :alt="child.name">
                <span>{{ child.name }}</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li class="bottom-placeholder"></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  display: flex;
  position: absolute;
  text-align: center;
  top: 40px;
  bottom: 50px;
  width: 100%;
  overflow: hidden;

  .left {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f3f7;
    line-height: 55px;

    li {
      height: 55px;
      border-bottom: 1px solid #e1e1e1;
      cursor: pointer;
      transition: all 0.2s ease;

      &.active {
        background-color: #ffffff;
        p {
          color: red;
          font-weight: 500;
        }
      }
    }
  }

  .right {
    flex: 1;
    position: relative;
    overflow-y: auto;
    background-color: #ffffff;

    .cate {
      /* CSS层面预留滚动边距，双重保险 */
      scroll-margin-top: 12px;

      .title {
        margin: 0;
        text-align: left;
        font-size: 14px;
        color: #333333;
        font-weight: bold;
        margin: 10px;
      }

      .item {
        margin: 7px 10px 10px;
        display: flex;
        overflow: hidden;
        flex-flow: row wrap;

        li {
          width: 33.3%;

          a {
            display: block;
            color: inherit;
          }

          img {
            width: 70px;
            height: 70px;
          }

          span {
            display: inline-block;
            font-size: 14px;
            color: #333333;
          }
        }
      }
    }

    .bottom-placeholder {
      height: 70vh;
      list-style: none;
    }
  }
}
</style>