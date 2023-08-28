<script setup lang="ts">
import "APlayer/dist/APlayer.min.css";
import APlayer from "APlayer";

const ap = ref();
const aplayerRef = ref<HTMLDivElement>();
const musicOption = reactive({
  audio: [
    {
      name: "Miss You",
      artist: "塞壬唱片-MSR",
      url: "https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/music/Miss%20You.mp3",
      cover:
        "https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/music/Miss%20You.webp",
    },
  ],
  info: {
    fixed: false, // 不开启吸底模式
    listFolded: true, // 折叠歌曲列表
    autoplay: true, // 开启自动播放
    preload: "auto", // 自动预加载歌曲
    loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
    order: "list", //  播放模式，list列表播放, random随机播放
  },
});
const about = ref({
  title: "关于LL",
  content:
    '<h3 id="目前的情况">目前的情况</h3>\n<ul>\n<li>M E：前端小趴菜</li>\n<li>目标：少想多做吧</li>\n\n<li>爱好：写Bug、逛B站</li>\n<li>性格：喜静、偶尔emo，时刻督促自己变得阳光开朗</li>\n</ul>\n<h3 id="我--博客">我 &amp; 博客</h3>\n<p>很少对事物起兴趣，有时会因考虑太多做出不明智的决定😅</p>\n<p>因为口嗨放了兄弟几次鸽子，被骂的可惨了，反思中...</p>\n<p>喜欢安静，节奏控，coding 时喜欢听婉转美好的歌曲🎵</p>\n\n<p><a href="https://github.com/Lzy0730/LBlog" target="_blank">🍓LBlog个人博客系统</a>，作为学习过程中的产物，参考很多博客，蠢蠢的缝合怪⭐️</p>\n<p>写博客的起因也很简单，日常知识点太多，用md或word不好看，就想弄个博客了。</p>\n',
});

onMounted(() => {
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
