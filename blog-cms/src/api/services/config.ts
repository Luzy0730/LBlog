import request from "../request";

export function queryConfigAbout() {
  return request.get<{ about_audio: string; about_content: string }>("/config/about");
}

export function updateConfigAbout(data: { aboutAudio: string; aboutContent: string }) {
  return request.post("/config/about/update", data);
}