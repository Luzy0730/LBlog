import request from "../request";

export function queryCategories(pagination: IPagination) {
  return request.get<{ list: ICategory[], total: number }>("/category", { params: pagination });
}

export function queryCategoriesSimple() {
  return request.get<Pick<ICategory, "id" | "name" | "color">[]>("/category/simple");
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
