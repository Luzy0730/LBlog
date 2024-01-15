import request from "../request";

export interface IQueryArticlesParams {
  page?: number; pageSize?: number; tagId?: number; keyword?: string; tagName?: string; categoryName?: string
}
export function queryArticles(params: IQueryArticlesParams) {
  return request.get<{ data: BlogItem[]; total: number }>("/article/list", { params });
}

export function queryArticleDetail(params: { id: number }) {
  return request.get<BlogItem>("/article/detail", { params });
}
