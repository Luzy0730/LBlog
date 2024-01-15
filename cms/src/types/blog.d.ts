declare interface ITag {
  id: number;
  name: string;
  color: string;
  state: number;
}
declare interface ICategory {
  id: number;
  name: string;
  color: string;
  icon: string;
  state: number;
}

declare interface IArticle {
  id: number;
  title: string;
  description?: string;
  content?: string;
  words: number;
  views: number;
  state?: number;
  createTime?: string;
  updateTime?: string;
  category?: Pick<ICategory, "id" | "name" | "color" | "icon">;
  tags: Array<Pick<ITag, "id" | "name" | "color">>;
}

declare interface IPagination {
  page: number;
  pageSize: number;
  total?: number;
}

declare interface IUser {
  id: number;
  nickname: string;
  username: string;
  password?: string;
  avatar: string;
  state: number;
  create_time: string;
  update_time: string;
}

declare interface ILogin {
  username: string;
  password: string;
}