import request from "../request";

export function queryArticle() {
  return request.get<{ list: BlogItem[]; total: number }>("/article");
}

export function queryArticleDetail(params: { id: number }) {
  return request.get<BlogItem>("/article/detail", { params });
}
