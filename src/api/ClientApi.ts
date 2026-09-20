import axios from "axios";

const ACCESS_TOKEN_KEY = "accessToken";

// 게시글 API에서 공통으로 사용하는 Axios 클라이언트다.
export const ClientApi = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 로그인 성공 후 액세스 토큰을 저장한다.
export function setAccessToken(accessToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// 로그아웃 시 저장된 액세스 토큰을 제거한다.
export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// 저장된 액세스 토큰을 모든 API 요청의 인증 헤더에 넣는다.
ClientApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
