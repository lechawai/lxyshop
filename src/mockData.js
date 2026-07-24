// ============================================================
// 全站模拟数据（唯一来源）
// ------------------------------------------------------------
// 教学说明：
//   现阶段页面所有数据都来自这里（本地静态数据）。
//   字段命名已统一：图片一律叫 image，价格一律叫 price。
//   将来接入后端时，只需把这里的每个导出换成对应的接口请求即可，
//   页面组件几乎不用改动 —— 这就是"先静态、后接后端"的接缝。
// ============================================================

// 首页轮播图
export const banners = [
  '/images/banner1.jpg',
  '/images/banner2.jpg',
]

// 首页宫格导航（功能区）
export const gridMenu = [
  { id: 1, text: '今日爆款', image: '/images/menu1.png', link: '/hot-sale' },
  { id: 2, text: '好物分享', image: '/images/menu2.png', link: '/good-share' },
  { id: 3, text: '推荐购买', image: '/images/menu3.png', link: '/recommend' },
  { id: 4, text: '手机充值', image: '/images/menu4.png', link: '/phone-recharge' },
  { id: 5, text: '推荐购买', image: '/images/menu5.png', link: '/recommend-2' },
  { id: 6, text: '今日爆款', image: '/images/menu6.png', link: '/hot-sale-2' },
  { id: 7, text: '购物心得', image: '/images/menu7.png', link: '/shopping-tips' },
  { id: 8, text: '特价优惠', image: '/images/menu8.png', link: '/special-offer' },
  { id: 9, text: '立即充值', image: '/images/menu9.png', link: '/recharge' },
  { id: 10, text: '我的客服', image: '/images/menu10.png', link: '/customer-service' },
]

// 首页 - 商品信息展示区
export const homeProducts = [
  { id: 1, name: '推荐', image: '/images/product1.png' },
  { id: 2, name: '分享', image: '/images/product2.png' },
  { id: 3, name: '补贴', image: '/images/product3.png' },
  { id: 4, name: '分享', image: '/images/product4.png' },
]

// 首页 - 每周上新（价格统一用字符串，和购物车/人气推荐保持一致，也贴近后端 DECIMAL 返回）
export const weeklyNew = [
  { id: 1, name: '懒人沙发', image: '/images/new1.jpg', price: '3000.00' },
  { id: 2, name: '篮球', image: '/images/new2.jpg', price: '300.00' },
  { id: 3, name: '夹子', image: '/images/new3.jpg', price: '100.00' },
  { id: 4, name: '兔子', image: '/images/new4.jpg', price: '500.00' },
]

// 首页 - 人气推荐
export const topPicks = [
  { id: 1, title: '儿童蚕丝被', desc: '儿童蚕丝被儿童蚕丝被', image: '/images/top1.jpg', price: '300.00', originPrice: '500.00', tag: 'TOP1' },
  { id: 2, title: '玩具车', desc: '玩具车玩具车', image: '/images/top2.jpg', price: '300.00', originPrice: '500.00', tag: 'TOP2' },
  { id: 3, title: '懒人沙发', desc: '懒人沙发懒人沙发', image: '/images/top3.jpg', price: '300.00', originPrice: '500.00', tag: 'TOP3' },
  { id: 4, title: '乐高积木', desc: '乐高积木乐高积木', image: '/images/top4.jpg', price: '300.00', originPrice: '500.00', tag: 'TOP4' },
  { id: 5, title: '摇摇车', desc: '摇摇车摇摇车', image: '/images/top5.jpg', price: '300.00', originPrice: '500.00', tag: 'TOP5' },
]

