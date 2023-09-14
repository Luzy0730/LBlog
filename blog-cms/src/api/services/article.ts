import request from "../request";

export function queryArticle() {
  return request.get<{ list: IArticle[], total: number }>("/article");
}

export function queryArticleDetail(params) {
  return request.get("/article/detail", { params });
}

export function enableArticle(data: Pick<IArticle, "id" | "is_enable">) {
  return request.post("/article/enable", data);
}
