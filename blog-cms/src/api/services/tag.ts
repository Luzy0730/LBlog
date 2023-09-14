import request from "../request";

export function queryTag() {
  return request.get("/tag");
}

export function queryTagsSimple() {
  return request.get<Pick<ITag, "id" | "name">[]>("/tag/simple");
}

export function updateTag(data: Pick<ITag, "id" | "name" | "color">) {
  return request.post("/tag/update", data);
}

export function enableTag(data: Pick<ITag, "id" | "is_enable">) {
  return request.post("/tag/enable", data);
}

export function deleteTag(data: Pick<ITag, "id">) {
  return request.post("/tag/delete", data);
}

export function createTag(data: Pick<ITag, "name" | "color">) {
  return request.post("/tag/create", data);
}
