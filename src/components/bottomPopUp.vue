<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePopUpStore } from "../store/bottomPop";
import { useRouter } from "vue-router";
import { useHistoryStory } from "../store/historyList";
import { watch } from "vue";

const store = usePopUpStore();
const { recommendVal, bottomVisible } = storeToRefs(store); // 解构为响应式 ref

watch(recommendVal, (val) => {
  if (val) {
    bottomVisible.value = true;
  }
});

//跳转到播放主页面
const router = useRouter();
const toMainHandle = () => {
  router.push({ path: "/recordMain" });
};

//点击三横键可以显示当前播放列表
const historyList = useHistoryStory();
const { visable } = storeToRefs(historyList);
const clickListHandle = () => {
  visable.value = true;
};
</script>

<template>
  <div v-if="bottomVisible" class="w-full bg-white">
    <div class="flex items-center px-4 py-2">
      <!-- 歌曲图片 -->
      <img
        :src="recommendVal.picUrl"
        alt=""
        class="rounded-full w-10 h-10"
        @click="toMainHandle"
      />

      <!-- 歌曲名称 -->
      <p class="mx-3 flex-1 line-clamp-1 text-gray-800">
        {{ recommendVal.name }}
      </p>

      <!-- 播放控制按钮 -->
      <div class="flex items-center">
        <img src="../assets/record.svg" alt="播放" class="w-6 h-6 mx-2" />
        <img
          src="../assets/menu.svg"
          alt="菜单"
          class="w-6 h-6 mr-2"
          @click.stop="clickListHandle"
        />
      </div>
    </div>
  </div>
</template>
