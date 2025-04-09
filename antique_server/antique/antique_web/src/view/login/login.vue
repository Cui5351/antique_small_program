<template>
<div class="box">
        <div class="content">
            <div class="login-wrapper">
                <h1>登录{{ mode ? '商家' :'博物馆' }}</h1>
                <div class="login-form">
                    <div class="username form-item">
                        <span>账号</span>
                        <input type="text" @keydown.enter="login" class="input-item" v-model="user.username" placeholder="Please enter your account">
                    </div>
                    <div class="password form-item">
                        <span>密码</span>
                        <input type="password" @keydown.enter="login" class="input-item" v-model="user.password" placeholder="Please enter your password">
                    </div>
                    <button class="login-btn" @click="login">登 录</button>
                    <button class="login-btn" @click="toggleLogin">切换登录</button>
                </div>
            
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import request from '../../request/request'
import storage from '@/storage/storage';
import { useRouter } from 'vue-router';

const user = reactive({
  username:'',
  password:''  
})

const router = useRouter()
const mode = ref(true)
const toggleLogin = () => {
    mode.value = !mode.value
}
const login = async() => {
    try{
        if(user.username.trim().length < 4)
            throw "账号长度不能小于4"
        if(user.password.trim().length < 6)
            throw "密码长度不能小于6"
        if(mode.value){
            const {data} = await request.post("/Store/login",{...user})
            storage.ls.set("user",JSON.stringify(data))
            // throw "账户/密码错误"
        }else{
            const {data} = await request.post("/Antique/login",{
                account:user.username,
                password:user.password
            })
            console.log(data,'data');
            storage.ls.set("user",JSON.stringify(data))
        }
        // storage.ls.set("username",data.name)
        router.replace({
            path:"/homePage"
        })
        ElMessage.success("登陆成功")
    }catch(e){
        console.log(e);
        return
    }
}
</script>

<style scoped>
@import url('./style.css');
</style>