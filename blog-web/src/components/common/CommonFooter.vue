<script setup lang="ts">
import type { SiteInfo } from "@/stores/types/system.type";
const {} = defineProps<{
  siteInfo: SiteInfo;
}>();
</script>
<template>
  <footer class="ui inverted vertical footer segment">
    <div class="ui center aligned container">
      <p class="m-text-thin m-text-spaced m-opacity-mini">
        世界上一切的不公平，都来自于当事人能力的不足。
      </p>
      <p class="m-opacity-mini">怀揣希望努力,静待美好降临。</p>
      <div class="ui inverted section divider"></div>
      <p class="m-text-thin m-text-spaced m-opacity-tiny">
        <span style="margin-right: 10px" v-if="siteInfo.copyright">{{
          siteInfo.copyright.title
        }}</span>
        <router-link to="/" style="color: #ffe500" v-if="siteInfo.copyright">{{
          siteInfo.copyright.siteName
        }}</router-link>
        <span style="margin: 0 15px" v-if="siteInfo.copyright && siteInfo.beian"
          >|</span
        >
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          style="color: #ffe500"
          >{{ siteInfo.beian }}</a
        >
      </p>
    </div>
  </footer>
</template>
