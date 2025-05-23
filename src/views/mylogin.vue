<script setup lang="ts">
import { ref } from 'vue'
import { useRegesterStore } from '../store/token.ts'
import 'vant'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
const router = useRouter()//竟然要放在方法的外面去定义
const route = useRoute()
const phone = ref<number>()
const password = ref<string>()
//进行登录的操作
const registerToken = useRegesterStore()
const ischecked = ref<boolean>()
const loginHandle = () => {
  if (!phone.value) {
    showToast('请输入手机号！')
    return
  }
  if (!password.value) {
    showToast('请输入密码！')
    return
  }
  if (!ischecked.value) {
    showToast(`请同意用户条款`)
    return
  }
  registerToken.token = password.value
  //返回原来的网页
  const redirect = route.query.redirect as string
  if (redirect) {
    router.replace(redirect)
    return
  }
  //正常登录
  router.push({path:'/layout'})
}

//游客去登录
const guestToLayoutHandle = () => {
  router.push({
    path:'/layout'
  })
}


</script>

<template>
<body class="bg-white flex flex-col justify-center items-center w-[100vw]  h-[100vh] bg-gradient-to-b from-red-50 to-white">
  <!-- Logo and guest-->
  <div class="grid grid-rows-6 grid-cols-7 basis-3/5 pt-[20px] " >
    <div class="col-start-7 text-gray-400" @click="guestToLayoutHandle">Guest</div>
    <img src="../assets/logo.svg" alt="" class="row-start-3 col-start-4 h-12 w-12 rounded-full ">
  </div>

  <div class="basis-2/5 flex flex-col justify-center items-center">
    <!-- 手机号码输入 -->
    <div class="mx-[20px] w-[80%] mb-4 flex items-center bg-gray-100 rounded-lg p-3 shadow-sm">
      <span class="text-gray-600 pr-2 mr-2 border-r-1">+86</span>
      <input v-model="phone" type="text" placeholder="请输入电话号码" class="outline-none ">
    </div>
    <!-- 密码输入 -->
    <div class="mx-[20px] w-[80%] mb-4 flex items-center bg-gray-100 rounded-lg p-3 shadow-sm">
      <input v-model="password" type="text" placeholder="请输入密码" class="outline-none ">
    </div>

    <!-- 一键登录按钮 -->
    <button @:click="loginHandle" class="mx-[20px] w-[80%] bg-red-500 text-white py-3 rounded-full ">
      登录
    </button>

    <!-- 协议部分 -->
    <div class="w-[80%] mt-4 text-[10px] text-gray-500">
      <label class="flex mb-2 flex-wrap">
        <van-checkbox v-model="ischecked" icon-size="14px" class=" mr-[2px]"></van-checkbox>
        <span>我已阅读并同意</span>
        <a href="#" class="text-blue-500 ">《用户条款》</a>、
        <a href="#" class="text-blue-500 ">《隐私政策》</a>、
        <a href="#" class="text-blue-500 ">《未成年人健康权益协议》</a>
      </label>
      <div class="mt-4 text-center">
        <a href="#" class="text-gray-400 ">其他登录方式></a>
      </div>
    </div>
  </div>
</body>
</template>

