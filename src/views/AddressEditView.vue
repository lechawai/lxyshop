<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showToast } from 'vant'
import { useAddressStore } from '@/stores/address'

// 导入省市区数据并转换为 van-picker 可用的数组格式
import { areaList } from '@vant/area-data'

// ---------- 转换 areaList 为嵌套数组 ----------
const getAreaColumns = () => {
  const { province_list, city_list, county_list } = areaList

  // 提取省份列表
  const provinces = Object.keys(province_list).map((provCode) => ({
    text: province_list[provCode],
    value: provCode,
    children: [],
  }))

  // 为每个省份填充城市
  provinces.forEach((prov) => {
    const cityCodes = Object.keys(city_list).filter((code) =>
      code.startsWith(prov.value.slice(0, 2))
    )
    prov.children = cityCodes.map((cityCode) => ({
      text: city_list[cityCode],
      value: cityCode,
      children: [],
    }))

    // 为每个城市填充区县
    prov.children.forEach((city) => {
      const countyCodes = Object.keys(county_list).filter((code) =>
        code.startsWith(city.value.slice(0, 4))
      )
      city.children = countyCodes.map((countyCode) => ({
        text: county_list[countyCode],
        value: countyCode,
      }))
    })
  })

  return provinces
}

// ---------- 辅助：根据省市区编码获取完整名称 ----------
const getRegionName = (provCode, cityCode, districtCode) => {
  if (!provCode || !cityCode || !districtCode) return ''
  const province = areaList.province_list[provCode] || ''
  const city = areaList.city_list[cityCode] || ''
  const district = areaList.county_list[districtCode] || ''
  return `${province}${city}${district}`
}

const router = useRouter()
const route = useRoute()
const addressStore = useAddressStore()

// ---------- 路由参数 ----------
const mode = computed(() => route.query.mode || 'add')
const editId = computed(() => {
  const id = route.query.id
  return id ? Number(id) : null
})

const submitText = computed(() => (mode.value === 'add' ? '添加地址' : '保存修改'))

// ---------- 表单数据 ----------
const form = reactive({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detail: '',
  isDefault: false,
})

const regionText = ref('')
const showAreaPicker = ref(false)
const formRef = ref(null)
const isEditMode = computed(() => mode.value === 'edit')

// ---------- 省市区选择器数据 ----------
const areaColumns = getAreaColumns()

// ---------- 表单校验规则 ----------
const rules = {
  name: [
    { required: true, message: '请输入收货人姓名' },
    { pattern: /^.{2,20}$/, message: '姓名长度 2~20 个字符' },
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { pattern: /^\d{11}$/, message: '手机号必须为 11 位数字' },
  ],
  region: [
    { required: true, message: '请选择省市区', validator: () => !!regionText.value },
  ],
  detail: [
    { required: true, message: '请输入详细地址' },
    { pattern: /^.{5,100}$/, message: '详细地址长度 5~100 个字符' },
  ],
}

// ---------- 方法 ----------
const loadEditData = () => {
  if (!isEditMode.value || !editId.value) return

  const addr = addressStore.getAddress(editId.value)
  if (!addr) {
    showToast({ message: '地址不存在', className: 'custom-toast warn-toast', icon: 'warning-o', position: 'top' })
    router.back()
    return
  }

  form.name = addr.name
  form.phone = addr.phone
  form.province = addr.province
  form.city = addr.city
  form.district = addr.district
  form.detail = addr.detail
  form.isDefault = addr.isDefault

  regionText.value = getRegionName(addr.province, addr.city, addr.district)
}

const openAreaPicker = () => {
  showAreaPicker.value = true
}

// 省市区选择确认
const onAreaConfirm = ({ selectedValues, selectedOptions }) => {
  // selectedValues: [省编码, 市编码, 区编码]
  if (selectedValues.length === 3) {
    const [provCode, cityCode, distCode] = selectedValues
    form.province = provCode
    form.city = cityCode
    form.district = distCode
    // 使用转换函数获取显示文本（或从 selectedOptions 中提取）
    const provName = selectedOptions[0]?.text || ''
    const cityName = selectedOptions[1]?.text || ''
    const distName = selectedOptions[2]?.text || ''
    regionText.value = `${provName}${cityName}${distName}`
  }
  showAreaPicker.value = false
}

