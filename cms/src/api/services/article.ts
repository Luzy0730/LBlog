import request from "../request";

export function queryArticle(params: IPagination) {
  return request.frontGet<{ data: IArticle[]; total: number }>("/article/list", { params });
}

export function createArticle(data: IUpdateArticleData) {
  return request.post("/article/create", data);
}

export function queryArticleDetail(params: { id: number }) {
  return request.frontGet<IArticle>("/article/detail", { params });
}

export function enableArticle(data: Pick<IArticle, "id" | "state">) {
  return request.post("/article/state", data);
}

export function deleteArticle(data: { id: number }) {
  return request.post("/article/delete", data);
}

export interface IUpdateArticleData {
  id: number;
  title: string;
  description?: string;
  content?: string;
  categoryId?: number;
  tagIds: number[];
  words: number;
}
export function updateArticle(data: IUpdateArticleData) {
  return request.post("/article/update", data);
}
