<script setup>
import { ref, computed, watch } from 'vue'
import { goods, categories } from '@/mockData'
import GoodsGrid from '@/components/GoodsGrid.vue'
import { showToast } from 'vant'

const props = defineProps({
  categoryId: { type: String, required: true },
})

const categoryName = computed(() => {
  for (const cat of categories) {
    const child = cat.children?.find(c => c.id === Number(props.categoryId))
    if (child) return child.name
  }
  return ''
})

const baseList = computed(() =>
  goods.filter(item => item.category_id === Number(props.categoryId))
)

const sortOptions = [
  { label: '综合排序', value: 'default' },
  { label: '销量优先', value: 'sales' },
  { label: '价格升序', value: 'priceAsc' },
  { label: '价格降序', value: 'priceDesc' },
]
const currentSort = ref('default')
const showSortPanel = ref(false)

const sortLabel = computed(() => sortOptions.find(o => o.value === currentSort.value)?.label ?? '综合排序')
const isSortActive = computed(() => currentSort.value !== 'default')
const isFilterActive = computed(() => showFilterPanel.value || priceMin.value !== '' || priceMax.value !== '')

const toggleSort = () => {
  if (showSortPanel.value) {
    showSortPanel.value = false
  } else {
    showSortPanel.value = true
    showFilterPanel.value = false
  }
}

const onSortChange = (value) => {
  currentSort.value = value
  showSortPanel.value = false
}

const onOverlayClick = () => {
  showSortPanel.value = false
  showFilterPanel.value = false
}

const showFilterPanel = ref(false)
const priceMin = ref('')
const priceMax = ref('')
const priceMinTemp = ref('')
const priceMaxTemp = ref('')

const openFilter = () => {
  if (showFilterPanel.value) {
    showFilterPanel.value = false
  } else {
    priceMinTemp.value = priceMin.value
    priceMaxTemp.value = priceMax.value
    showFilterPanel.value = true
    showSortPanel.value = false
  }
}

const onFilterConfirm = () => {
  const min = priceMinTemp.value.trim()
  const max = priceMaxTemp.value.trim()
  if (min !== '' && max !== '' && Number(min) > Number(max)) {
    showToast('价格区间输入有误')
    return
  }
  priceMin.value = min
  priceMax.value = max
  showFilterPanel.value = false
}

const onFilterReset = () => {
  priceMinTemp.value = ''
  priceMaxTemp.value = ''
}

const onInputFilter = (field, value) => {
  if (field === 'min') {
    priceMinTemp.value = value.replace(/[^0-9]/g, '')
  } else {
    priceMaxTemp.value = value.replace(/[^0-9]/g, '')
  }
}

const finalList = computed(() => {
  let list = [...baseList.value]
  const min = priceMin.value
  const max = priceMax.value
  if (min !== '' && max !== '') {
    list = list.filter(item => Number(item.price) >= Number(min) && Number(item.price) <= Number(max))
  } else if (min !== '') {
    list = list.filter(item => Number(item.price) >= Number(min))
  } else if (max !== '') {
    list = list.filter(item => Number(item.price) <= Number(max))
  }
  if (currentSort.value === 'sales') {
    list.sort((a, b) => b.stock - a.stock)
  } else if (currentSort.value === 'priceAsc') {
    list.sort((a, b) => Number(a.price) - Number(b.price))
  } else if (currentSort.value === 'priceDesc') {
    list.sort((a, b) => Number(b.price) - Number(a.price))
  }
  return list
})

watch(() => props.categoryId, () => {
  currentSort.value = 'default'
  priceMin.value = ''
  priceMax.value = ''
  priceMinTemp.value = ''
  priceMaxTemp.value = ''
  showSortPanel.value = false
  showFilterPanel.value = false
})
</script>

