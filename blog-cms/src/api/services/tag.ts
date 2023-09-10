import request from "../request";

export function queryArticleTag() {
  return request.get("/article/tag");
}

export function updateArticleTag(data: any) {
  return request.post("/article/tag/update", data);
}
