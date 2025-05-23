<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { getCommentList } from '../api/comment'
import { useRoute ,useRouter } from 'vue-router'
import { ref } from 'vue'
import { useCommentIdStore } from '../store/commentId'
import { storeToRefs } from 'pinia'
import { sendComment } from '../api/sendComment'
import reply from '../components/reply.vue'
import { showToast } from 'vant'
import { useRegesterStore } from '../store/token'

//获取评论
const route = useRoute()
const router = useRouter()
const strSongId = route.query.songid
const hComments = ref()
const getComment = async () => {
  const { data } = await getCommentList(parseInt(strSongId as string, 10), 500)
  hComments.value = data.hotComments
}

//计算总评论数
const commentSum = computed(() => {
  if (!hComments.value) {
    return 0
  }
  return hComments.value.length 
})

//显示评论
const loading = true
const finished = true

//进入回复页面
const comment = useCommentIdStore()
const {commentParent, visible ,id} = storeToRefs(comment)
const toReplyHandle = (item:any) => {
  commentParent.value = item
  visible.value = true
  id.value = parseInt(strSongId as string, 10)
}

//给歌曲发评论
const sendInput = ref<string>('')
const sendCommentHandle = async () => {
  const regester = useRegesterStore()
  const { token } = storeToRefs(regester)
  if (!token.value) {
    console.log('没有token')
    router.push({
      path: '/login',
      query: {
        redirect:route.fullPath
      }
    })
    showToast('请先登录！')
    return
  }
  try {
    if (sendInput.value === '') {
      return
    }
    await sendComment(parseInt(strSongId as string, 10), sendInput.value)
  } catch(error) {
    console.error('error sending comment:', error)
    showToast('error:' + error)
  }
  sendInput.value = ''
}

onMounted(() => {
  getComment()
})

</script>

<template>
<div :class="['flex flex-col h-screen w-full',{'bg-black/50':visible}]">
  <!-- title 评论 -->
  <div class="flex items-center justify-between h-1/12 mx-4">
    <img src="../assets/return.svg" alt="" class="w-[24px]" @click="router.back()">
    <p class="font-bold">评论</p>
    <p class="w-[24px]"></p>
  </div>
  <!-- 歌曲信息 -->
  <div class="flex items-center h-1/12 mx-4">
    <img src="../assets/image.png" alt="" class="w-[36px] rounded-full mr-1">
    <p class="text-[#525252] text-[18px]">songdesc</p>
    <p class="text-[#a1a19f] text-[14px]">-author</p>
  </div>
  <div class="w-full border-[#f7f7f7] border-4 px-4"></div>
  <!-- 评论 -->
  <div class="flex mx-4 h-1/24 items-center">
    <p class="text-[14px] font-bold">评论({{ commentSum }})</p>
  </div>
  <!-- 评论列表 -->
  <div class="px-4 w-full overflow-y-auto h-18/24"> 
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了">
      <div class="flex flex-col py-4 border-b-1 border-[#f6f6f6]" v-for="(item) in hComments" :key="item.commentId">
        <div class="flex items-center relative">
          <img :src="item.user.avatarUrl" alt="" class="w-[36px] rounded-full mr-2 ">
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
        <div class="flex flex-col ml-[42px] pt-1">
          <p class="text-[#3f3f43] text-[12px] font-sans">{{ item.content }}</p>
        </div>
        <!-- 回复 -->
        <div class="ml-[44px] pt-2" @click.stop="toReplyHandle( item )">
          <p class="text-[#8498a1] text-[12px]">{{ 'n' }}条回复 ></p>
        </div>
      </div>
    </van-list>     
  </div>
  <div class="fixed bottom-0 w-full z-20" v-if="visible">
    <reply></reply>
  </div>
  <!-- 发评论 -->
  <div class="fixed bg-white z-10 bottom-0 flex items-center w-full px-4 h-[60px]">
    <input v-model="sendInput" type="text" placeholder="千头万绪，落笔汇成评论一句" class="flex-1 mr-2 bg-[#f2f3f5] rounded-full p-2">
    <div class="w-20px text-[#cdcdcf] text-[14px]" @click="sendCommentHandle">发送</div>
  </div>
</div>
</template>