<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { usePopUpStore } from "../store/bottomPop";
import { useRouter } from "vue-router";
import { useNewCreateStore } from "../store/newCreate";
import collectToCreate from "../components/collectToCreate.vue";

const store = usePopUpStore();
const { recommendVal } = storeToRefs(store); // 解构为响应式 ref
const item = recommendVal; // item 是 ref

//处理暂停播放按键

//去评论页面
const router = useRouter();
const toCommentHandle = (id: number) => {
  router.push({
    path: `/comment/`,
    query: {
      songid: id,
    },
  });
};

//进入收藏页面的相关操作
const newcreate = useNewCreateStore();
const { collectToCreateVisible, songTemp } = storeToRefs(newcreate);
const toCollectHandle = () => {
  collectToCreateVisible.value = true;
  songTemp.value.al.name = recommendVal.value.name;
  songTemp.value.al.picUrl = recommendVal.value.picUrl;
};
</script>

<template>
  <collectToCreate></collectToCreate>
  <div
    class="flex flex-col bg-gradient-to-b from-[#6f894e] to-[#2d371e] h-screen w-screen"
    v-if="item"
  >
    <!-- 顶部 -->
    <div class="flex justify-between items-center pt-8 px-4">
      <img
        src="../assets/return.svg"
        alt=""
        class="w-4"
        @click="router.back()"
      />
      <p class="text-[#b9c0b0] text-[14px]">新歌新碟</p>
      <p></p>
    </div>
    <!-- 旋转播放 -->
    <div class="flex justify-center items-center flex-8">
      <img
        :src="item.picUrl"
        alt=""
        class="w-[80vw] rounded-full animate-[spin_10s_linear_infinite]"
      />
    </div>
    <!-- 信息喜欢评论 -->
    <div class="flex items-center justify-between px-4 flex-3">
      <!-- 信息 -->
      <div class="text-[#b9c0b0] w-[50%]">
        <p class="line-clamp-1">{{ item.name }}</p>
        <p class="line-clamp-1">一些介绍</p>
      </div>
      <!-- 喜欢评论 -->
      <div class="flex space-x-4">
        <img
          src="../assets/like.svg"
          alt=""
          class="w-6"
          @click.stop="toCollectHandle()"
        />
        <img
          src="../assets/comment.svg"
          alt=""
          class="w-5"
          @click="toCommentHandle(item.id)"
        />
      </div>
    </div>
    <!-- 进度条 -->
    <div class="w-full px-4 flex-1">
      <div class="bg-gray-600 h-1 rounded-full">
        <div class="bg-white h-1 rounded-full w-[20%]"></div>
      </div>
    </div>
    <!-- 播放 -->
    <div class="flex justify-between mb-8">
      <p></p>
      <img src="../assets/leftRecord.svg" alt="" class="w-6" />
      <img
        src="../assets/record2.svg"
        alt=""
        class="w-8"
        @click=""
        ref="toggoleRef"
      />
      <img src="../assets/rightRecord.svg" alt="" class="w-6" />
      <p></p>
    </div>
  </div>
</template>
