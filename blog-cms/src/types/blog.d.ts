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
  categoryId: number
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  tags: Array<{
    tagId: number;
    tagName: string;
    tagColor: string
  }>
}