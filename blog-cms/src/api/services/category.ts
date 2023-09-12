import request from "../request";

export function queryCategory() {
  return request.get("/category");
}

export function updateCategory(
  data: Pick<ICategory, "id" | "name" | "color" | "icon">
) {
  return request.post("/category/update", data);
}

export function enableCategory(data: Pick<ICategory, "id" | "is_enable">) {
  return request.post("/category/enable", data);
}

export function deleteCategory(data: Pick<ICategory, "id">) {
  return request.post("/category/delete", data);
}

export function createCategory(
  data: Pick<ICategory, "name" | "color" | "icon">
) {
  return request.post("/category/create", data);
}
