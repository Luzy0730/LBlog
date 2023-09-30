import request from "../request";

export function queryUsers(pagination: IPagination) {
  return request.get<{ list: IUser[], total: number }>("/user", { params: pagination });
}

export interface ILoginResult {
  userInfo: IUser,
  token: string
}

export function login(loginInfo: ILogin) {
  return request.post<ILoginResult>("/user/login", loginInfo);
}

export function validateUser() {
  return request.post<IUser>("/user/validate");
}

export type UpdateUserParmas = Pick<IUser, 'id' | 'nickname' | 'avatar'>
export function updateUser(user: UpdateUserParmas) {
  return request.post('/user/update', user)
}

export interface UpdatePasswordParmas {
  id: number
  password: string
  newPassword: string
}
export function updatePassword(user: UpdatePasswordParmas) {
  return request.post('/user/update/pwd', user)
}

export function enableUser(data: { id: number, isEnable: number }) {
  return request.post('/user/enable', data)
}

export function deleteUser(data: { id: number }) {
  return request.post('/user/delete', data)
}