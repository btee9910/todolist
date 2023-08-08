import axios from "axios";



const axiosConfig = axios.create({
  // .. configure axios baseURL
  baseURL: "http://localhost:3000/"
});


export default axiosConfig;