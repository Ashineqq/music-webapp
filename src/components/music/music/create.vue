<script setup lang="ts">
import { ref } from "vue";
import { useNewCreateStore } from "../../../store/newCreate";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const loading = ref(true);
const finished = ref(true);

//新建歌单

//是否可见
const newCreate = useNewCreateStore();
const { newCreateVisible, inputNameList, songTemp, collectToCreateVisible } =
  storeToRefs(newCreate);

//进行存储
const collectToCreateHandle = (albumIndex: number) => {
  if (songTemp.value.al.name === "") {
    return;
  }
  inputNameList.value[albumIndex].song.push({
    al: {
      name: songTemp.value.al.name,
      picUrl: songTemp.value.al.picUrl,
    },
  });
  songTemp.value.al.name = "";
  songTemp.value.al.picUrl = "";
};

//进入歌单内部
const router = useRouter();
const toCreatelistHandle = (songLength: number, albumIndex: number) => {
  if (songLength === 0) {
    return;
  }
  collectToCreateVisible.value = false;
  router.push({
    path: "/songList",
    query: {
      createId: albumIndex,
    },
  });
};

//删除歌单
const cancleAlbumHandle = (albumIndex: number) => {
  inputNameList.value = inputNameList.value.filter((_, index) => {
    return index !== albumIndex;
  });
};
</script>

<template>
  <div :class="['px-4 w-full rounded-[22px] bg-white']">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <div>
        <div
          class="relative flex items-center"
          v-for="(item, index) in inputNameList"
        >
          <img
            src="../../../assets/image.png"
            alt=""
            class="mr-2 w-[36px] rounded-sm my-2"
            @click="toCreatelistHandle(item.song.length, index)"
          />
          <div class="my-2" @click="collectToCreateHandle(index)">
            <p class="text-black text-[14px]">{{ item.name }}</p>
            <div class="flex items-center text-[12px]">
              <p class="">{{ item.song.length }}</p>
              <p>首</p>
            </div>
          </div>
          <img
            src="../../../assets/cancel.svg"
            alt=""
            class="w-[22px] absolute right-0"
            @click="cancleAlbumHandle(index)"
          />
        </div>
        <div class="flex items-center" @click="newCreateVisible = true">
          <div
            class="bg-black/10 w-[36px] h-[36px] flex items-center justify-center mr-2"
          >
            <img
              src="../../../assets/newcreate.svg"
              alt=""
              class="w-[24px] rounded-sm"
            />
          </div>
          <p class="text-black text-[14px]">新建歌单</p>
        </div>
      </div>
    </van-list>
  </div>
</template>
