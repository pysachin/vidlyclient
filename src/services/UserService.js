import http from "./httpservice";
import config from "../config.json";
import axios from "axios";

const proxyUrl = config.apiUrl + "/users";

export function register(user) {
  try {
    return http.post(proxyUrl, {
      email: user.email,
      password: user.password,
      name: user.username,
      isAdmin: "false",
    });
  } catch (error) {
    console.log("throw error on called post", error);
    throw error;
  }
}

// async function updatePost(user) {
//   try {
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: user.email,
//         password: user.password,
//         name: user.username,
//         isAdmin: "false",
//       }),
//     };
//     const response = await fetch(proxyUrl, requestOptions);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }
