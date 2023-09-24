import request from "../request";

export function queryConfigAbout() {
  return request.get<{ about_audio: string; about_content: string }>("/config/about");
}

export function updateConfigAbout(data: { aboutAudio: string; aboutContent: string }) {
  return request.post("/config/about/update", data);
}

export function queryConfigBanner() {
  return request.get<{ banner: string; }>("/config/banner");
}

export function updateConfigBanner(data: { banner: string }) {
  return request.post("/config/banner/update", data);
}

export function queryConfigSitInfo() {
  return request.get<{ site_info: string; }>("/config/siteInfo");
}

export function updateConfigSitInfo(data: { siteInfo: string }) {
  return request.post("/config/siteInfo/update", data);
}
