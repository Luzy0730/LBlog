import { defineStore } from "pinia";
import type { State, ClientSize } from "./types/system.type";

const state: State = () => {
  return {
    // 站点信息
    siteInfo: {
      blogName: "LL's Blog",
    },
    // 移动端是否隐藏
    mobileHide: true,
    //可视窗口大小
    clientSize: {
      clientHeight: 0,
      clientWidth: 1080,
    },
  };
};

export const useSystemStore = defineStore("system", {
  state,
  actions: {
    save_clientSize(clientSize: ClientSize) {
      this.clientSize = clientSize;
    },
  },
});
