import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: "",
      userInfo: {
        id: 1,
        name: "lzy",
        avatar: "/image/avatar.jpg",
      },
    };
  },
  actions: {
    async user_login() {
      const token = "test";
      this.token = token;
    },
  },
});
