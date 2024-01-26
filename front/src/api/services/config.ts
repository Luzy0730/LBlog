import request from "../request";


export function queryConfigAbout() {
  return request.get<{ about_audio: string, about_content: string }>("/config/about/get");
}

export function queryConfigBanner() {
  return request.get<{ banner: string; }>("/config/banner/get");
}

export function queryConfigSiteInfo() {
  return request.get<{ siteInfo: string; }>("/config/site/get");
}

export function queryConfigIntroduction() {
  return request.get<{ introduction: string; }>("/config/introduction/get");
}