import { createBrowserRouter } from "react-router-dom";
import MyPostsPage from "../features/posts/pages/MyPostsPage";

// 현재는 App에서 직접 페이지를 렌더링하며, 추후 라우팅을 확장할 때 사용할 설정이다.
export const router = createBrowserRouter([
  {
    path: "/mypage/posts",
    element: <MyPostsPage />,
  },
]);
