declare interface ITag {
  id: number;
  name: string;
  color: string;
  is_enable: number;
}
declare interface ICategory {
  id: number;
  name: string;
  color: string;
  icon: string;
  is_enable: number;
}

declare interface BlogItem {
  id: number;
  title: string;
  description?: string;
  content?: string
  words: number;
  views: number;
  is_enable?: number;
  createTime: string;
  updateTime: string;
  category: Pick<ICategory, "id" | "name" | "color" | "icon">;
  tags: Array<Pick<ITag, "id" | "name" | "color">>;
}

declare interface IPagination {
  pageSize: number
  pageNum: number
  total: number
}