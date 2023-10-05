<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/index'
import { type TocItem } from '@/stores/types/blog.type'

const blogStore = useBlogStore()
const tocList = computed(() => blogStore.tocList)

const route = useRoute()
const isShowBlogMenu = computed(() => route.name === 'blog')

const handleNavLinkTo = (event: Event, item: TocItem) => {
  event.preventDefault();
  if (item.element) {
    let fontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    ); // 获取根元素的字体大小
    let targetOffsetTop = (item.element as HTMLElement).offsetTop - 3 * fontSize; // 目标元素的顶部偏移量减去 3em（调整的高度）
    window.scrollTo({
      top: targetOffsetTop,
      behavior: 'smooth' // 平滑滚动
    });
  }
}

</script>
<template>
  <div class="ui segments m-box" v-if="isShowBlogMenu">
    <div class="ui secondary segment">
      <icon name="menu-2-fill" /><span class="m-text-500 m-margin-lr">文章目录</span>
    </div>
    <div class="ui yellow segment">
      <ul>
        <li v-for="(item, index) in tocList" :key="index" :style="item.style" :title="(item.title as string)">
          <a :href="`#${item.title}`" :class="`toc-level-${item.level}`" @click="event => handleNavLinkTo(event, item)">{{
            item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
