<script setup lang="ts">
const props = defineProps<{
  contentHtml?: string,
  descriptionHtml?: string,
  blogExtraInfo: Partial<IArticle>
}>()

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

watch(() => props, () => {
  nextTick(() => {
    instance?.proxy?.$prism.highlightAll();
  })
}, {
  deep: true,
  immediate: true
})
</script>

<template>
  <div class="main">
    <div class="m-padded-tb-big">
      <div class="ui container">
        <div class="ui grid m-margin-lr">
          <!--左侧-->
          <div class="three wide column m-mobile-hide">
          </div>
          <!--中间-->
          <div class="ten wide column" style="flex-grow: 1">
            <div class="ui segment m-box m-padded-tb-large m-margin-bottom-big">
              <div class="ui middle aligned mobile reversed stackable">
                <div class="ui grid m-margin-lr">
                  <!--标题-->
                  <div class="row m-padded-tb-small">
                    <h2 class="ui header m-center m-scaleup">
                      <a href="javascript:;" class="m-black">{{ blogExtraInfo.title }}</a>
                    </h2>
                  </div>
                  <!--文章简要信息-->
                  <div class="row m-padded-tb-small">
                    <div class="ui horizontal link list m-center">
                      <div class="item m-datetime">
                        <i class="small calendar icon"></i><span>{{ timeFormat(blogExtraInfo.createTime as string)
                        }}</span>
                      </div>
                      <div class="item m-views">
                        <i class="small eye icon"></i><span>{{ blogExtraInfo.views }}</span>
                      </div>
                      <div class="item m-common-black">
                        <i class="small pencil alternate icon"></i><span>字数≈{{ blogExtraInfo.words }}字</span>
                      </div>
                    </div>
                  </div>
                  <!--分类-->
                  <span v-if="blogExtraInfo.category" :style="colorStyle(blogExtraInfo.category!.color)" class="ui large ribbon label m-hover-dark">
                    <icon :name="blogExtraInfo.category!.icon" /><span class="m-text-500 m-margin-lr">{{
                      blogExtraInfo.category!.name
                    }}</span>
                  </span>
                  <!--文章Markdown 描述 | 内容-->
                  <div class="typo m-padded-tb-small line-numbers" ref="docRef" v-html="descriptionHtml ? descriptionHtml : contentHtml">
                  </div>
                  <!--横线-->
                  <div class="ui section divider m-margin-lr-no" style="flex-grow: 1;"></div>
                  <!--标签-->
                  <div class="row m-padded-tb-no">
                    <div class="column m-padding-left-no">
                      <span class="ui tag label m-text-500 m-margin-small m-hover-dark" :style="colorStyle(tag.color)" v-for="tag in blogExtraInfo.tags" :key="tag.id">{{ tag.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--右侧-->
          <div class="three wide column m-mobile-hide">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  background-color: rgb(239, 239, 239);
}
</style>
<style lang="scss" scoped>
@import "semantic-ui-css/semantic.min.css";


.main {
  flex: 1;
}

.main .ui.container {
  width: 1400px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.ui.grid {
  display: flex !important;
}

/*-----color-----*/
.m-black {
  color: #333 !important;
}

.m-blue {
  color: #48dbfb !important;
}

.m-transparent {
  background: transparent !important;
}

/*-----opacity------*/
.m-opacity {
  opacity: 0.9 !important;
}

.m-opacity-mini {
  opacity: 0.8 !important;
}

.m-opacity-tiny {
  opacity: 0.6 !important;
}

/* transform */
.m-scaleup {
  transition: .3s ease !important;
}

.m-scaleup:hover {
  transform: scale(1.1) !important;
}


/* box */
.m-box {
  transition: all 0.25s ease 0s, opacity 0.6s cubic-bezier(0.5, 0, 0, 1) 0s !important;
}

.m-box:hover {
  box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.2), 0 2px 4px 0px rgba(0, 0, 0, 0.2), 0 4px 8px 0px rgba(0, 0, 0, 0.2), 0 8px 16px 0px rgba(0, 0, 0, 0.2) !important;
}

.m-box:active {
  box-shadow: 0 1px 2px 0px rgba(72, 219, 251, 0.3), 0 2px 4px 0px rgba(72, 219, 251, 0.3), 0 4px 8px 0px rgba(72, 219, 251, 0.3), 0 8px 16px 0px rgba(72, 219, 251, 0.3) !important;
}

@media (max-width: 768px) {
  .m-box {
    border-radius: 0 !important;
  }
}

/* text */

.m-text-thin {
  font-weight: 300 !important;
}

.m-text-500 {
  font-weight: 500 !important;
}

.m-text-spaced {
  letter-spacing: 1px !important;
}

/* position */
.m-margin-small {
  margin: 3px 10px !important;
}

.m-margin-lr {
  margin-left: 0.5em !important;
  margin-right: 0.5em !important;
}

.m-margin-top {
  margin-top: 1em !important;
}

.m-margin-top-large {
  margin-top: 1.5em !important;
}

.m-margin-bottom-big {
  margin-bottom: 3em !important;
}

.m-padding-bottom-large {
  padding-bottom: 2em !important;
}

.m-padding-left-no {
  padding-left: 0 !important;
}

.m-padded-tb-no {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.m-margin-lr-no {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.m-padded-tb-mini {
  padding-top: 0.2em !important;
  padding-bottom: 0.2em !important;
}

.m-padded-tb-small {
  padding-top: 0.5em !important;
  padding-bottom: 0.5em !important;
}

.m-padded-tb-large {
  padding-top: 2em !important;
  padding-bottom: 2em !important;
}

.m-padded-tb-big {
  padding-top: 3em !important;
  padding-bottom: 3em !important;
}

.m-padded-lr-big {
  padding-left: 2em !important;
  padding-right: 2em !important;
}

.m-ab-tr {
  position: absolute;
  top: 0;
  right: 0;
}

.m-center {
  margin: auto !important;
}


/* display */
.m-hide {
  display: none !important;
}

.m-show {
  display: block !important;
}

/* hover */
.m-hover-dark:hover {
  filter: brightness(0.95);
}

.m-datetime {
  color: #00a7e0 !important;
}

.m-datetime * {
  vertical-align: middle !important;
}

.m-datetime i {
  margin-right: 3px !important;
}

.m-views {
  color: #ff3f1f !important;
}

.m-views * {
  vertical-align: middle !important;
}

.m-views i {
  margin-right: 3px !important;
}

.m-common-black {
  color: #000 !important;
}

.m-common-black * {
  vertical-align: middle !important;
}

.m-common-black * * {
  vertical-align: middle !important;
}

.m-common-black i {
  margin-right: 3px !important;
}

.m-overflow-y-auto {
  overflow-y: auto;
}

.m-scrollbar-hide::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}

@media screen and (max-width: 767px) {
  .m-mobile-hide {
    display: none !important;
  }

  .m-mobile-show {
    display: block !important;
  }
}
</style>