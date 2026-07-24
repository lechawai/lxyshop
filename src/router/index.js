import { createRouter, createWebHistory } from 'vue-router'
// 导入HomeView组件（页面）
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '首页', showTabBar: true, showNavBar: false, showBack: false },
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategoryView.vue'),
      meta: { title: '分类', showTabBar: true, showNavBar: true, showBack: false },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
      meta: { title: '购物车', showTabBar: true, showNavBar: true, showBack: false },
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('../views/MessageView.vue'),
      meta: { title: '消息', showTabBar: true, showNavBar: true, showBack: false },
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue'),
      meta: { title: '我的', showTabBar: true, showNavBar: false, showBack: false },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { title: '登录', showTabBar: false, showNavBar: true, showBack: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: { title: '注册', showTabBar: false, showNavBar: true, showBack: true },
    },
    {
      path: '/goodslist/:categoryId',
      name: 'goodslist',
      component: () => import('../views/GoodsListView.vue'),
      props: true,
      meta: { title: '商品列表', showTabBar: true, showNavBar: true, showBack: true },
    },
    {
      path: '/goods/:id',
      name: 'goodsDetail',
      component: () => import('../views/GoodsDetailView.vue'),
      props: true,
      meta: { title: '商品详情', showTabBar: false, showNavBar: true, showBack: true },
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      meta: { title: '搜索', showTabBar: false, showNavBar: true, showBack: true },
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/OrderListView.vue'),
      meta: { title: '我的订单', showTabBar: false, showNavBar: true, showBack: true },
    },
    {
      path: '/address',
      name: 'addressList',
      component: () => import('../views/AddressListView.vue'),
      meta: { title: '收货地址', showTabBar: false, showNavBar: true, showBack: true },
    },
    // ========== 地址编辑页 ==========
    {
      path: '/address/edit',
      name: 'addressEdit',
      component: () => import('../views/AddressEditView.vue'),
      meta: { title: '编辑地址', showTabBar: false, showNavBar: true, showBack: true },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue'),
      meta: { title: '我的收藏', showTabBar: false, showNavBar: true, showBack: true },
    },
    // ========== 下单页 ==========
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
      meta: { title: '确认订单', showTabBar: false, showNavBar: true, showBack: true },
    },
    // ========== 支付页 ==========
    {
      path: '/payment/:orderId',
      name: 'payment',
      component: () => import('../views/PaymentView.vue'),
      props: true,
      meta: { title: '确认支付', showTabBar: false, showNavBar: true, showBack: true },
    },
    // ========== 功能页面（十个宫格） ==========
    {
      path: '/hot-sale',
      name: 'hotSale',
      component: () => import('../views/HotSaleView.vue'),
      meta: { title: '今日爆款', showTabBar: true, showNavBar: true, showBack: true },
    },
    {
      path: '/good-share',
      name: 'goodShare',
      component: () => import('../views/GoodShareView.vue'),
      meta: { title: '好物分享', showTabBar: true, showNavBar: true, showBack: true },
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('../views/RecommendView.vue'),
      meta: { title: '推荐购买', showTabBar: true, showNavBar: true, showBack: true },
    },
    {
      path: '/phone-recharge',
      name: 'phoneRecharge',
      component: () => import('../views/PhoneRechargeView.vue'),
      meta: { title: '手机充值', showTabBar: true, showNavBar: true, showBack: true },
    },
    {
      path: '/recommend-2',
      name: 'recommend2',
      component: () => import('../views/Recommend2View.vue'),
      meta: { title: '推荐购买', showTabBar: true, showNavBar: true, showBack: true },
    },
    {
      path: '/hot-sale-2',
      name: 'hotSale2',
      component: () => import('../views/HotSale2View.vue'),
      meta: { title: '今日爆款', showTabBar: true, showNavBar: true, showBack: true },
    },
    {
      path: '/shopping-tips',
      name: 'shoppingTips',
      component: () => import('../views/ShoppingTipsView.vue'),
      meta: { title: '购物心得', showTabBar: true, showNavBar: true, showBack: true },
    },
    {
      path: '/special-offer',
      name: 'specialOffer',
      component: () => import('../views/SpecialOfferView.vue'),
      meta: { title: '特价优惠', showTabBar: true, showNavBar: true, showBack: true },
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: () => import('../views/RechargeView.vue'),
      meta: { title: '立即充值', showTabBar: true, showNavBar: true, showBack: true },
    },
    {
      path: '/customer-service',
      name: 'customerService',
      component: () => import('../views/CustomerServiceView.vue'),
      meta: { title: '我的客服', showTabBar: true, showNavBar: true, showBack: true },
    },
  ],
})

router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - 微商城'
  }
  return true
})

export default router