const onAreaCancel = () => {
  showAreaPicker.value = false
}

const onSubmit = () => {
  if (!regionText.value) {
    showToast({ message: '请选择省市区', className: 'custom-toast warn-toast', icon: 'warning-o', position: 'top' })
    return
  }

  const submitData = {
    name: form.name.trim(),
    phone: form.phone.trim(),
    province: form.province,
    city: form.city,
    district: form.district,
    detail: form.detail.trim(),
    isDefault: form.isDefault,
  }

  let result
  if (isEditMode.value && editId.value) {
    result = addressStore.updateAddress(editId.value, submitData)
    if (result) {
      showToast({ message: '地址已更新', className: 'custom-toast success-toast', position: 'top' })
      setTimeout(() => router.back(), 400)
    }
  } else {
    result = addressStore.addAddress(submitData)
    if (result) {
      showToast({ message: '地址已添加', className: 'custom-toast success-toast', position: 'top' })
      setTimeout(() => router.back(), 400)
    }
  }
}

// ---------- 生命周期 ----------
onMounted(() => {
  try {
    loadEditData()
  } catch (e) {
    console.error('加载地址数据失败', e)
    showToast({ message: '数据加载失败', className: 'custom-toast warn-toast', icon: 'warning-o', position: 'top' })
    router.back()
  }
})
</script>

<template>
  <div class="address-edit-page">
    <van-form ref="formRef" @submit="onSubmit">
      <van-field
        v-model="form.name"
        name="name"
        label="收货人"
        placeholder="请输入收货人姓名"
        maxlength="20"
        :rules="rules.name"
        clearable
      />

      <van-field
        v-model="form.phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        maxlength="11"
        type="tel"
        :rules="rules.phone"
        clearable
      />

      <van-field
        v-model="regionText"
        is-link
        readonly
        name="region"
        label="所在地区"
        placeholder="请选择省市区"
        :rules="rules.region"
        @click="openAreaPicker"
      />

      <van-field
        v-model="form.detail"
        name="detail"
        label="详细地址"
        placeholder="请输入详细地址（5~100字符）"
        maxlength="100"
        :rules="rules.detail"
        clearable
        autosize
      />

      <div class="default-checkbox-wrap">
        <van-checkbox v-model="form.isDefault" shape="round" icon-size="20">
          <span class="checkbox-label">设为默认地址</span>
        </van-checkbox>
      </div>

      <div class="submit-btn-wrap">
        <van-button round block type="primary" size="large" native-type="submit">
          {{ submitText }}
        </van-button>
      </div>
    </van-form>

    <!-- 省市区选择器 -->
    <van-popup
      v-model:show="showAreaPicker"
      position="bottom"
      :style="{ height: '50vh' }"
      round
    >
      <van-picker
        :columns="areaColumns"
        title="选择省市区"
        columns-num="3"
        @confirm="onAreaConfirm"
        @cancel="onAreaCancel"
      />
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.address-edit-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 12px 16px 100px;

  :deep(.van-field) {
    background: #fff;
    border-radius: 8px;
    margin-bottom: 10px;

    .van-field__label {
      width: 72px;
      color: #333;
      font-weight: 500;
    }

    .van-field__body {
      input::placeholder {
        color: #ccc;
      }
    }
  }

  .default-checkbox-wrap {
    background: #fff;
    border-radius: 8px;
    padding: 14px 16px;
    margin-bottom: 20px;

    .checkbox-label {
      font-size: 14px;
      color: #333;
      margin-left: 6px;
    }
  }

  .submit-btn-wrap {
    .van-button {
      height: 48px;
      font-size: 16px;
      border-radius: 24px;
    }
  }
}

:deep(.van-picker) {
  .van-picker__toolbar {
    padding: 12px 16px;

    .van-picker__cancel {
      color: #999;
    }

    .van-picker__confirm {
      color: #1989fa;
      font-weight: 500;
    }
  }

  .van-picker-column {
    .van-picker-column__item {
      font-size: 14px;
    }
  }
}
</style>