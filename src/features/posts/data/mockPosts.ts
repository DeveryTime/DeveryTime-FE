import type { PostListItemType } from "../types/post";
import type { PostDetailResponse } from "../types/post";
import type { PostComment } from "../types/post";

export const mockCategories = [
  { id: 1, name: "컴퓨터공학" },
  { id: 2, name: "디자인" },
  { id: 3, name: "경영" },
] as const;

const mockTitles = [
  "피그마 오토 레이아웃 할 줄 아시는 분 있나요?",
  "전공 과제 같이 하실 분 구합니다.",
  "이번 학기 수업 어떤가요?",
];

export const mockPosts: PostListItemType[] = Array.from(
  { length: 10 },
  (_, index) => {
    const category = mockCategories[index % mockCategories.length];

    return {
      id: index + 1,
      number: index + 1,
      categoryId: category.id,
      category: category.name,
      title: mockTitles[index % mockTitles.length],
      createdAt: `2026.05.${String(24 - index).padStart(2, "0")}`,
      likeCount: 18 + ((index * 23) % 87),
      viewCount: 42 + ((index * 41) % 220),
    };
  },
);

// 게시글 상세 모달에서 사용할 임시 상세 데이터를 게시글 목록에서 생성한다.
export const mockPostDetail: Record<number, PostDetailResponse> =
  Object.fromEntries(
    mockPosts.map((post) => [
      post.id,
      {
        id: post.id,
        title: post.title,
        content: `${post.category} 게시판의 임시 게시글 상세 내용입니다.`,
        status: "PUBLISHED",
        viewCount: post.viewCount,
        writer: {
          userId: (post.id % 5) + 1,
          nickname: `전공생${post.id}`,
          profileImageUrl: null,
        },
        category: {
          id: post.categoryId,
          name: post.category,
        },
        images: [],
        createdAt: "2026-08-04T12:30:00",
        updatedAt: null,
      },
    ]),
  );

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
