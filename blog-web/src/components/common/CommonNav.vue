<script setup lang="ts">
import { useSystemStore } from "@/stores";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const { blogName } = defineProps<{
  blogName: string;
}>();

const { mobileHide, clientSize } = storeToRefs(useSystemStore());
const route = useRoute();
const navRef = ref<HTMLDivElement>();

onMounted(() => {
  //监听页面滚动位置，改变导航栏的显示
  window.addEventListener("scroll", () => {
    //首页且不是移动端
    if (route.name === "home" && clientSize.value.clientWidth > 768) {
      if (window.scrollY > clientSize.value.clientHeight / 2) {
        navRef.value?.classList.remove("m-transparent");
      } else {
        navRef.value?.classList.add("m-transparent");
      }
    }
  });
});
</script>

<template>
  <div
    ref="navRef"
    class="ui fixed inverted menu"
    :class="{
      'm-transparent': $route.name === 'home' && clientSize.clientWidth > 768,
    }"
  >
    <div class="ui container">
      <router-link to="/">
        <h3 class="ui header item m-blue">{{ blogName }}</h3>
      </router-link>
      <router-link
        to="/home"
        class="item"
        :class="{ 'm-mobile-hide': mobileHide, active: $route.name === 'home' }"
      >
        <i class="home icon"></i>首页
      </router-link>
      <router-link
        to="/about"
        class="item"
        :class="{
          'm-mobile-hide': mobileHide,
          active: $route.name === 'about',
        }"
      >
        <i class="info icon"></i>关于我
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.ui.fixed.menu .container {
  width: 1400px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.ui.fixed.menu {
  transition: 0.3s ease-out;
}
</style>
