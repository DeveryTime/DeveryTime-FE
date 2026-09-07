export interface PostListItemType {
  id: number;
  number: number;
  category: string;
  title: string;
  createdAt: string;
}

// 게시글 정렬 기준으로 사용할 수 있는 값이다.
export type PostSort = "likes" | "latest" | "views";

// 게시글 목록 조회 요청에 필요한 값이다.
export interface PostListParams {
  page: number;
  size: number;
  sort: PostSort;
  categoryId?: number;
}

// API 게시글 목록 응답에 포함되는 게시글 한 개의 형태다.
export interface PostListResponseItem {
  id: number;
  title: string;
  writerNickname: string;
  viewCount: number;
  createdAt: string;
}

// 게시글 목록 조회 API 응답의 형태다.
export interface PostListResponse {
  content: PostListResponseItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// 게시글 작성자 정보의 형태다.
export interface PostWriter {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
}

// 게시글 카테고리 정보의 형태다.
export interface PostCategory {
  id: number;
  name: string;
}

// 게시글에 첨부된 이미지 정보의 형태다.
export interface PostImage {
  id: number;
  imageUrl: string;
  sortOrder: number;
}

// 게시글 상세 조회 API 응답의 형태다.
export interface PostDetailResponse {
  id: number;
  title: string;
  content: string;
  status: string;
  viewCount: number;
  writer: PostWriter;
  category: PostCategory;
  images: PostImage[];
  createdAt: string;
  updatedAt: string | null;
}

// 게시글 좋아요 요청·응답에서 사용하는 데이터다.
export interface PostLikeData {
  postId: number;
  userId: number;
  liked: boolean;
}

// 게시글 좋아요 API 응답의 형태다.
export interface PostLikeResponse {
  success: boolean;
  data: PostLikeData;
  message: string;
}

// 댓글 한 개의 형태다.
export interface PostComment {
  id: number;
  userId: number;
  authorName: string;
  content: string;
  createdAt: string;
  profileImageUrl: string | null;
}

// 댓글 목록 API 응답의 형태다.
export interface PostCommentListResponse {
  success: boolean;
  data: PostComment[];
}
