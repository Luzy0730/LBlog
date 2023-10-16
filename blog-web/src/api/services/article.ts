import request from "../request";

export interface IQueryArticlesParams {
  pageNum?: number; pageSize?: number; tagId?: number; keyword?: string; tagName?: string; categoryName?: string
}
export function queryArticles(params: IQueryArticlesParams) {
  return request.get<{ list: BlogItem[]; total: number }>("/article", { params });
}

export function queryArticleDetail(params: { id: number }) {
  return request.get<BlogItem>("/article/detail", { params });
}
