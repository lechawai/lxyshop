import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { addresses as mockAddresses } from '@/mockData.js'

const STORAGE_KEY = 'lxy_addresses'

export const useAddressStore = defineStore('address', () => {
  const getStoredAddresses = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      } catch {}
    }
    return null
  }

  const initialData = getStoredAddresses() || mockAddresses.map(item => ({ ...item }))
  const addressList = ref(initialData)

  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addressList.value))
  }

  const defaultAddress = computed(() => {
    return addressList.value.find(addr => addr.isDefault) || null
  })

  const totalCount = computed(() => addressList.value.length)

  const addAddress = (addressData) => {
    const maxId = addressList.value.reduce((max, addr) => Math.max(max, addr.id), 0)
    const newAddress = { ...addressData, id: maxId + 1 }

    if (newAddress.isDefault) {
      addressList.value.forEach(addr => { addr.isDefault = false })
    } else if (addressList.value.length === 0) {
      newAddress.isDefault = true
    }

    addressList.value.push(newAddress)
    saveToStorage()
    return newAddress
  }

  const updateAddress = (id, updatedData) => {
    const index = addressList.value.findIndex(addr => addr.id === id)
    if (index === -1) return null

    const oldAddress = addressList.value[index]
    const newIsDefault = updatedData.isDefault ?? oldAddress.isDefault

    if (newIsDefault) {
      addressList.value.forEach(addr => { addr.isDefault = false })
    } else if (oldAddress.isDefault && !newIsDefault) {
      // 用户主动取消默认
      // 如果有其他地址，将第一个其他地址设为默认
      const others = addressList.value.filter((_, i) => i !== index)
      if (others.length > 0) {
        const firstOther = addressList.value.find((_, i) => i !== index)
        if (firstOther) {
          firstOther.isDefault = true
        }
      }
      // ★ 如果没有其他地址（即只有一个地址），允许该地址 isDefault = false ★
      // 不做任何强制，直接让该地址取消默认
    }

    addressList.value[index] = { ...addressList.value[index], ...updatedData }
    saveToStorage()
    return addressList.value[index]
  }

  /**
   * 删除地址：不在此处阻止默认，由调用层控制
   */
  const deleteAddress = (id) => {
    const index = addressList.value.findIndex(addr => addr.id === id)
    if (index === -1) {
      return { success: false, message: '地址不存在' }
    }

    addressList.value.splice(index, 1)

    // 如果删除后列表不为空，且没有默认地址，则将第一个地址设为默认
    if (addressList.value.length > 0) {
      const hasDefault = addressList.value.some(addr => addr.isDefault)
      if (!hasDefault) {
        addressList.value[0].isDefault = true
      }
    }

    saveToStorage()
    return { success: true, message: '已删除' }
  }

  /**
   * 设为默认地址
   */
  const setDefault = (id) => {
    const target = addressList.value.find(addr => addr.id === id)
    if (!target) return false

    addressList.value.forEach(addr => { addr.isDefault = false })
    target.isDefault = true
    saveToStorage()
    return true
  }

  /**
   * ★ 新增：取消默认地址（仅用于只有一个地址时取消默认）★
   */
  const cancelDefault = (id) => {
    const target = addressList.value.find(addr => addr.id === id)
    if (!target) return false

    target.isDefault = false
    saveToStorage()
    return true
  }

  const getAddress = (id) => {
    return addressList.value.find(addr => addr.id === id) || null
  }

  const resetToMock = () => {
    addressList.value = mockAddresses.map(item => ({ ...item }))
    saveToStorage()
  }

  return {
    addressList,
    defaultAddress,
    totalCount,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefault,
    cancelDefault,
    getAddress,
    resetToMock,
  }
})