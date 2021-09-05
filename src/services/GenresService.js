import http from "./httpservice";
import config from "../config.json";

export function getGenres() {
  const proxyUrl = config.apiUrl + "/generes";
  return http.get(proxyUrl);
}
