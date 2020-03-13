import axios from "axios";
import logger from "./logService";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  console.log("expected error is", error);

  if (!expectedError) {
    logger.log(error);
    alert(
      "An unexpected error occurred, and was caught by the interceptor.",
      error
    );
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
