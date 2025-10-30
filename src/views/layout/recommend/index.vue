<script setup lang="ts"></script>

<template>
  <div>
    <div
      class="fixed top-0 z-10 left-0 w-full flex items-center justify-between pt-1 px-2 bg-white"
    >
      <img class="w-[30px]" src="../../../assets/menu.svg" alt="" />
      <div class="">
        <router-link to="/selected">音乐</router-link>
      </div>
      <div class="">
        <router-link to="/blog">播客</router-link>
      </div>
      <div class="">
        <router-link to="/listen">听书</router-link>
      </div>
      <div class="">
        <router-link to="/live">直播</router-link>
      </div>
      <img class="w-[30px]" src="../../../assets/search.svg" alt="" />
    </div>

    <div class="mt-[34px]">
      <router-view></router-view>
    </div>
  </div>
</template>
