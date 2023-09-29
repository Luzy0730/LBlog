import request from "../request";

export function queryUsers() {
  return request.get<{ list: IUser[], total: number }>("/user");
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