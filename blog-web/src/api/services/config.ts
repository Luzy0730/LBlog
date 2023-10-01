import request from "../request";


export function queryConfigAbout() {
  return request.get<{ about_audio: string, about_content: string }>("/config/about");
}

export function queryConfigBanner() {
  return request.get<{ banner: string; }>("/config/banner");
}

export function queryConfigSiteInfo() {
  return request.get<{ site_info: string; }>("/config/siteInfo");
}

export function queryConfigIntroduction() {
  return request.get<{ introduction: string; }>("/config/introduction");
}