import { defineStore } from "pinia";
import { login, validateUser } from '@/api/services/user'
import type { State } from "../types/user.type";

const state: State = () => {
  return {
    token: "",
    userInfo: {
      id: -1,
      name: "",
      avatar: "",
      createTime: "",
      isAdmin: 0,
      isEnable: 0,
      nickname: "",
      username: "",
    },
  };
};
export const useUserStore = defineStore("user", {
  state,
  actions: {
    async user_login(loginInfo: ILogin) {
      const { data } = await login(loginInfo)
      Object.assign(this.userInfo, data.userInfo)
      this.token = data.token;
      localStorage.setItem("token", this.token);
    },
    async user_logout() {
      this.$reset()
      localStorage.removeItem("token");
    },
    async user_validate() {
      const { data: userInfo } = await validateUser()
      Object.assign(this.userInfo, userInfo)
    }
  },
});
