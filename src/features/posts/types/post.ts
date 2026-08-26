export interface PostListItemType {
  id: number;
  number: number;
  category: string;
  title: string;
  createdAt: string;
}

export type PostSort = "likes" | "latest" | "views"; //문자 리터럴 유니온 타입(String Literal Union Type)

//게시글 목록 조회 요청값
export interface PostListParams {
  page: number;
  size: number;
  sort: PostSort;
  categoryId?: number;
}

//목록에 포함되는 게시글 한 개

export interface PostListResponseItem {
  id: number;
  title: string;
  writerNickname: string;
  viewCount: number;
  createdAt: string;
}

// 게시글 목록 조회 응답

export interface PostListResponse {
  content: PostListResponseItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

//게시글 작성자
export interface PostWriter {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
}

//게시글 카테고리
export interface PostCategory {
  id: number;
  name: string;
}

//게시글 이미지
export interface PostImage {
  id: number;
  imageUrl: string;
  sortOrder: number;
}

//게시글 단건 조회 응답
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

export interface PostLikeData {
  postId: number;
  userId: number;
  liked: boolean;
}

export interface PostLikeResponse {
  success: boolean;
  data: PostLikeData;
  message: string;
}

export interface PostComment {
  id: number;
  userId: number;
  authorName: string;
  content: string;
  createdAt: string;
  profileImageUrl: string | null;
}

export interface PostCommentListResponse {
  success: boolean;
  data: PostComment[];
}
