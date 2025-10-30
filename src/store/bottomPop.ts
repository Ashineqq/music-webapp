import { defineStore } from "pinia";
import { ref } from "vue";

export const usePopUpStore = defineStore("bottomPopUp", () => {
  const recommendVal = ref();
  const bottomVisible = ref(false);
  return {
    recommendVal,
    bottomVisible,
  };
});
