<script setup lang="ts">
import { queryCustomAbout } from '@/api/services/custom'
import "APlayer/dist/APlayer.min.css";
import APlayer from "APlayer";

const ap = ref();
const aplayerRef = ref<HTMLDivElement>();
const musicOption = reactive({
  audio: [],
  fixed: false, // 不开启吸底模式
  listFolded: true, // 折叠歌曲列表
  autoplay: true, // 开启自动播放
  preload: "none", // 自动预加载歌曲
  loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
  order: "list", //  播放模式，list列表播放, random随机播放
});
const about = ref({
  title: "",
  content: ""
});

onMounted(async () => {
  const { data } = await queryCustomAbout()
  const aboutAudio = data.about_audio ? JSON.parse(data.about_audio) : {}
  const aboutContent = data.about_content ? JSON.parse(data.about_content) : {}
  about.value.title = aboutContent.title || ""
  about.value.content = aboutContent.content || ""
  musicOption.audio = aboutAudio.list || []
  Object.assign(musicOption, aboutAudio.config || {})
  ap.value = new APlayer({
    container: aplayerRef.value,
    ...musicOption,
  });
});

onUnmounted(() => {
  ap.value.destroy();
});
</script>

<template>
  <div class="ui top attached segment m-padded-lr-big">
    <h2 class="m-text-500" style="text-align: center">{{ about.title }}</h2>
    <div ref="aplayerRef"></div>
    <div class="typo content" v-html="about.content"></div>
  </div>
</template>
