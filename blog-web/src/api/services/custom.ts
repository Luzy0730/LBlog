import request from "../request";


export function queryCustomAbout() {
  return request.get<{ about_audio: string, about_content: string }>("/custom/about");
}
