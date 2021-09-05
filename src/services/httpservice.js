import axios from "axios";
import logger from "./LogService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  //console.log("error sachin", error.response.data, expectedError);

  if (!expectedError) {
    logger.log(error);
    //console.log("Logging The Error ", error);
    toast.error("An unexcepted error occured");
  }
  toast.error(error.response.data);
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-toke"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
