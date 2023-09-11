import request from "../request";

export function queryArticleTag() {
  return request.get("/article/tag");
}

export function updateArticleTag(data: any) {
  return request.post("/article/tag/update", data);
}

export function removeArticleTag(data: any) {
  return request.post("/article/tag/remove", data);
}

export function addArticleTag(data: any) {
  return request.post("/article/tag/add", data);
}