<template>
  <div class="goods-list-page">
    <div class="category-header">
      <h2 class="category-name">{{ categoryName }}</h2>
      <p class="category-count">共{{ baseList.length }}件商品</p>
    </div>

    <div class="top-bar">
      <div class="sort-trigger" :class="{ active: isSortActive }" @click="toggleSort">
        <span>{{ sortLabel }}</span>
        <van-icon :name="showSortPanel ? 'arrow-up' : 'arrow-down'" size="12" />
      </div>
      <div class="filter-trigger" :class="{ active: isFilterActive }" @click="openFilter">
        <span>筛选</span>
        <van-icon :name="showFilterPanel ? 'arrow-up' : 'arrow-down'" size="12" />
      </div>
    </div>

    <div class="content-area">
      <Transition name="overlay-fade">
        <div v-if="showSortPanel || showFilterPanel" class="overlay" @click="onOverlayClick" />
      </Transition>

      <Transition name="panel-drop">
        <div v-if="showSortPanel" class="sort-panel">
          <div
            v-for="item in sortOptions"
            :key="item.value"
            class="sort-item"
            :class="{ active: currentSort === item.value }"
            @click="onSortChange(item.value)"
          >
            <span>{{ item.label }}</span>
            <van-icon v-if="currentSort === item.value" name="success" color="#1989fa" size="16" />
          </div>
        </div>
      </Transition>

      <Transition name="panel-drop">
        <div v-if="showFilterPanel" class="filter-panel">
          <div class="filter-title">价格区间</div>
          <div class="filter-inputs">
            <input
              :value="priceMinTemp"
              type="text"
              inputmode="numeric"
              placeholder="最低价"
              @input="onInputFilter('min', $event.target.value)"
            />
            <span class="divider">-</span>
            <input
              :value="priceMaxTemp"
              type="text"
              inputmode="numeric"
              placeholder="最高价"
              @input="onInputFilter('max', $event.target.value)"
            />
          </div>
          <div class="filter-buttons">
            <button class="btn-reset" @click="onFilterReset">重置</button>
            <button class="btn-confirm" @click="onFilterConfirm">确定</button>
          </div>
        </div>
      </Transition>

      <div class="goods-content">
        <van-empty v-if="finalList.length === 0" description="暂无符合条件的商品" />
        <GoodsGrid v-else :list="finalList" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.goods-list-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}

.category-header {
  background: #fff;
  padding: 16px 16px 8px;

  .category-name {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin: 0 0 4px;
  }

  .category-count {
    font-size: 12px;
    color: #999;
    margin: 0;
  }
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;

  .sort-trigger,
  .filter-trigger {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    padding: 4px 0;

    &.active {
      color: #1989fa;
    }
  }
}

.content-area {
  flex: 1;
  position: relative;
  min-height: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.sort-panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;

  .sort-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    font-size: 14px;
    color: #333;
    cursor: pointer;

    &.active {
      color: #1989fa;
    }

    &:active {
      background: #f5f5f5;
    }
  }
}

.filter-panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background: #fff;
  padding: 20px 16px;
  border-bottom: 1px solid #f0f0f0;

  .filter-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 16px;
  }

  .filter-inputs {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;

    input {
      flex: 1;
      min-width: 0;
      height: 40px;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 0 12px;
      font-size: 14px;
      text-align: center;
      outline: none;
      background: #f8f8f8;

      &:focus {
        border-color: #1989fa;
        background: #fff;
      }

      &::placeholder {
        color: #ccc;
      }
    }

    .divider {
      color: #ccc;
      font-size: 16px;
      flex-shrink: 0;
    }
  }

  .filter-buttons {
    display: flex;
    gap: 12px;

    button {
      flex: 1;
      height: 40px;
      border-radius: 20px;
      font-size: 14px;
      cursor: pointer;
      border: none;

      &.btn-reset {
        background: #f5f5f5;
        color: #333;
      }

      &.btn-confirm {
        background: #1989fa;
        color: #fff;
      }

      &:active {
        opacity: 0.8;
      }
    }
  }
}

.goods-content {
  height: 100%;
  overflow-y: auto;
  padding-bottom: 60px;
  -webkit-overflow-scrolling: touch;
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

.panel-drop-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.panel-drop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.panel-drop-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.panel-drop-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
