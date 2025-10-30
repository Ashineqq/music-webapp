<script setup lang="ts">
import { ref } from "vue";
import indexMusic from "../../components/music/indexMusic.vue";
import indexBlog from "../../components/blog/indexBlog.vue";
import indexMoment from "../../components/moments/indexMoment.vue";

//大切换栏
const parentClickedA = ref(true);
const parentClickedB = ref(false);
const parentClickedC = ref(false);

const parentClickedAHandle = () => {
  parentClickedB.value = false;
  parentClickedC.value = false;
  parentClickedA.value = true;
};
const parentClickedBHandle = () => {
  parentClickedC.value = false;
  parentClickedA.value = false;
  parentClickedB.value = true;
};
const parentClickedCHandle = () => {
  parentClickedB.value = false;
  parentClickedA.value = false;
  parentClickedC.value = true;
};
</script>

<template>
  <div class="h-[92vh] w-full flex-col flex overflow-y-auto">
    <!-- 上半部分 -->
    <div class="relative h-1/2 w-full" id="img">
      <!-- title功能区 -->
      <div class="relative h-1/6 mx-4 flex items-center justify-between mt-2">
        <img src="../../assets/menu.svg" alt="" class="w-[24px]" />
        <div class="flex items-center">
          <img src="../../assets/search.svg" alt="" class="w-[24px] mr-2" />
          <img src="../../assets/more.svg" alt="" class="w-[24px]" />
        </div>
      </div>
      <!-- 头像 -->
      <div class="flex items-center justify-center relative h-3/12">
        <img
          src="../../assets/image.png"
          alt=""
          class="w-[58px] rounded-full"
        />
      </div>
      <!-- 名称等信息 -->
      <div class="flex flex-col relative h-2/6 items-center justify-center">
        <p class="text-white font-bold">最美的星空遇见最美的你</p>
        <p class="text-[#c6c6ca] text-[12px]">掌握声明殊非易事</p>
        <p class="text-[#c6c6ca] text-[12px]">教授乐迷 · 上海市 · 村龄7年</p>
        <div class="text-[12px] flex items-center pt-1">
          <div class="flex items-center">
            <p class="text-[#ffffff] mr-1">45</p>
            <p class="text-[#c6c6ca] mr-4">关注</p>
          </div>
          <div class="flex items-center">
            <p class="text-[#ffffff] mr-1">14</p>
            <p class="text-[#c6c6ca] mr-4">粉丝</p>
          </div>
          <div class="flex items-center">
            <p class="text-[#ffffff] mr-1">Lv.8</p>
            <p class="text-[#c6c6ca] mr-4">等级</p>
          </div>
          <div class="flex items-center">
            <p class="text-[#ffffff] mr-1">2118时</p>
            <p class="text-[#c6c6ca]">听歌</p>
          </div>
        </div>
      </div>
      <!-- 最近本地云盘已购 -->
      <div class="flex items-center mx-4 text-[10px]">
        <div
          class="flex items-center justify-center p-2 mr-2 bg-white/25 rounded-sm h-[30px] flex-1"
        >
          <img src="../../assets/recent.svg" alt="" class="mr-1 w-[14px]" />
          <p class="text-[#c6c6ca]">最近</p>
        </div>
        <div
          class="flex items-center justify-center p-2 mr-2 bg-white/25 rounded-sm h-[30px] flex-1"
        >
          <img src="../../assets/download.svg" alt="" class="mr-1 w-[14px]" />
          <p class="text-[#c6c6ca]">本地</p>
        </div>
        <div
          class="flex items-center justify-center p-2 mr-2 bg-white/25 rounded-sm h-[30px] flex-1"
        >
          <img src="../../assets/cloud.svg" alt="" class="mr-1 w-[16px]" />
          <p class="text-[#c6c6ca]">云盘</p>
        </div>
        <div
          class="flex items-center justify-center p-2 bg-white/25 rounded-sm h-[30px] flex-1"
        >
          <img src="../../assets/buyed.svg" alt="" class="w-[22px]" />
          <p class="text-[#c6c6ca]">已购</p>
        </div>
      </div>
    </div>
    <!-- 下半部分 -->
    <div
      class="relative h-12/24 w-full rounded-[10px] bg-white z-10 -mt-5 pt-2"
    >
      <!-- sticky区域 -->
      <div class="sticky top-0">
        <!-- 大切换栏 -->
        <div class="flex items-center justify-evenly mb-2">
          <div class="flex flex-col items-center" @click="parentClickedAHandle">
            <p
              :class="[
                'text-[15px] font-bold',
                { 'text-black': parentClickedA },
              ]"
            >
              音乐
            </p>
            <div
              class="border-1 w-[16px] border-[#fb2a59]"
              v-if="parentClickedA"
            ></div>
          </div>
          <div class="flex flex-col items-center" @click="parentClickedBHandle">
            <p
              :class="[
                'text-[15px] font-bold',
                { 'text-black': parentClickedB },
              ]"
            >
              播客
            </p>
            <div
              class="border-1 w-[16px] border-[#fb2a59]"
              v-if="parentClickedB"
            ></div>
          </div>
          <div class="flex flex-col items-center" @click="parentClickedCHandle">
            <p
              :class="[
                'text-[15px] font-bold',
                { 'text-black': parentClickedC },
              ]"
            >
              动态
            </p>
            <div
              class="border-1 w-[16px] border-[#fb2a59]"
              v-if="parentClickedC"
            ></div>
          </div>
        </div>
        <!-- 小切换栏 -->
        <indexMusic v-if="parentClickedA"></indexMusic>
        <indexBlog v-if="parentClickedB"></indexBlog>
        <indexMoment v-if="parentClickedC"></indexMoment>
      </div>
    </div>
  </div>
</template>

<style>
#img {
  background: url("../../assets/bgimg.jpg") no-repeat center/cover;
  /* opacity: 0.9;  */
}
</style>