// 商品分类（已按"一级分类 -> children 二级分类"组织好，页面直接渲染）
// 接后端时：后端返回的是带 pid 的扁平数组，到时再写一个转树函数还原成这个结构即可。
export const categories = [
  {
    id: 1,
    name: '潮流女装',
    children: [
      { id: 2, name: '羽绒服', image: '/images/category/clothes/jackets.png' },
      { id: 3, name: '毛呢大衣', image: '/images/category/clothes/overcoat.jpg' },
      { id: 4, name: '连衣裙', image: '/images/category/clothes/dress.png' },
    ],
  },
  {
    id: 5,
    name: '食品',
    children: [
      { id: 6, name: '休闲零食', image: '/images/category/foods/biscuit.jpg' },
      { id: 7, name: '生鲜果蔬', image: '/images/category/foods/tomato.jpg' },
      { id: 8, name: '饮料汽水', image: '/images/category/foods/drinks.jpg' },
      { id: 9, name: '四季茗茶', image: '/images/category/foods/tea.jpg' },
      { id: 10, name: '粮油调味', image: '/images/category/foods/oil.jpg' },
    ],
  },
  {
    id: 11,
    name: '珠宝配饰',
    children: [
      { id: 12, name: '时尚饰品', image: '/images/category/jewelry/ornaments.jpg' },
      { id: 13, name: '品质手表', image: '/images/category/jewelry/watch.jpg' },
      { id: 14, name: 'DIY饰品', image: '/images/category/jewelry/diy.jpg' },
    ],
  },
  {
    id: 15,
    name: '日用百货',
    children: [
      { id: 16, name: '居家日用', image: '/images/category/store/towel.png' },
      { id: 17, name: '个人清洁', image: '/images/category/store/paper.png' },
      { id: 18, name: '盆碗碟筷', image: '/images/category/store/bowl.png' },
      { id: 19, name: '茶杯茶具', image: '/images/category/store/cup.png' },
      { id: 20, name: '收纳整理', image: '/images/category/store/box.png' },
    ],
  },
  {
    id: 21,
    name: '手机数码',
    children: [
      { id: 22, name: '手机', image: '/images/category/phone/phone.png' },
      { id: 23, name: '笔记本', image: '/images/category/phone/computer.png' },
      { id: 24, name: '数码配件', image: '/images/category/phone/headset.png' },
      { id: 25, name: '平板', image: '/images/category/phone/flat.png' },
      { id: 26, name: '相机', image: '/images/category/phone/camera.png' },
    ],
  },
  {
    id: 27,
    name: '户外运动',
    children: [
      { id: 28, name: '运动鞋', image: '/images/category/motion/shoes.jpg' },
      { id: 29, name: '球类运动', image: '/images/category/motion/ball.png' },
      { id: 30, name: '垂钓用品', image: '/images/category/motion/fishingrod.png' },
      { id: 31, name: '运动服', image: '/images/category/motion/clothes.png' },
      { id: 32, name: '骑行装备', image: '/images/category/motion/bicycle.png' },
      { id: 33, name: '电动车', image: '/images/category/motion/vehicle.png' },
    ],
  },
]

// 购物车初始商品（quantity = 购买数量，checked = 是否勾选）
export const cartItems = [
  { id: 1, name: '橘子', image: '/images/product1.png', price: '100.00', quantity: 2, checked: true },
  { id: 2, name: '苹果', image: '/images/product2.png', price: '200.00', quantity: 1, checked: false },
  { id: 3, name: '香蕉', image: '/images/product3.png', price: '300.00', quantity: 3, checked: false },
  { id: 4, name: '葡萄', image: '/images/product4.png', price: '400.00', quantity: 1, checked: false },
]

// 消息列表
export const messages = [
  { id: 1, image: '/images/avatar1.jpg', title: '水果旗舰店', date: '一分钟前', label: '你好' },
  { id: 2, image: '/images/avatar2.jpg', title: '水果旗舰店', date: '两分钟前', label: '你好' },
  { id: 3, image: '/images/avatar3.png', title: '订阅号', date: '星期一', label: '你好' },
  { id: 4, image: '/images/avatar4.png', title: '通知', date: '星期二', label: '你好' },
]

