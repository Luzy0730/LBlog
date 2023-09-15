import request from "../request";

export function queryArticle() {
  return request.get<{ list: IArticle[]; total: number }>("/article");
}

export function queryArticleDetail(params: { id: number }) {
  return request.get("/article/detail", { params });
}

export function enableArticle(data: Pick<IArticle, "id" | "is_enable">) {
  return request.post("/article/enable", data);
}

export interface IUpdateArticleData {
  id: number;
  title: string;
  description: string;
  content: string;
  categoryId?: number;
  tagIds: string | number[];
  words: number;
  [key: string]: any
}
export function updateArticle(data: IUpdateArticleData) {
  return request.post("/article/update", data);
}
