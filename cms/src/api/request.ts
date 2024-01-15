import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
import { useUserStore } from '@/stores/index'
import { ElNotification } from "element-plus";

const instance = axios.create({
  baseURL: "http://127.0.0.1:10200/cms/v1",
  // baseURL: "http://api.blog-cms.guaiguaizhanhao.cn",
  timeout: 60000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig<any> & { type?: 'upload' }) {
    const token = localStorage.getItem("token") || "";
    config.headers['Authorization'] = `Bearer ${token}`;
    if (config.method === 'post') {
      config.headers["Content-Type"] = "application/json"
      if (config.type === 'upload') {
        config.headers["Content-Type"] = "multipart/form-data"
      }
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
    // 下载
    if (response.headers["content-type"] === "application/octet-stream") {
      return response.data;
    }
    switch (response.data?.code) {
      case 200:
        return response.data;
      case 401:
        const userStore = useUserStore()
        userStore.user_logout()
      default:
        ElNotification({
          title: "网络请求",
          type: "error",
          message: response.data?.message || "请求出错"
        });
        return Promise.reject();
    }
  },
  function (error) {
    const { message } = error.response?.data
    switch (error.response?.status) {
      case 401:
        const userStore = useUserStore()
        userStore.user_logout()
      default:
        // 对响应错误做点什么
        ElNotification({
          title: "网络请求",
          type: "error",
          message: message || "请求出错"
        });
        return Promise.reject(error);
    }
  }
);

// 包装的响应数据类型
type ResponseData<T> = { code: number, message: string, data: T }

const request = {
  frontGet<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return instance.get(url, { ...config, baseURL: 'http://localhost:10200/api/v1' }) as Promise<ResponseData<T>>
  },
  get<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return instance.get(url, config) as Promise<ResponseData<T>>
  },
  download(url: string, config: { responseType: 'blob' } & AxiosRequestConfig): Promise<Blob> {
    return instance.get(url, config) as Promise<Blob>
  },
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return instance.post(url, data, config) as Promise<ResponseData<T>>
  },
  upload<T>(url: string, data: any, config: { type: 'upload' } & AxiosRequestConfig): Promise<ResponseData<T>> {
    return instance.post(url, data, config) as Promise<ResponseData<T>>
  },
}

export default request;
