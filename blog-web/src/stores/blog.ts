import { defineStore } from "pinia";
import type { State, TocItem } from "./types/blog.type";
const state: State = () => {
  return {
    tocList: [],
    tocLevel: []
  };
};

export const useBlogStore = defineStore("blog", {
  state,
  actions: {
    init_tocList(element: Element) {
      // 获取内容区域中的所有标题元素
      const headings = Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      // 解析标题元素并生成目录树
      this.tocLevel = [...new Set(headings.map(item => +item.tagName.toLowerCase().slice(1)))].sort((a, b) => a - b)
      this.tocList = this.parseTitleElements(headings, null);
    },
    parseTitleElements(elements: Element[], parent: TocItem | null) {
      // 创建一个根节点的数组
      const root: TocItem[] = [];
      elements.forEach((element) => {
        const tagName = element.tagName.toLowerCase();
        if (tagName.startsWith('h')) {
          const level = parseInt(tagName.slice(1));
          const index = this.tocLevel.findIndex(lev => lev === level)
          const title = element.textContent;
          element.id = title as string
          const item = {
            element,
            level: level,
            title: title,
            style: {
              marginLeft: `${index * 24}px`,
              lineHeight: '24px',
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            },
            children: []
          };

          if (!parent) {
            root.push(item);
          } else {
            parent.children.push(item);
          }
          if (element.nextElementSibling) {
            this.parseTitleElements(Array.from(element.nextElementSibling.children), item);
          }
        }
      });
      return root
    }
  }
})