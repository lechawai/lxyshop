<script setup>
import { messages } from '@/mockData';
import { showSuccessToast,showToast } from 'vant';
import { reactive } from 'vue';
import { useRouter } from "vue-router";
import { useUserStore } from '@/stores/user';
const router = useRouter()
const userStore = useUserStore()
const form = reactive({
    username:"",
    password:"",
})
const usernameRules =[
    {
        require:true,
        pattern:/^\w{3,16}$/,
        message:'用户长度3~16个字符'
    }
]
const passwordRules =[
    {
        require:true,
        pattern:/^\w{6,20}$/,
        message:'密码必须为6~20个字符'
    }
]
const onSubmit = function() {
  const result = userStore.login(form.username, form.password)
  if(result.success){
    showToast('登陆成功')
    router.push('/')
  }else{
    showToast(result.message)
  }
}
</script>
<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
            v-model="form.username"
            name="用户名"
            Label="用户名"
            placeholder="用户名"
            :rules = "usernameRules"/>
            <van-field
            v-model="form.password"
            type="password"
            name="密码"
            Label="密码"
            placeholder="密码"
            :rules = "passwordRules"/>
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>
<style scoped></style>