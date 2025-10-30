import { defineStore } from "pinia";
import { ref } from "vue";

interface Collect {
  picUrl: string;
  name: string;
}

export const useSongIdStore = defineStore("songId", () => {
  const id = ref<number>(0);
  const collects = ref<Collect[]>([]);
  const clickIndex = ref<number>();
  return {
    id,
    collects,
    clickIndex,
  };
});
