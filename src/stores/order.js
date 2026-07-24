import { ref } from 'vue'
import { defineStore } from 'pinia'
import { orders as mockOrders } from '@/mockData.js'

const STORAGE_KEY = 'lxy_orders'

export const useOrderStore = defineStore('order', () => {
  // 从 localStorage 恢复订单列表
  const getStoredOrders = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
        return []
      } catch {
        return []
      }
    }
    return []
  }

  // 初始化订单列表：优先使用 localStorage，若无则使用 mock 数据
  const stored = getStoredOrders()
  let initialOrders = stored
  if (initialOrders.length === 0) {
    // 从 mock 数据中深拷贝一份作为初始订单
    initialOrders = mockOrders.map(order => ({ ...order }))
    // 立即存入 localStorage，以便后续持久化
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialOrders))
  }

  const orderList = ref(initialOrders)

  // 保存到 localStorage
  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orderList.value))
  }

  // 生成订单号：年月日 + 4位随机数
  const generateOrderNo = () => {
    const now = new Date()
    const y = now.getFullYear()
    const m = String(now.getMonth() + 1).padStart(2, '0')
    const d = String(now.getDate()).padStart(2, '0')
    const rand = String(Math.floor(1000 + Math.random() * 9000))
    return `${y}${m}${d}${rand}`
  }

  /**
   * 添加订单（支持多个商品共用同一订单号）
   * @param {Array} items - 商品数组
   * @param {Object} address - 收货地址（仅用于校验）
   * @returns {Array} 生成的订单列表
   */
  const addOrder = (items, address) => {
    if (!items || items.length === 0) return []

    const orderNo = generateOrderNo()
    const date = new Date().toISOString().slice(0, 10)

    const newOrders = items.map((item, index) => ({
      id: Date.now() + index,
      orderNo,
      status: '待付款',
      image: item.image,
      name: item.name,
      spec: item.spec || item.specName || '',
      price: item.price,
      quantity: item.quantity,
      date,
    }))

    // 插入到列表头部（最新在前）
    orderList.value.unshift(...newOrders)
    saveToStorage()
    return newOrders
  }

  /**
   * 取消订单（删除指定订单记录）
   * @param {Number} orderId - 订单 id
   * @returns {Boolean} 是否成功
   */
  const cancelOrder = (orderId) => {
    const index = orderList.value.findIndex(item => item.id === orderId)
    if (index === -1) return false
    orderList.value.splice(index, 1)
    saveToStorage()
    return true
  }

  /**
   * 付款（模拟，仅改变状态）
   * @param {Number} orderId - 订单 id
   * @returns {Boolean} 是否成功
   */
  const payOrder = (orderId) => {
    const order = orderList.value.find(item => item.id === orderId)
    if (!order) return false
    if (order.status !== '待付款') return false
    order.status = '待收货'
    saveToStorage()
    return true
  }

  return { orderList, addOrder, cancelOrder, payOrder }
})