import { defineStore } from "pinia";

const state = () => {
  return {
    // 个人介绍
    introduction: {
      avatar: new URL("/img/avatar.jpg", import.meta.url).href,
      name: "LL",
      github: "https://github.com/Lzy0730",
      bilibili: "https://space.bilibili.com/2192338",
      netease: "https://music.163.com/#/user/home?id=433024891",
      rollText: "个人简介：我是真菜",
    },
  };
};

export const useUserStore = defineStore("user", {
  state,
  actions: {},
});