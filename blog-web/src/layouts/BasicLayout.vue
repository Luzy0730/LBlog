<script setup lang="ts">
import { useSystemStore } from "@/stores";
import { storeToRefs } from "pinia";
import CommonNav from "@/components/common/CommonNav.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonIntroduction from "@/components/common/CommonIntroduction.vue";
import CommonRandomBlog from "@/components/common/CommonRandomBlog.vue";
import BlogMenu from "@/components/content/blog/BlogMenu.vue";
import HomeHeader from "@/components/content/HomeHeader.vue";

const systemStore = useSystemStore();
const { siteInfo } = storeToRefs(systemStore);

const stickyRefs = ref<any[]>([])
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
  // 绑定磁性粘连顶部
  stickyRefs.value.map((element: HTMLElement) => {
    const top = element.offsetTop
    element.style.position = 'sticky'
    element.style.alignSelf = 'flex-start'
    element.style.top = `${top}px`
  })
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
      <div class="m-padded-tb-big">
        <div class="ui container">
          <div class="ui grid m-margin-lr">
            <!--左侧-->
            <div class="three wide column m-mobile-hide" :ref="el => { stickyRefs[0] = el }">
              <CommonIntroduction />
            </div>
            <!--中间-->
            <div class="ten wide column" style="flex-grow: 1">
              <router-view v-slot="{ Component }">
                <keep-alive include="Home">
                  <component :is="Component" />
                </keep-alive>
              </router-view>
            </div>
            <!--右侧-->
            <div class="three wide column m-mobile-hide" :ref="el => { stickyRefs[1] = el }">
              <BlogMenu />
              <CommonRandomBlog />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部footer -->
    <CommonFooter :site-info="siteInfo" />
  </div>
</template>

<style scoped>
.site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.main {
  margin-top: 40px;
  flex: 1;
}

.main .ui.container {
  width: 1400px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
</style>
