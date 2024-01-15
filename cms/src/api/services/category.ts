import request from "../request";

export function queryCategories(pagination: IPagination) {
  return request.get<{ data: ICategory[], total: number }>("/category/list", { params: pagination });
}

export function queryAllCategory() {
  return request.get<{ data: ICategory[] }>("/category/all");
}

export function updateCategory(
  data: Pick<ICategory, "id" | "name" | "color" | "icon">
) {
  return request.post("/category/update", data);
}

export function enableCategory(data: Pick<ICategory, "id" | "state">) {
  return request.post("/category/state", data);
}

export function deleteCategory(data: Pick<ICategory, "id">) {
  return request.post("/category/delete", data);
}

export function createCategory(
  data: Pick<ICategory, "name" | "color" | "icon">
) {
  return request.post("/category/create", data);
}
