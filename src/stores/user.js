import { ref } from 'vue'
import { defineStore } from 'pinia'
import { users } from '@/mockData'

export const useUserStore = defineStore('user', () => {
  // 注册用户列表，深拷贝mock初始用户（原有完全保留）
  const registeredUsers = ref(users.map(item => ({ ...item })))
  // 登录状态、当前用户（原有完全保留）
  const isLoggedIn = ref(false)
  const currentUser = ref(null)

  // 注册方法（原有完全保留）
  const register = (username, password) => {
    const hasUser = registeredUsers.value.find(item => item.username === username)
    if (hasUser) {
      return { success: false, message: '用户名已存在' }
    }
    registeredUsers.value.push({ username, password })
    return { success: true }
  }

  // 【新增】登录方法：从注册用户列表校验账号，同步登录状态和本地存储
  const login = (username, password) => {
    const targetUser = registeredUsers.value.find(
      item => item.username === username && item.password === password
    )
    if (targetUser) {
      isLoggedIn.value = true
      currentUser.value = targetUser
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('currentUser', JSON.stringify(targetUser))
      return { success: true, message: '登录成功' }
    } else {
      return { success: false, message: '用户名或密码错误' }
    }
  }

  // 登出方法（原有完全保留）
  const logout = () => {
    isLoggedIn.value = false
    currentUser.value = null
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('currentUser')
  }

  // 【新增】初始化：刷新页面从本地存储恢复登录状态
  const initLoginState = () => {
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn')
    const savedUser = localStorage.getItem('currentUser')
    if (savedIsLoggedIn === 'true' && savedUser) {
      isLoggedIn.value = true
      currentUser.value = JSON.parse(savedUser)
    }
  }
  initLoginState()

  return {
    registeredUsers,
    isLoggedIn,
    currentUser,
    register,
    login,
    logout
  }
})