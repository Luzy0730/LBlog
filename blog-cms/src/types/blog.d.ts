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
  createTime: string;
  updateTime: string;
  category: Pick<ICategory, "id" | "name" | "color" | "icon">;
  tags: Array<Pick<ITag, "id" | "name" | "color">>;
}

declare interface IUser {
  id: number;
  nickname: string;
  username: string;
  avatar: string;
  isAdmin: number;
  isEnable: number;
  createTime: string;
}

declare interface ILogin {
  username: string;
  password: string;
}