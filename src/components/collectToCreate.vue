<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNewCreateStore } from "../store/newCreate";
import { ref, onMounted, onUnmounted } from "vue";

import create from "./music/music/create.vue";
import newCreate from "./newCreate.vue";

//控制是否可见
const newcreate = useNewCreateStore();
const { collectToCreateVisible } = storeToRefs(newcreate);

//点击回复组件外的区域可以消失播放列表
const componentRef = ref();
const clickListNoHandle = (event: any) => {
  if (componentRef.value && !componentRef.value.contains(event.target)) {
    collectToCreateVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", clickListNoHandle);
});

onUnmounted(() => {
  document.removeEventListener("click", clickListNoHandle);
});
</script>

<template>
  <div
    class="flex flex-col items-center fixed bottom-0 right-0 left-0 h-[75vh] z-20 bg-white rounded-t-[20px] px-4 py-2"
    v-if="collectToCreateVisible"
    ref="componentRef"
  >
    <!-- 标头 -->
    <div class="border-1 border-[#000000] w-[22px]"></div>
    <div class="w-[calc(100%-2rem)] my-3">
      <p>添加到歌单</p>
    </div>
    <!-- 创建收藏列表 -->
    <create></create>
    <newCreate></newCreate>
  </div>
</template>
