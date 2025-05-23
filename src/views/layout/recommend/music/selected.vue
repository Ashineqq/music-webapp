<script setup lang="ts">
import { getSwipePics ,selectedList,recommendList} from '../../../../api/selected'
import { onMounted, ref } from 'vue'
import { showToast } from 'vant'
import { usePopUpStore } from '../../../../store/bottomPop'
import { useSongIdStore } from '../../../../store/songList'
import { useRouter } from 'vue-router'
import { useHistoryStory } from '../../../../store/historyList'
import { storeToRefs } from 'pinia'

const picArr = ref()

//获得轮播图
const SwipePicsToggle = async () => {
  const { data: { data } } = await getSwipePics()
  //轮播图
  picArr.value = data.blocks[0].extInfo.banners
}

//点击进行路由外网址跳转
const ImgClickHandle = (url?:string) => {
  if (url) {
    window.location.href = url
  } else {
    showToast('敬请期待！')
    console.log('没有这个网址')
  }
}

//甄选歌单
const selectedLoading = ref<boolean>(false)
const selectedFinished = ref<boolean>(true)
const selected = ref()
const onLoad = async() => {
  const { data } = await selectedList(8)
  selected.value = data.result
}

//甄选歌单获取歌单跳转
const router = useRouter()
const idStore = useSongIdStore()
const { id, collects, clickIndex } = storeToRefs(idStore)

const getIdHandle = (collectId:number , colletIndex:number) => {
  id.value = collectId
  router.push('/songList')
  clickIndex.value = colletIndex
}

//给collects装内容
const autoCollects = () => {
  if (selected.value && Array.isArray(selected.value) && !localStorage.getItem('hasRunAutoCollects')) {
    for (let i = 0; i < selected.value.length; i++) {
      collects.value.push({
        picUrl: selected.value[i].picUrl,
        name: selected.value[i].name
      })
    }
    localStorage.setItem('hasRunAutoCollects', 'true')
  }
}

//新歌新碟
const recommendLoading = ref<boolean>(false)
const recommendFinished = ref<boolean>(true)
const recommend = ref()
const recommendHandle = async() => {
  const {data} = await recommendList(20)
  recommend.value = data.result
}

//点击播放popup层(新歌新碟)
const popup = usePopUpStore()
const storeRecommendHandle = (item:any) => {
  popup.recommendVal = item
  //添加播放歌曲
  const historyList = useHistoryStory()
  if (!historyList.songList) {
    historyList.songList = []
  }
  historyList.songList.unshift(item)
}

//刷新页面就加载
onMounted(() => {
  SwipePicsToggle()
  onLoad()
  recommendHandle()
  onLoad().then(() => {
    autoCollects() // 确保 onLoad 完成后执行
  })
})

</script>

<template>
<div class=" overflow-y-auto bg-gray-100 mt-2">
  <!-- 轮播图 -->
  <van-swipe :autoplay="2500" lazy-render>
    <van-swipe-item v-for="item in picArr" :key="item.alg">
      <img :src="item.pic" alt="" class=" rounded-[8%] px-4" @click="ImgClickHandle(item.url)">
    </van-swipe-item>
  </van-swipe>

  <!-- 甄选歌曲 -->
  <div class=" text-stone-700 ml-2 my-4 font-bold">甄选歌单</div>
  <van-list
    v-model:loading="selectedLoading"
    :finished="selectedFinished"
    class="flex overflow-x-auto">
    <div class="shrink-0 w-28 px-1" v-for="(item,index) in selected" :key="item.id" @click="getIdHandle(item.id,index)">
      <img :src="item.picUrl" alt="" class=" rounded-[10%] w-26 h-26">
      <p class=" line-clamp-2 text-xs px-1">{{ item.name }}</p>
    </div>
  </van-list>

  <!-- 新歌新碟 -->
  <div class=" text-stone-700 ml-2 my-4 font-bold">新歌新碟</div>
  <van-list
    v-model:loading="recommendLoading"
    :finished="recommendFinished"
    finished-text="没有更多了"
    @load="onLoad">
    <div v-for="item in recommend" :key="item.id" class=" py-1 mx-2">
      <div class=" flex items-center relative" @click="storeRecommendHandle(item)">
        <img :src="item.picUrl" alt="" class=" w-14 rounded-[10%]">
        <div class=" grid grid-rows-2 mx-2">
          <p class=" text-gray-950">{{ item.name }}</p>
          <p class=" line-clamp-1 text-xs">{{ item.song.album.name }}</p>
        </div>
      </div>
    </div>
  </van-list>

</div>
</template>

<style scoped>
.van-list {
  -ms-overflow-style: none; /* IE 和 Edge */
  scrollbar-width: none; /* Firefox */
}
.van-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>