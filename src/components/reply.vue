<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCommentIdStore } from '../store/commentId'
import { ref, onMounted, onUnmounted } from 'vue'
import { getReply } from '../api/reply'

const commentReply = useCommentIdStore()
const {commentParent ,visible ,id} = storeToRefs(commentReply)

//点击回复组件外的区域可以消失播放列表
const componentRef = ref()
const clickListNoHandle = (event:any) => {
  if (componentRef.value && !componentRef.value.contains(event.target)) {
    visible.value = false
  }
}

//获取回复
const items = ref()
const getReplyHandle = async () => {
  const { data: { data } } = await getReply(commentParent.value.commentId, id.value) 
  console.log(data)
  items.value = data.comments
}

//显示回复列表
const loading = ref(true)
const finished = ref(true)

onMounted(() => {
  getReplyHandle()
  document.addEventListener('click',clickListNoHandle)
})

onUnmounted(() => {
  document.removeEventListener('click',clickListNoHandle)
})

</script>

<template>
<div class="flex flex-col w-full h-[93vh] rounded-t-[20px] z-20 bg-white" ref="componentRef">
  <!-- 回复title -->
  <div class=" flex items-center px-4 pt-3 justify-between h-1/24">
    <p class="w-[24px]"></p>
    <p class="">回复({{ 'n' }})</p>
    <p class="w-[24px]"></p>
  </div>
  <!-- 父级评论 -->
  <div class="flex flex-col justify-center px-4 py-4">
    <div class="flex item-center ">
      <img :src="commentParent.user.avatarUrl" alt="" class="w-[36px] rounded-full mr-2 ">
      <div>
        <p class="text-[#808080] text-[12px]">{{ commentParent.user.nickname }}</p>
        <div class="flex items-center">
          <p class="mr-1 text-[10px] text-[#d0d0d0]">{{ commentParent.timeStr }}</p>
          <p class="text-[10px] text-[#d0d0d0]">{{ commentParent.ipLocation.location }}</p>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="flex flex-col">
      <p class="text-[#3f3f43] text-[15px] font-sans">{{ commentParent.content }}</p>
    </div>
  </div>
  <!-- border -->
  <div class=" border-4 border-[#f7f7f7]"></div>
  <!-- 全部回复 -->
  <div class="flex items-center px-4 py-2">
    <p class="mr-1 text-[12px]">全部回复</p>
    <p class="text-[10px] text-[#d0d0d0]">{{ 'n' }}</p>
  </div>
  <!-- 回复展示 -->
  <div class="w-full overflow-y-auto"> 
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了">
      <div class="flex flex-col pt-4" v-for="(item) in items" :key="item.commentId">
        <!-- user title -->
        <div class=" flex items-center relative mx-4">
          <img :src="item.user.avatarUrl" alt="" class="w-[30px] rounded-full mr-2 ">
          <div>
            <p class="text-[#808080] text-[12px]">{{ item.user.nickname }}</p>
            <div class="flex items-center">
              <p class="mr-1 text-[10px] text-[#d0d0d0]">{{ item.timeStr }}</p>
              <p class="text-[10px] text-[#d0d0d0]">{{ item.ipLocation.location }}</p>
            </div>
            <!-- 点赞 -->
            <div class=" absolute right-0 top-2 flex items-center">
              <p class="text-[#d0d0d0] text-[12px] mr-[1px]">{{ item.likedCount }}</p>
              <img src="../assets/good.svg" alt="" class="w-[16px]">
            </div>
          </div>
        </div>
        <!-- 评论 -->
        <div class="flex flex-col ml-[52px] py-2  mx-4">
          <p class="text-[#3f3f43] text-[12px] font-sans">{{ item.content }}</p>
        </div>
        <div class="border-1 border-[#f7f7f7] ml-[52px]"></div>
      </div>
    </van-list>     
  </div>
</div>
</template>