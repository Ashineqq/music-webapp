import { defineStore } from "pinia";
import { ref } from "vue";

interface Al {
  name: string;
  picUrl: string;
}

interface Song {
  al: Al;
}

interface CreateItem {
  name: string;
  song: Song[];
}

let temp: Song = {
  al: {
    name: "",
    picUrl: "",
  },
};

export const useNewCreateStore = defineStore("newCreate", () => {
  const newCreateVisible = ref(false);
  const collectToCreateVisible = ref(false);
  const inputNameList = ref<CreateItem[]>([]);
  const selectWhich = ref(0);
  const songTemp = ref<Song>(temp);
  return {
    newCreateVisible,
    inputNameList,
    collectToCreateVisible,
    selectWhich,
    songTemp,
  };
});
