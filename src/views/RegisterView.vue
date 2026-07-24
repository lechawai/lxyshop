<script setup>
import { ref, reactive } from 'vue';
import { showSuccessToast, showFailToast } from 'vant';

// 表单数据
const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
});

// 表单引用，用于手动触发校验
const formRef = ref(null);

// 用户名校验规则
const usernameRules = [
  {
    required: true,
    pattern: /^\w{3,16}$/,
    message: '用户名长度3~16个字符'
  }
];

// 密码校验规则
const passwordRules = [
  {
    required: true,
    pattern: /^\w{6,20}$/,
    message: '密码必须为6~20个字符'
  }
];

// 确认密码校验规则
const confirmPasswordRules = [
  {
    required: true,
    pattern: /^\w{6,20}$/,
    message: '确认密码必须为6~20个字符'
  },
  {
    validator: (val) => {
      // 自定义校验：确认密码必须与密码一致
      if (val !== form.password) {
        return false;
      }
      return true;
    },
    message: '两次输入的密码不一致'
  }
];

// 当密码字段变化时，重新校验确认密码字段（实时显示一致性错误）
const onPasswordChange = () => {
  if (formRef.value && form.confirmPassword) {
    formRef.value.validate('confirmPassword');
  }
};

// 提交方法
const onSubmit = function() {
    showSuccessToast('注册成功'+form.username);
}
</script>

<template>
  <div class="register-container">
    <!-- 删除了 <div class="register-title">注册</div> -->
    
    <van-form ref="formRef" @submit="onSubmit">
      <van-cell-group inset>
        <!-- 用户名 -->
        <van-field
          v-model="form.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="usernameRules"
        />
        
        <!-- 密码 -->
        <van-field
          v-model="form.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="passwordRules"
          @update:model-value="onPasswordChange"
        />
        
        <!-- 确认密码 -->
        <van-field
          v-model="form.confirmPassword"
          type="password"
          name="confirmPassword"
          label="确认密码"
          placeholder="确认密码"
          :rules="confirmPasswordRules"
        />
      </van-cell-group>
      
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>
.register-container {
  padding-top: 20px;
}

</style>