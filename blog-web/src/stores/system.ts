import { defineStore } from "pinia";
import type { State, ClientSize } from "./types/system.type";
import { queryConfigSiteInfo } from '@/api/services/config'

const state: State = () => {
  return {
    // 站点信息
    siteInfo: {
      ico: "",
      blogName: "",
      copyright: {
        title: "",
        siteName: "",
      },
      beian: "",
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
    save_mobileHide(isHide: boolean) {
      this.mobileHide = isHide;
    },
    async update_siteInfo() {
      const { data } = await queryConfigSiteInfo()
      const siteInfo = data ? JSON.parse(data.site_info) : {}
      Object.assign(this.siteInfo, siteInfo)
      // 动态生成ico
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = this.siteInfo.ico;
      document.head.appendChild(link);
    }
  },
});
