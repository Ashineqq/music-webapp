import { defineStore } from "pinia"
import { ref } from 'vue'

export const useHistoryStory = defineStore('historyStore', () => {
  const songList = ref()
  const visable = ref(false)
  return {
    songList,
    visable,
  }
})