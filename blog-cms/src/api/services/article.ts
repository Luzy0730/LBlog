import request from "../request";

export function queryArticleTag() {
  return request.get("/article/tag");
}

export function updateArticleTag(data: Pick<IArticleTag, "id" | "name" | "color">) {
  return request.post("/article/tag/update", data);
}

export function enableArticleTag(data: Pick<IArticleTag, "id" | "is_enable">) {
  return request.post("/article/tag/enable", data);
}

export function removeArticleTag(data: Pick<IArticleTag, "id">) {
  return request.post("/article/tag/remove", data);
}

export function addArticleTag(data: Pick<IArticleTag, "id" | "name" | "color">) {
  return request.post("/article/tag/add", data);
}
