<script setup lang="ts">
import { getSongList } from "../api/songList";
import { useSongIdStore } from "../store/songList";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, triggerRef } from "vue";
import { usePopUpStore } from "../store/bottomPop";
import { useHistoryStory } from "../store/historyList";
import bottomPopUp from "../components/bottomPopUp.vue";
import songHistory from "../components/songHistory.vue";
import { useNewCreateStore } from "../store/newCreate";
import { useCollectStore } from "../store/collect";
import { useRoute } from "vue-router";
const newCreate = useNewCreateStore();
const { inputNameList } = storeToRefs(newCreate);
import router from "../router";
import { showToast } from "vant";

const route = useRoute();

const songId = useSongIdStore();
const { id, clickIndex } = storeToRefs(songId);

//对视图进行更新
const items = computed(() => {
  return route.query.createId
    ? inputNameList.value[albumId.value]?.song || []
    : itemsRaw.value;
});

//获得歌单信息
const itemsRaw = ref();
const getSongHandle = async () => {
  const {
    data: { songs },
  } = await getSongList(id.value, 50);
  itemsRaw.value = songs;
};

//显示底层播放
const usepop = usePopUpStore();
const songHandle = (item: any) => {
  usepop.recommendVal = item;
  //push歌曲到歌曲列表
  const historyList = useHistoryStory();
  if (!historyList.songList) {
    historyList.songList = [];
  }
  historyList.songList.push(item);
};

//删除歌曲（自己创建的歌单）
const albumId = ref();
const cancleSongHandle = (songIndex: number) => {
  inputNameList.value[albumId.value].song = inputNameList.value[
    albumId.value
  ].song.filter((_, index) => {
    return songIndex !== index;
  });
  triggerRef(inputNameList);
};
const cancleVisible = ref(false);

//收藏甄选歌单
const collectStore = useCollectStore();
const { collectInfo } = storeToRefs(collectStore);
const collectHandle = () => {
  collectInfo.value?.push({
    collectId: id.value,
    collectIndex: clickIndex.value as number,
  });
  showToast("已收藏");
};

onMounted(() => {
  if (route.query.createId) {
    albumId.value = parseInt(route.query.createId as string);
    cancleVisible.value = true;
  } else {
    getSongHandle();
    cancleVisible.value = false;
  }
});

//加载歌曲列表
const loading = ref(true);
const finished = ref(true);
</script>

<template>
  <body class="">
    <div class="flex flex-col overflow-y-auto h-screen w-full" v-if="items">
      <!-- 蓝色盒子 -->
      <div
        class="flex flex-col px-4 pt-4 bg-gradient-to-bl from-[#496e8b] to-[#5d86a6] h-6/19"
      >
        <!-- 返回 -->
        <div>
          <img
            src="../assets/return.svg"
            alt=""
            class="w-5 flex-1"
            @click="router.back()"
          />
        </div>
        <!-- 歌单介绍 -->
        <div class="flex items-center flex-5">
          <img src="../assets/image.png" alt="" class="w-24 rounded-sm mr-2" />
          <div class="space-y-2">
            <p class="line-clamp-2 text-[#fefefe]">
              十月馈赠：记得把生活调成喜欢的频道
            </p>
            <p class="line-clamp-1 text-[14px] text-[#a3c1d9]">
              哥哥要喝排骨汤吗
            </p>
            <div class="flex items-center space-x-1 text-[#fefefe] mb-2">
              <p class="text-[12px]">流行</p>
              <p class="text-[12px]">华语</p>
            </div>
          </div>
          <img
            @click="collectHandle"
            v-if="!cancleVisible"
            src="../assets/collect.svg"
            alt=""
            class="w-[24px]"
          />
        </div>
      </div>
      <!-- playall -->
      <div
        class="flex h-1/19 sticky top-0 bg-gradient-to-b from-[#e5eaf0] to-[#ffffff] items-center px-4"
      >
        <img src="../assets/record2.svg" alt="" class="w-4 mr-4" />
        <div class="flex items-center">
          <p class="text-[16px] mr-1">Play all</p>
          <p class="text-[12px] text-[#a3c1d9]">({{ items.length }})</p>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="h-12/19 bg-[#ffffff] px-3" v-if="items">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
        >
          <div
            class="relateve flex items-center"
            v-for="(item, index) in items"
            @click="songHandle(item.al)"
          >
            <img
              :src="item.al.picUrl"
              alt=""
              class="w-[40px] my-2 mr-2 rounded-sm"
            />
            <div class="text-sm leading-4">
              <p class="">{{ item.al.name }}</p>
              <p class="text-[12px] text-[#a3c1d9]">{{ item.al.name }}</p>
            </div>
            <img
              v-if="cancleVisible"
              src="../assets/cancel.svg"
              alt=""
              class="w-[22px] absolute right-2"
              @click.stop="cancleSongHandle(index)"
            />
          </div>
        </van-list>
      </div>
      <!-- 底部播放小盒子 -->
      <div class="fixed bottom-0 w-full">
        <bottomPopUp></bottomPopUp>
      </div>
      <!-- 显示播放列表 -->
      <div class="fixed bottom-0 w-full">
        <songHistory></songHistory>
      </div>
    </div>
  </body>
</template>
