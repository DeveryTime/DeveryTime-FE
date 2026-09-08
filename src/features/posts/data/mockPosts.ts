import type { PostListItemType } from "../types/post";
import type { PostDetailResponse } from "../types/post";
import type { PostComment } from "../types/post";

// API 연결 전까지 게시글 목록 화면에서 사용할 임시 데이터다.
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

// 게시글 상세 모달에서 사용할 임시 상세 데이터다.
export const mockPostDetail: Record<number, PostDetailResponse> = {
  1: {
    id: 1,
    title: "대마고 님들 하이요",
    content: "게시글 상세 내용입니다.",
    status: "PUBLISHED",
    viewCount: 43,

    writer: {
      userId: 1,
      nickname: "엉뚱한 돼지",
      profileImageUrl: null,
    },

    category: {
      id: 1,
      name: "전공",
    },

    images: [],

    createdAt: "2026-08-04T12:30:00",
    updatedAt: null,
  },
};

// 댓글 기능을 확인하기 위한 임시 댓글 데이터다.
export const mockPostComments: PostComment[] = [
  {
    id: 1,
    userId: 5,
    authorName: "홍길동",
    content: "첫 번째 댓글입니다.",
    createdAt: "2026-08-04T22:00:00",
    profileImageUrl:
      "https://i.pinimg.com/236x/e2/d9/73/e2d9737e099300774dc58f45d8ba8433.jpg",
  },
  {
    id: 2,
    userId: 8,
    authorName: "이순신",
    content: "두 번째 댓글입니다.",
    createdAt: "2026-08-04T22:05:00",
    profileImageUrl: null,
  },
];

// 마이페이지 내가 쓴 글 페이지에서 내가 쓴 글을 확인하기 위한 임시 데이터이다.
export const mockMyPosts: PostListItemType[] = mockPosts
  .slice(0, 5)
  .map((post, index) => ({
    ...post,
    id: index + 1,
    number: index + 1,
  }));