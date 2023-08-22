<script setup lang="ts">
import { useSystemStore } from "@/stores";
import { storeToRefs } from "pinia";
import CommonNav from "@/components/common/CommonNav.vue";
import HomeHeader from "@/components/content/HomeHeader.vue";

const systemStore = useSystemStore();
const { siteInfo } = storeToRefs(systemStore);

//保存可视窗口大小
onMounted(() => {
  systemStore.save_clientSize({
    clientHeight: document.body.clientHeight,
    clientWidth: document.body.clientWidth,
  });
  window.onresize = () =>
    systemStore.save_clientSize({
      clientHeight: document.body.clientHeight,
      clientWidth: document.body.clientWidth,
    });
});
</script>

<template>
  <div class="site">
    <!-- 顶部导航 -->
    <CommonNav :blog-name="siteInfo.blogName" />
    <!--首页大图 只在首页且pc端时显示-->
    <div class="m-mobile-hide">
      <HomeHeader v-if="$route.name === 'home'" />
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
</style>