// 商品列表（category_id 对应「二级分类」的 id；商品列表页按它筛选，详情页按 id 查找）
// 注意：只有部分分类配了商品，其余分类会显示「暂无商品」的空状态。
// colors / sizes：用于商品详情页 SKU 规格选择弹窗
export const goods = [
  // 潮流女装
  { id: 101, category_id: 2, name: '轻薄羽绒服', image: '/images/category/clothes/jackets.png', price: '399.00', stock: 120,
     spec: '均码', description: '90% 白鸭绒填充，轻盈保暖，通勤出行都合适。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 102, category_id: 2, name: '经典毛呢大衣1', image: '/images/category/clothes/overcoat.jpg', price: '599.00', stock: 80, spec: 'M / L / XL', description: '羊毛混纺面料，挺括有型，秋冬百搭。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 103, category_id: 2, name: '法式碎花连衣裙2', image: '/images/category/clothes/dress.png', price: '322.00', stock: 22, spec: 'S / M / L', description: '垂感雪纺，显瘦优雅，约会出游皆宜。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 104, category_id: 2, name: '法式碎花连衣裙3', image: '/images/category/clothes/dress.png', price: '199.00', stock: 33, spec: 'S / M / L', description: '垂感雪纺，显瘦优雅，约会出游皆宜。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 105, category_id: 2, name: '法式碎花连衣裙4', image: '/images/category/clothes/dress.png', price: '299.00', stock: 35, spec: 'S / M / L', description: '垂感雪纺，显瘦优雅，约会出游皆宜。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 106, category_id: 2, name: '法式碎花连衣裙5', image: '/images/category/clothes/dress.png', price: '99.00', stock: 11, spec: 'S / M / L', description: '垂感雪纺，显瘦优雅，约会出游皆宜。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 107, category_id: 2, name: '法式碎花连衣裙6', image: '/images/category/clothes/dress.png', price: '59.00', stock: 5, spec: 'S / M / L', description: '垂感雪纺，显瘦优雅，约会出游皆宜。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },

  { id: 108, category_id: 3, name: '经典毛呢大衣2', image: '/images/category/clothes/overcoat.jpg', price: '499.00', stock: 79, spec: 'M / L / XL', description: '羊毛混纺面料，挺括有型，秋冬百搭。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 109, category_id: 3, name: '经典毛呢大衣3', image: '/images/category/clothes/overcoat.jpg', price: '199.00', stock: 35, spec: 'M / L / XL', description: '羊毛混纺面料，挺括有型，秋冬百搭。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 110, category_id: 3, name: '经典毛呢大衣4', image: '/images/category/clothes/overcoat.jpg', price: '299.00', stock: 43, spec: 'M / L / XL', description: '羊毛混纺面料，挺括有型，秋冬百搭。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 111, category_id: 3, name: '经典毛呢大衣5', image: '/images/category/clothes/overcoat.jpg', price: '699.00', stock: 54, spec: 'M / L / XL', description: '羊毛混纺面料，挺括有型，秋冬百搭。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 112, category_id: 3, name: '经典毛呢大衣6', image: '/images/category/clothes/overcoat.jpg', price: '799.00', stock: 20, spec: 'M / L / XL', description: '羊毛混纺面料，挺括有型，秋冬百搭。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 113, category_id: 3, name: '经典毛呢大衣7', image: '/images/category/clothes/overcoat.jpg', price: '899.00', stock: 10, spec: 'M / L / XL', description: '羊毛混纺面料，挺括有型，秋冬百搭。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 114, category_id: 3, name: '法式碎花连衣裙1', image: '/images/category/clothes/dress.png', price: '59.00', stock: 60, spec: 'S / M / L', description: '垂感雪纺，显瘦优雅，约会出游皆宜。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 115, category_id: 4, name: '法式碎花连衣裙2', image: '/images/category/clothes/dress.png', price: '259.00', stock: 33, spec: 'S / M / L', description: '垂感雪纺，显瘦优雅，约会出游皆宜。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 116, category_id: 4, name: '法式碎花连衣裙', image: '/images/category/clothes/dress.png', price: '322.00', stock: 11, spec: 'S / M / L', description: '垂感雪纺，显瘦优雅，约会出游皆宜。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 117, category_id: 4, name: '法式碎花连衣裙', image: '/images/category/clothes/dress.png', price: '455.00', stock: 12, spec: 'S / M / L', description: '垂感雪纺，显瘦优雅，约会出游皆宜。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 118, category_id: 4, name: '法式碎花连衣裙', image: '/images/category/clothes/dress.png', price: '677.00', stock: 36, spec: 'S / M / L', description: '垂感雪纺，显瘦优雅，约会出游皆宜。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 119, category_id: 4, name: '经典毛呢大衣7', image: '/images/category/clothes/overcoat.jpg', price: '899.00', stock: 10, spec: 'M / L / XL', description: '羊毛混纺面料，挺括有型，秋冬百搭。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 120, category_id: 4, name: '经典毛呢大衣7', image: '/images/category/clothes/overcoat.jpg', price: '199.00', stock: 10, spec: 'M / L / XL', description: '羊毛混纺面料，挺括有型，秋冬百搭。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },

  { id: 121, category_id: 4, name: '法式碎花连衣裙', image: '/images/category/clothes/dress.png', price: '259.00', stock: 60, spec: 'S / M / L', description: '垂感雪纺，显瘦优雅，约会出游皆宜。',
     colors: ['黑色', '白色', '粉色', '军绿色'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  // 食品
  { id: 201, category_id: 6, name: '什锦饼干礼盒', image: '/images/category/foods/biscuit.jpg', price: '59.90', stock: 200, spec: '500g', description: '多口味组合，香脆可口，办公室小零食。',
     colors: ['原味', '巧克力味', '奶油味'], sizes: ['250g', '500g', '1kg'] },
  { id: 202, category_id: 7, name: '新鲜番茄', image: '/images/category/foods/tomato.jpg', price: '12.80', stock: 300, spec: '1kg', description: '自然成熟，酸甜多汁，生吃凉拌都不错。',
     colors: ['红色', '黄色'], sizes: ['500g', '1kg', '2kg'] },
  { id: 203, category_id: 8, name: '清爽气泡饮料', image: '/images/category/foods/drinks.jpg', price: '29.90', stock: 150, spec: '6 瓶装', description: '低糖配方，清爽解渴。',
     colors: ['原味', '柠檬味', '橙味'], sizes: ['330ml', '500ml', '1L'] },
  // 珠宝配饰
  { id: 301, category_id: 13, name: '简约石英手表', image: '/images/category/jewelry/watch.jpg', price: '899.00', stock: 40, spec: '银色', description: '商务简约，生活防水，皮质表带。',
     colors: ['银色', '金色', '黑色'], sizes: ['36mm', '40mm', '44mm'] },
  // 手机数码
  { id: 401, category_id: 22, name: '智能手机', image: '/images/category/phone/phone.png', price: '2999.00', stock: 50, spec: '8+256G', description: '高刷新率屏幕，大电池长续航。',
     colors: ['黑色', '白色', '蓝色'], sizes: ['128G', '256G', '512G'] },
  { id: 402, category_id: 23, name: '轻薄笔记本', image: '/images/category/phone/computer.png', price: '5499.00', stock: 30, spec: '16+512G', description: '轻薄便携，金属机身，办公学习高效。',
     colors: ['银色', '深空灰'], sizes: ['8+256G', '16+512G', '32+1T'] },
  { id: 403, category_id: 26, name: '入门微单相机', image: '/images/category/phone/camera.png', price: '4299.00', stock: 20, spec: '套机', description: '高画质易上手，记录生活每一刻。',
     colors: ['黑色', '银色'], sizes: ['单机身', '套机', '双镜头套装'] },
  // 户外运动
  { id: 501, category_id: 28, name: '缓震跑鞋', image: '/images/category/motion/shoes.jpg', price: '329.00', stock: 90, spec: '38 - 44', description: '轻量缓震，透气网面，长跑舒适。',
     colors: ['黑色', '白色', '红色', '蓝色'], sizes: ['38', '39', '40', '41', '42', '43', '44'] },
  { id: 502, category_id: 29, name: '专业篮球', image: '/images/category/motion/ball.png', price: '129.00', stock: 110, spec: '7 号', description: '耐磨防滑，室内外通用，手感出色。',
     colors: ['棕色', '橙色'], sizes: ['5号', '6号', '7号'] },
  // 日用百货
  { id: 601, category_id: 16, name: '纯棉毛巾', image: '/images/category/store/towel.png', price: '19.90', stock: 300, spec: '2 条装', description: '纯棉加厚，柔软吸水，亲肤不掉毛。',
     colors: ['白色', '蓝色', '粉色', '灰色'], sizes: ['单条装', '2条装', '3条装'] },
  { id: 602, category_id: 19, name: '手工陶瓷茶杯', image: '/images/category/store/cup.png', price: '39.90', stock: 120, spec: '单只', description: '手工陶瓷，简约质感，办公居家皆宜。',
     colors: ['白色', '黑色', '米色'], sizes: ['单只', '2只装', '4只装'] },
]

// 我的订单（status 与「我的」页面四个入口一致：待付款 / 待收货 / 待评价 / 退款售后）
export const orders = [
  { id: 1, orderNo: '202606010001', status: '待付款', image: '/images/category/phone/phone.png', name: '智能手机', spec: '8+256G', price: '2999.00', quantity: 1, date: '2026-06-01' },
  { id: 2, orderNo: '202605280002', status: '待收货', image: '/images/category/motion/shoes.jpg', name: '缓震跑鞋', spec: '42', price: '329.00', quantity: 2, date: '2026-05-28' },
  { id: 3, orderNo: '202605200003', status: '待评价', image: '/images/category/foods/biscuit.jpg', name: '什锦饼干礼盒', spec: '500g', price: '59.90', quantity: 3, date: '2026-05-20' },
  { id: 4, orderNo: '202605150004', status: '退款/售后', image: '/images/category/store/towel.png', name: '纯棉毛巾', spec: '2 条装', price: '19.90', quantity: 1, date: '2026-05-15' },
  { id: 5, orderNo: '202605100005', status: '待收货', image: '/images/category/clothes/dress.png', name: '法式碎花连衣裙', spec: 'M', price: '259.00', quantity: 1, date: '2026-05-10' },
]

// 收货地址列表（用于地址管理 store 初始化）
export const addresses = [
  { id: 1, name: '张三', phone: '13800138000', province: '广东省', city: '深圳市', district: '南山区', detail: '科技园路1号', isDefault: true },
  { id: 2, name: '李四', phone: '13900139000', province: '广东省', city: '广州市', district: '天河区', detail: '天河路100号', isDefault: false },
]

// 已注册用户列表（用于本地登录/注册认证，userStore 初始化用）
export const users = [
  { username: 'admin', password: '123456' },
]
