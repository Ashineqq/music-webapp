<script setup lang="ts">
import { ref, watch } from "vue";
interface Obj {
  name: string;
  n: number;
}
const person = ref<Obj[]>([]);
const addNum = () => {
  person.value.push({
    name: "a",
    n: 12,
  });
};
watch(
  () => person.value.length,
  () => {
    console.log("发生了变化");
  },
);
</script>

<template>
  <button @click="addNum">点击加一</button>
</template>

<style scoped></style>
