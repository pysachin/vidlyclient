import http from "./httpservice";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const proxyUrl = config.apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  try {
    const { data: jwt } = await http.post(proxyUrl, {
      email,
      password,
    });
    localStorage.setItem(tokenKey, jwt);
  } catch (error) {
    throw error;
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  getUser,
};
