import request from "../request";

export function queryArticle(params: { pageNum: number, pageSize: number }) {
  return request.get<{ list: IArticle[]; total: number }>("/article", { params });
}

export function createArticle(data: IUpdateArticleData) {
  return request.post("/article/create", data);
}

export function queryArticleDetail(params: { id: number }) {
  return request.get("/article/detail", { params });
}

export function enableArticle(data: Pick<IArticle, "id" | "is_enable">) {
  return request.post("/article/enable", data);
}

export function deleteArticle(data: { id: number }) {
  return request.post("/article/delete", data);
}

export interface IUpdateArticleData {
  id: number;
  title: string;
  description: string;
  content: string;
  categoryId?: number;
  tagIds: string | number[];
  words: number;
}
export function updateArticle(data: IUpdateArticleData) {
  return request.post("/article/update", data);
}
