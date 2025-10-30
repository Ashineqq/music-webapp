<script setup lang="ts">
import { ref, watch } from "vue";
import { useCollectStore } from "../../../store/collect";
import { useSongIdStore } from "../../../store/songList";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const loading = ref(true);
const finished = ref(true);
const collectStore = useCollectStore();
const songStore = useSongIdStore();
const { collectInfo } = storeToRefs(collectStore);
const { collects, id } = storeToRefs(songStore);

interface Collect {
  picUrl: string;
  name: string;
}

const listNow = ref<Collect[]>([]);
//显示showList
const showList = () => {
  listNow.value = [];
  for (let i = 0; i < collectInfo.value.length; i++)
    listNow.value.push({
      picUrl: collects.value[collectInfo.value[i].collectIndex].picUrl,
      name: collects.value[collectInfo.value[i].collectIndex].name,
    });
};
watch(
  () => collectInfo.value,
  () => {
    showList();
  },
  {
    deep: true,
    immediate: true,
  },
);

//去甄选收藏页面
const router = useRouter();
const toCollectViewHandle = (index: number) => {
  router.push({
    path: "/songList",
  });
  id.value = collectInfo.value[index].collectId;
};

//取消甄选收藏页面
const cancelCollection = (index: number) => {
  collectInfo.value = collectInfo.value.filter((_, i) => {
    return i !== index;
  });
  collects.value = collects.value.filter((_, i) => {
    return i !== index;
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
          v-for="(item, index) in listNow"
          @click="toCollectViewHandle(index)"
        >
          <img
            :src="item.picUrl"
            alt=""
            class="mr-2 w-[36px] rounded-sm my-2"
          />
          <div class="my-2">
            <p class="text-black text-[14px]">{{ item.name }}</p>
            <div class="flex items-center text-[12px]">
              <p class="">{{ "n" }}</p>
              <p>首</p>
            </div>
          </div>
          <img
            src="../../../assets/cancel.svg"
            alt=""
            class="w-[22px] absolute right-0"
            @click.stop="cancelCollection(index)"
          />
        </div>
      </div>
    </van-list>
  </div>
</template>
