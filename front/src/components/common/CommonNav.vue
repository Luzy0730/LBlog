<script setup lang="ts">
import { useSystemStore } from "@/stores";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const { blogName } = defineProps<{
  blogName: string;
}>();

const systemStore = useSystemStore();
const { mobileHide, clientSize } = storeToRefs(systemStore);

const route = useRoute();
const navRef = ref<HTMLDivElement>();

// 路由改变，收齐导航栏
watch(
  () => route.path,
  () => {
    systemStore.save_mobileHide(true);
  }
);

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

  //监听点击事件，收起导航菜单
  document.addEventListener("click", (e) => {
    let flag = navRef.value?.contains(e.target as Node);
    if (!mobileHide.value && !flag) {
      systemStore.save_mobileHide(true);
    }
  });
});

const router = useRouter()
const onSearch = (e: KeyboardEvent) => {
  const value = (e.target as HTMLInputElement).value
  router.push({ path: '/search', query: { keyword: value } })
}
</script>

<template>
  <div ref="navRef" class="ui fixed inverted menu stackable" :class="{
    'm-transparent': $route.name === 'home' && clientSize.clientWidth > 768,
  }">
    <div class="ui container">
      <router-link to="/">
        <h3 class="ui header item m-blue">{{ blogName }}</h3>
      </router-link>
      <router-link to="/home" class="item" :class="{ 'm-mobile-hide': mobileHide, active: $route.name === 'home' }">
        <i class="home icon"></i>首页
      </router-link>
      <router-link to="/about" class="item" :class="{
        'm-mobile-hide': mobileHide,
        active: $route.name === 'about',
      }">
        <i class="info icon"></i>关于我
      </router-link>
      <div class="ui inverted transparent icon input right item">
        <input type="text" placeholder="Search..." @keydown.enter="onSearch">
        <i class="search icon"></i>
      </div>
      <button class="ui black button icon m-mobile-show menu m-hide m-ab-tr"
        @click="systemStore.save_mobileHide(!mobileHide)" style="transform: translateY(5px)">
        <i class="icon sidebar"></i>
      </button>
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
