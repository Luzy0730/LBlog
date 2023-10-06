<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useBlogStore } from '@/stores/index'
const props = defineProps<{
  blogItem?: BlogItem;
  isDetail?: Boolean
}>();
const blogItem = computed(() => props.blogItem)
const isDetail = computed(() => props.isDetail)

const instance = getCurrentInstance();
const timeFormat = computed(
  () => (time: string) => instance?.proxy?.$dayjs(time).format("YYYY-MM-DD")
);
const colorStyle = computed(() => (color: string) => {
  return {
    "background-color": color,
    "border-color": color,
    "color": "#ffffff"
  }
})

const router = useRouter()
const onReadBlog = (id: number) => {
  router.push(`/blog/${id}`)
}

const docRef = ref()
const blogStore = useBlogStore()
watch(() => blogItem.value, newVal => {
  if (newVal) {
    nextTick(() => {
      // 代码块高亮
      instance?.proxy?.$prism.highlightAll();
      // 生成目录树
      blogStore.init_tocList(docRef.value)
    })
  }
}, {
  immediate: true
})
</script>

<template>
  <div class="ui segment m-box m-padded-tb-large m-margin-bottom-big" v-if="blogItem">
    <div class="ui middle aligned mobile reversed stackable">
      <div class="ui grid m-margin-lr">
        <!--标题-->
        <div class="row m-padded-tb-small">
          <h2 class="ui header m-center m-scaleup">
            <a href="javascript:;" class="m-black">{{ blogItem.title }}</a>
          </h2>
        </div>
        <!--文章简要信息-->
        <div class="row m-padded-tb-small">
          <div class="ui horizontal link list m-center">
            <div class="item m-datetime">
              <i class="small calendar icon"></i><span>{{ timeFormat(blogItem.createTime) }}</span>
            </div>
            <div class="item m-views">
              <i class="small eye icon"></i><span>{{ blogItem.views }}</span>
            </div>
            <div class="item m-common-black">
              <i class="small pencil alternate icon"></i><span>字数≈{{ blogItem.words }}字</span>
            </div>
          </div>
        </div>
        <!--分类-->
        <router-link :to="`/category/${blogItem.category.name}`" :style="colorStyle(blogItem.category.color)"
          class="ui large ribbon label m-hover-dark">
          <icon :name="blogItem.category.icon" /><span class="m-text-500 m-margin-lr">{{ blogItem.category.name
          }}</span>
        </router-link>
        <!--文章Markdown 描述 | 内容-->
        <div class="typo m-padded-tb-small line-numbers" ref="docRef"
          v-html="isDetail ? blogItem.content : blogItem.description">
        </div>
        <!--阅读全文按钮-->
        <div class="row">
          <button class="ui inverted secondary button m-center" @click="onReadBlog(blogItem.id)" v-if="!isDetail">
            阅读全文
          </button>
        </div>
        <!--横线-->
        <div class="ui section divider m-margin-lr-no"></div>
        <!--标签-->
        <div class="row m-padded-tb-no">
          <div class="column m-padding-left-no">
            <router-link :to="`/tag/${tag.name}`" class="ui tag label m-text-500 m-margin-small m-hover-dark"
              :style="colorStyle(tag.color)" v-for="tag in blogItem.tags" :key="tag.id">{{ tag.name }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
