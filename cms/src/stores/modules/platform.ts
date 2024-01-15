import { defineStore } from "pinia";
import type { State } from "../types/platform.type";

const state: State = () => {
  const articleInfo = localStorage.getItem("articleInfo")
  return {
    articleInfo: articleInfo ? JSON.parse(articleInfo) : {
      id: -1,
      tagIds: [],
      title: '',
      words: 0,
      categoryId: undefined,
      content: '',
      description: ''
    }
  };
};
export const usePlatformStore = defineStore("platform", {
  state,
  actions: {
    save_article(articleInfo: IArticle) {
      this.articleInfo = articleInfo
      localStorage.setItem("articleInfo", JSON.stringify(articleInfo));
    }
  }
})