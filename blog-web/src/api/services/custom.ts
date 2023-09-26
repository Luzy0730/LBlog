import request from "../request";


export function queryCustomAbout() {
  return request.get<{ about_audio: string, about_content: string }>("/custom/about");
}

export function queryCustomBanner() {
  return request.get<{ banner: string; }>("/custom/banner");
}

export function queryCustomSiteInfo() {
  return request.get<{ site_info: string; }>("/custom/siteInfo");
}

export function queryConfigIntroduction() {
  return request.get<{ introduction: string; }>("/custom/introduction");
}