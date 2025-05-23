<script setup lang="ts">

</script>

<template>
<div class=" ">
  <div class=" fixed left-0 w-full pl-4 z-10 bg-white py-2">
    <router-link to="/selected" class=" pr-4">精选</router-link>
    <router-link to="/rank">排行榜</router-link>
  </div>
  <div class="pt-8">
    <router-view></router-view>
  </div>
</div>
</template>
