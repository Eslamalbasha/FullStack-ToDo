import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "//http://localhost:1337/api",
  timeout: 1000,
});
export default axiosInstance;

// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:1337/api",
//   timeout:1000
// });
// export default axiosInstance;
//   حتى اعمل لينك ثابت لكل اللينكات
