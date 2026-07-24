import { defineStore } from "pinia"
import { ref } from "vue"
import { users } from '@mockData.js'
// 本地用户认证Store
// 登录状态持久化到localStorage，关闭浏览器后再打开仍然保持登录
export const useUserStore = defineStore('user', () => {
  // 从LocalStorage恢复登录状态
  const isLoggedIn = ref(!!!localStorage.getItem('isLoggedIn'))
  // 当前登录用户信息（页面刷新后从localStorage恢复）
  const currentUser = ref(JSON.parse(localStorage.getItem('currentUser') || 'null'))
  // 已注册用户列表
  const registeredUsers = ref(users.map(item => ({ ...item })))

  // 登录：在已注册用户中匹配用户名和密码
  const login = (username, password) => {
    const user = registeredUsers.value.find(
    (u) => u.username === username && u.password === password
    )

    if (user) {
    isLoggedIn.value = true
    currentUser.value = { username: user.username, avatar: '' }
    // 登录状态写入localStorage，实现持久化
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
    return { success: true }
    }
    return { success: false, messages: '用户名或密码错误' }
  }

  return { login }
})