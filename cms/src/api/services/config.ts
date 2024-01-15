import request from "../request";

export function queryConfigAbout() {
  return request.frontGet<{ about_audio: string; about_content: string }>("/config/about/get");
}

export function updateConfigAbout(data: { aboutAudio: string; aboutContent: string }) {
  return request.post("/config/about/update", data);
}

export function queryConfigBanner() {
  return request.frontGet<{ banner: string; }>("/config/banner/get");
}

export function updateConfigBanner(data: { banner: string }) {
  return request.post("/config/banner/update", data);
}

export function queryConfigSitInfo() {
  return request.frontGet<{ siteInfo: string; }>("/config/site/get");
}

export function updateConfigSitInfo(data: { siteInfo: string }) {
  return request.post("/config/site/update", data);
}

export function queryConfigIntroduction() {
  return request.frontGet<{ introduction: string; }>("/config/introduction/get");
}

export function updateConfigIntroduction(data: { introduction: string }) {
  return request.post("/config/introduction/update", data);
}
