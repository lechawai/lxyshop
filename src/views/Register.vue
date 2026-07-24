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
            :rules = "tpasswordRules"/>
            <van-field
            v-model="form.tpassword"
            type="password"
            name="确认密码"
            Label="确认密码"
            placeholder="确认密码"
            :rules = "tpasswordRules"/>
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script setup>
import { messages } from '@/mockData';
import { showSuccessToast } from 'vant';
import { reactive } from 'vue';
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
    username:"",
    password:"",
    tpassword:"",
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
const tpasswordRules =[
    {
        require:true,
        pattern:/^\w{6,20}$/,
        message:'密码必须为6~20个字符'
    },
    {
        validator: (value) => value === form.password,
        message: '两次输入的密码不一致'
    }
]
const onSubmit = function(){
    showSuccessToast("欢迎注册"+form.username)
    const res = userStore.register(form.username, form.password)
    if(res.success){
        showToast('注册成功')
        setTimeout(() => {
            router.push('/')
        }, 500)
    }else{
        showToast(res.message)
    }
}
</script>
<style scoped></style>