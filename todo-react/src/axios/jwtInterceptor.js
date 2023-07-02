import axios from "axios";
import { removeUserProfile } from "../utils/localStorage.util.js";
 
const jwtInterceptor = axios.create({
  baseURL: 'http://localhost:8080'
});

jwtInterceptor.interceptors.request.use(
  async config => {
    // config.headers = {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
    return config;
  },
  error => {
    return Promise.reject(error)
  });

jwtInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      
      // await axios
      //   .get("http://localhost:4000/refresh-token", {
      //     withCredentials: true,
      //   })
      //   .catch((err) => {
      //     return Promise.reject(err);
      //   });
      // console.log(error.config);
      // return axios(error.config);

      console.warn('Not authenticated');

      removeUserProfile()

      window.location.href = '/login';

    } else {
      return Promise.reject(error);
    }
  }
);
 
export { jwtInterceptor };