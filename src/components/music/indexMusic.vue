<script setup lang="ts">
import { ref } from "vue";
import recent from "./music/recent.vue";
import create from "./music/create.vue";
import collection from "./music/collection.vue";
import ablums from "./music/ablums.vue";

const sonClickedA = ref(true);
const sonClickedB = ref(false);
const sonClickedC = ref(false);
const sonClickedD = ref(false);
const sonClickedAHandle = () => {
  sonClickedC.value = false;
  sonClickedD.value = false;
  sonClickedB.value = false;
  sonClickedA.value = true;
};
const sonClickedBHandle = () => {
  sonClickedC.value = false;
  sonClickedD.value = false;
  sonClickedA.value = false;
  sonClickedB.value = true;
};
const sonClickedCHandle = () => {
  sonClickedD.value = false;
  sonClickedB.value = false;
  sonClickedA.value = false;
  sonClickedC.value = true;
};
const sonClickedDHandle = () => {
  sonClickedC.value = false;
  sonClickedB.value = false;
  sonClickedA.value = false;
  sonClickedD.value = true;
};
</script>

<template>
  <div class="flex items-center bg-white w-full mb-2">
    <div class="ml-4" @click="sonClickedAHandle">
      <p :class="[' text-[12px] font-bold', { 'text-black': sonClickedA }]">
        近期
      </p>
    </div>
    <div class="ml-4" @click="sonClickedBHandle">
      <p :class="[' text-[12px] font-bold', { 'text-black': sonClickedB }]">
        创建
      </p>
    </div>
    <div class="ml-4" @click="sonClickedCHandle">
      <p :class="[' text-[12px] font-bold', { 'text-black': sonClickedC }]">
        收藏
      </p>
    </div>
    <div class="ml-4" @click="sonClickedDHandle">
      <p :class="[' text-[12px] font-bold', { 'text-black': sonClickedD }]">
        专辑
      </p>
    </div>
  </div>
  <!-- 各个音乐下的组件 -->
  <recent v-if="sonClickedA"></recent>
  <create v-if="sonClickedB"></create>
  <collection v-if="sonClickedC"></collection>
  <ablums v-if="sonClickedD"></ablums>
</template>
