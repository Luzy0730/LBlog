import axios, { type AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  // baseURL: "http://121.41.91.118:3000",
  timeout: 60000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么，比如添加请求头等操作
    if (config.method === 'post') {
      config.headers["Content-Type"] = "application/json"
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 包装的响应数据类型
type ResponseData<T> = { code: number, msg: string, data: T }

const request = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return instance.get(url, config) as Promise<ResponseData<T>>
  },
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return instance.post(url, data, config) as Promise<ResponseData<T>>
  },
}

export default request;
