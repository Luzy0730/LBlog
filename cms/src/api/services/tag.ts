import request from "../request";

export function queryTags(pagination: IPagination) {
  return request.get<{ data: ITag[], total: number }>("/tag/list", { params: pagination });
}

export function queryAllTags() {
  return request.get<{ data: ITag[] }>("/tag/all");
}

export function updateTag(data: Pick<ITag, "id" | "name" | "color">) {
  return request.post("/tag/update", data);
}

export function enableTag(data: Pick<ITag, "id" | "state">) {
  return request.post("/tag/state", data);
}

export function deleteTag(data: Pick<ITag, "id">) {
  return request.post("/tag/delete", data);
}

export function createTag(data: Pick<ITag, "name" | "color">) {
  return request.post("/tag/create", data);
}
