<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHistoryStory } from '../store/historyList'
import { ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { usePopUpStore } from '../store/bottomPop'

//显示播放列表
const historyList = useHistoryStory()
const { songList, visable } = storeToRefs(historyList)
const popup = usePopUpStore()
const {bottomVisible} = storeToRefs(popup)
const loading = true
const finished = true

//点击历史组件外的区域可以消失播放列表
const componentRef = ref()
const clickListNoHandle = (event:any) => {
  if (componentRef.value && !componentRef.value.contains(event.target)) {
    historyList.visable = false
  }
}

//清空播放列表
const cleanListHandle = () => {
  historyList.songList = []
  visable.value = false
  bottomVisible.value = false
}

//删除相应歌曲
const cleanSigleHandle = (item:any) => {
  const list: [] = historyList.songList.filter((i: any) => {
    return i!==item
  })
  historyList.songList = list
}

onMounted(() => {
  document.addEventListener('click',clickListNoHandle)
})

onUnmounted(() => {
  document.removeEventListener('click',clickListNoHandle)
})

</script>

<template>
<body>
  <div class="fixed bottom-0 w-full flex flex-col z-20 h-[75vh] rounded-[20px] pt-4 bg-white" v-if="visable" ref="componentRef">
    <!-- title -->
    <div class="h-1/8 px-4 relative">
      <p class="text-[#30353e] font-bold">当前播放</p>
      <img src="../assets/clean.svg" alt="" class="w-[24px] absolute right-4" @click="cleanListHandle">
    </div>
    <!-- 当前播放列表 -->
    <div class="overflow-y-auto h-7/8">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了">
        <div :class="['flex items-center justify-between py-2 px-4 text-[#67666a]',
          { 'bg-[#f9f9f9] text-[#dd544f]': index === 0 } // 第一个 item 应用不同样式
          ]" v-for="(item,index) in songList" :key="item.id">
          <div class="flex items-center">
            <img v-if="index===0" src="../assets/recordnow.svg" alt="" class="w-[12px] mr-1">
            {{ item.name }}
          </div>
          <img src="../assets/cancel.svg" alt="" class="w-[24px]" @click.stop="cleanSigleHandle(item)">
        </div>
      </van-list>
    </div>
  </div>
</body>
</template>