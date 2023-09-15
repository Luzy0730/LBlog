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

declare interface IArticle {
  id: number;
  title: string;
  description: string;
  words: number;
  views: number;
  is_enable: number;
  category: Pick<ICategory, "id" | "name" | "color" | "icon">;
  tags: Array<Pick<ITag, "id" | "name" | "color">>;
}
