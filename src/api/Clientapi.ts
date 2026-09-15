import axios from "axios";

const clientApi = axios.create({
  baseURL: "백엔드_BASE_URL",
  timeout: 10000,
});

export default clientApi;
