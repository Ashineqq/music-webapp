import { defineStore } from "pinia"
import {ref} from 'vue'

export const useCommentIdStore = defineStore('commentId', () => {
  const commentParent = ref()
  const visible = ref(false)
  const id = ref()
  return {
    commentParent,
    visible,
    id
  }
})