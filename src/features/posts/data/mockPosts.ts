import type { PostListItemType } from "../types/post";

//API 연결 전까지 이 데이터를 임시로 사용함
export const mockPosts: PostListItemType[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: index + 1,
    number: index + 1,
    category: "전공",
    title: "피그마 오토 레이아웃 할 줄 아시는 분 있나요?",
    createdAt: "2026.05.24",
  }),
);
