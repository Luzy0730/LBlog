import { defineStore } from "pinia";
import { queryConfigIntroduction } from '@/api/services/config'

const state = () => {
  return {
    // 个人介绍
    introduction: {
      avatar: "",
      name: "",
      github: "",
      bilibili: "",
      netease: "",
      rollText: "",
    },
  };
};

export const useUserStore = defineStore("user", {
  state,
  actions: {
    async update_introduction() {
      const { data } = await queryConfigIntroduction()
      const introduction = data ? JSON.parse(data.introduction) : {}
      Object.assign(this.introduction, introduction)
    }
  },
});
