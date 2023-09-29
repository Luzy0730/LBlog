import axios, { type AxiosRequestConfig } from "axios";
import { ElNotification } from "element-plus";

const instance = axios.create({
  baseURL: "http://127.0.0.1:4000",
  // baseURL: "http://121.41.91.118:4000",
  timeout: 60000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token") || "";
    config.headers['Authorization'] = `Bearer ${token}`;
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
    if (response.data?.code === 200) {
      return response.data;
    } else {
      ElNotification({
        title: "网络请求",
        type: "error",
        message: response.data?.msg
      });
      return Promise.reject();
    }
  },
  function (error) {
    // 对响应错误做点什么
    ElNotification({
      title: "网络请求",
      type: "error",
      message: "请求出错"
    });
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
