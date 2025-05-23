import { defineStore } from "pinia"
import { ref } from "vue"

//登录
export const useRegesterStore = defineStore('regester', () => {
  const token = ref<string>()
  return {
    token
  }
}, {
 persist: true
})