export interface PostTableItem {
  id: number;
  number: number;
  category: string;
  title: string;
  createdAt: string;
}

export interface PostListItemType extends PostTableItem {
  categoryId: number;
  viewCount: number;
  likeCount: number;
}

export type PostSort = "likes" | "latest" | "views";

export interface PostListParams {
  page: number;
  size: number;
  sort: PostSort;
  categoryId?: number;
}

export interface PostListResponseItem {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

export interface PostListResponse {
  content: PostListResponseItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface UpdatePostRequest {
  userId: number;
  title: string;
  content: string;
}

export interface UpdatePostResponse {
  id: number;
  title: string;
  updatedAt: string;
}

export interface PostWriter {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
}

export interface PostCategory {
  id: number;
  name: string;
}

export interface PostImage {
  id: number;
  imageUrl: string;
  sortOrder: number;
}

export interface PostDetailResponse {
  id: number;
  title: string;
  content: string;
  status: string;
  viewCount: number;
  likeCount: number;
  liked: boolean;
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
