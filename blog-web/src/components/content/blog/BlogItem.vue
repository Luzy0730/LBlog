<script setup lang="ts">
const { blogItem } = defineProps<{
  blogItem: BlogItem;
}>();
const instance = getCurrentInstance();
const timeFormat = computed(
  () => (time: string) => instance?.proxy?.$dayjs(time).format("YYYY-MM-DD")
);
</script>

<template>
  <div class="ui segment m-box m-padded-tb-large m-margin-bottom-big">
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
        <router-link to="#" :class="blogItem.category.color" class="ui large ribbon label">
          <i class="small icon" :class="blogItem.category.icon"></i><span class="m-text-500">{{ blogItem.category.name
          }}</span>
        </router-link>
        <!--文章Markdown描述-->
        <div class="typo m-padded-tb-small" v-html="blogItem.description"></div>
        <!--阅读全文按钮-->
        <div class="row">
          <button class="ui inverted secondary button m-center">
            阅读全文
          </button>
        </div>
        <!--横线-->
        <div class="ui section divider m-margin-lr-no"></div>
        <!--标签-->
        <div class="row m-padded-tb-no">
          <div class="column m-padding-left-no">
            <router-link to="#" class="ui tag label m-text-500 m-margin-small" :class="tag.color"
              v-for="tag in blogItem.tags" :key="tag.id">{{ tag.name }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
