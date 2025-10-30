<script setup lang="ts">
import { useNewCreateStore } from "../store/newCreate";
import { storeToRefs } from "pinia";
import { ref } from "vue";
//是否可见
const newCreate = useNewCreateStore();
const { newCreateVisible, inputNameList } = storeToRefs(newCreate);

const inputVal = ref("");

const cancelHandle = () => {
  newCreateVisible.value = false;
  inputVal.value = "";
};

const finishHandle = () => {
  if (inputVal.value === "") {
    return;
  }
  newCreateVisible.value = false;
  inputNameList.value.push({
    name: inputVal.value,
    song: [],
  });
  inputVal.value = "";
};
</script>

<template>
  <div class="w-screen">
    <div
      v-if="newCreateVisible"
      class="flex flex-col fixed rounded-t-[16px] bottom-0 z-50 w-screen px-4 bg-[#f1e9e9] h-[30vh] py-2"
    >
      <!-- 取消完成功能键 -->
      <div
        class="flex items-center justify-between text-black text-[12px] my-2 flex-1"
      >
        <div @click="cancelHandle" class="w-[50px] h-[50px] text-center">
          <p>取消</p>
        </div>
        <div @click.stop="finishHandle" class="w-[50px] h-[50px] text-center">
          <p>完成</p>
        </div>
      </div>
      <!-- 歌单input -->
      <div class="flex items-center justify-center w-full flex-5 -mt-10">
        <input
          v-model="inputVal"
          type="text"
          placeholder="输入新建歌单标题"
          class="p-2 border rounded-[10px] w-full"
        />
      </div>
    </div>
  </div>
</template>
