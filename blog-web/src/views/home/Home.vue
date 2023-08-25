<script setup lang="ts">
import BlogList from "@/components/content/blog/BlogList.vue";

const blogList = ref<Array<BlogItem>>([
  {
    id: 1,
    title: "Vue2中的渲染函数",
    category: {
      id: 1,
      name: "技术分享",
      color: "orange",
      icon: "folder open",
    },
    tags: [
      {
        id: 1,
        name: "Vue",
        color: "green",
      },
    ],
    createTime: "2021-12-31T09:28:36.000+0000",
    updateTime: "2022-12-31T15:59:10.000+0000",
    top: false,
    views: 134,
    words: 2122,
    description:
      "<p>在介绍渲染函数的使用前，我们需要先了解一些官网提供的基础概念...</p><img src='https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/image/cover1.jpg'/>",
  },
  {
    id: 2,
    title: "Vue2中的渲染函数",
    category: {
      id: 1,
      name: "技术分享",
      color: "orange",
      icon: "folder open",
    },
    tags: [
      {
        id: 1,
        name: "Vue",
        color: "green",
      },
    ],
    createTime: "2021-12-31T09:28:36.000+0000",
    updateTime: "2022-12-31T15:59:10.000+0000",
    top: false,
    views: 134,
    words: 2122,
    description:
      "<p>在介绍渲染函数的使用前，我们需要先了解一些官网提供的基础概念...</p><img src='https://lblog-aliyun.oss-cn-beijing.aliyuncs.com/image/cover1.jpg'/>",
  },
]);
</script>
<template>
  <BlogList :blog-list="blogList" />
</template>
