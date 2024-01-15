import request from "../request";

export function queryUsers(pagination: IPagination) {
  return request.get<{ data: IUser[], total: number }>("/user/list", { params: pagination });
}

export interface ILoginResult {
  userInfo: IUser,
  token: string
}

export function login(loginInfo: ILogin) {
  return request.post<ILoginResult>("/user/login", loginInfo);
}

export function validateUser() {
  return request.get<IUser>("/user/validate");
}

export type UpdateUserParmas = Pick<IUser, 'id' | 'nickname' | 'avatar' | 'username' | 'password'>
export function updateUser(user: UpdateUserParmas) {
  return request.post('/user/update', user)
}

export function createUser(user: UpdateUserParmas) {
  return request.post('/user/register', user)
}

export interface UpdatePasswordParmas {
  id: number
  password: string
  newPassword: string
}
export function updatePassword(user: UpdatePasswordParmas) {
  return request.post('/user/pwd', user)
}

export function enableUser(data: { id: number, state: number }) {
  return request.post('/user/state', data)
}

export function deleteUser(data: { id: number }) {
  return request.post('/user/delete', data)
}