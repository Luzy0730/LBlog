import request from "../request";

export function queryConfigAbout() {
  return request.get<{about_audio:string;about_content:string}>("/config/about");
}