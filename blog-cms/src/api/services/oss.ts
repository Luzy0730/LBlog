import request from "../request";

export interface QueryConfiOSSParmas {
  prefix: string
  delimiter: string
  maxKeys: number
}
export function queryConfiOSS() {
  return request.get<{ oss: string }>("/oss");
}

export function updateConfiOSS(data: { oss: string }) {
  return request.post("/oss/update", data);
}

export interface OSSObject {
  dir: boolean;
  name: string;
  size?: number;
  url?: string;
  timeModified?: number;
}
export function queryOSSList(params: QueryConfiOSSParmas) {
  return request.get<OSSObject[]>("/oss/list", { params });
}

export function downloadOSSFile(params: { name: string }) {
  return request.download("/oss/file/download", { params, responseType: 'blob' });
}

export function uploadOSS(data: { name: string, file: File }) {
  return request.upload("/oss/upload", data, { type: 'upload' });
}

export function deleteOSS(data: { name?: string, prefix?: string }) {
  return request.post("/oss/delete", data);
}