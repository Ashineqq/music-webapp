<script setup lang="ts">
import bottomPopUp from "../../components/bottomPopUp.vue";
import songHistory from "../../components/songHistory.vue";
import newCreate from "../../components/newCreate.vue";
</script>

<template>
  <div class="min-h-screen text-gray-500 w-screen flex flex-col">
    <!-- 内容区域 -->
    <div>
      <router-view></router-view>
    </div>
    <!-- 播放页面 -->
    <div class="fixed bottom-[45px] w-full z-40">
      <bottomPopUp></bottomPopUp>
    </div>
    <!-- 播放列表页面 -->
    <songHistory></songHistory>
    <!-- 添加歌单页面 -->
    <newCreate></newCreate>

    <!-- 导航栏 -->
    <div
      class="flex justify-between bg-white fixed bottom-0 left-0 w-full pt-2 px-2"
    >
      <router-link to="/recommend">
        <div class="flex flex-col items-center">
          <img
            class="w-[30px] h-[30px]"
            src="../../assets/recommend.svg"
            alt=""
          />
          <p class="text-[10px]">推荐</p>
        </div>
      </router-link>
      <router-link to="/find">
        <div class="flex flex-col items-center">
          <img class="w-[30px] h-[30px]" src="../../assets/find.svg" alt="" />
          <p class="text-[10px]">发现</p>
        </div>
      </router-link>
      <router-link to="/roaming">
        <div class="flex flex-col items-center">
          <img
            class="w-[30px] h-[30px]"
            src="../../assets/roaming.svg"
            alt=""
          />
          <p class="text-[10px]">漫游</p>
        </div>
      </router-link>
      <router-link to="/dynamics">
        <div class="flex flex-col items-center">
          <img
            class="w-[30px] h-[30px]"
            src="../../assets/dynamic.svg"
            alt=""
          />
          <p class="text-[10px]">动态</p>
        </div>
      </router-link>
      <router-link to="/user">
        <div class="flex flex-col items-center">
          <img class="w-[30px] h-[30px]" src="../../assets/user.svg" alt="" />
          <p class="text-[10px]">我的</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
