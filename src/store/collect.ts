import { defineStore } from "pinia";
import { ref } from "vue";

interface Collect {
  collectId: number;
  collectIndex: number;
}

export const useCollectStore = defineStore("collect", () => {
  const collectInfo = ref<Collect[]>([]);
  return {
    collectInfo,
  };
});
