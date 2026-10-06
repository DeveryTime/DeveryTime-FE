import client from "./client";
import type {
  PostCommentListResponse,
  PostDetailData,
  PostDetailResponse,
  PostLikeData,
  PostLikeResponse,
  PostListParams,
  PostListResponse,
  CreateCommentData,
  CreateCommentRequest,
  CreateCommentResponse,
  DeleteCommentResponse,
  UploadPostImageData,
  UploadPostImageRequest,
  UpdateCommentData,
  UpdateCommentRequest,
  UpdateCommentResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from "../types/posts.types";

// 전체 게시글 목록을 조회한다.
const getPosts = async (
  params: PostListParams,
): Promise<PostListResponse> => {
  const response = await client.get<PostListResponse>("/posts", {
    params,
  });

  return response.data;
};

// 현재 로그인한 사용자가 작성한 게시글 목록을 조회한다.
const getMyPosts = async (params: {
  page: number;
  size: number;
}): Promise<PostListResponse> => {
  const response = await client.get<PostListResponse>("/users/me/posts", {
    params,
  });

  return response.data;
};

// 게시글 상세 정보를 조회한다.
const getPost = async (postId: number): Promise<PostDetailData> => {
  const response = await client.get<PostDetailResponse>(`/posts/${postId}`);

  return response.data.data;
};

// 게시글을 삭제한다.
const deletePost = async (postId: number, userId: number): Promise<void> => {
  await client.delete(`/posts/${postId}`, {
    params: { userId },
  });
};

// 게시글에 좋아요를 등록한다.
const likePost = async (postId: number): Promise<PostLikeData> => {
  const response = await client.post<PostLikeResponse>(
    `/posts/${postId}/likes`,
  );

  return response.data.data;
};

// 게시글의 좋아요를 취소한다.
const unlikePost = async (postId: number): Promise<PostLikeData> => {
  const response = await client.delete<PostLikeResponse>(
    `/posts/${postId}/likes`,
  );

  return response.data.data;
};

// 게시글의 댓글 목록을 조회한다.
const getComments = async (
  postId: number,
): Promise<PostCommentListResponse> => {
  const response = await client.get<PostCommentListResponse>(
    `/posts/${postId}/comments`,
  );

  return response.data;
};

// 댓글을 작성한다.
const createComment = async (
  postId: number,
  request: CreateCommentRequest,
): Promise<CreateCommentData> => {
  const response = await client.post<CreateCommentResponse>(
    `/posts/${postId}/comments`,
    request,
  );

  return response.data.data;
};

// 댓글을 삭제한다.
const deleteComment = async (
  postId: number,
  commentId: number,
): Promise<DeleteCommentResponse> => {
  const response = await client.delete<DeleteCommentResponse>(
    `/posts/${postId}/comments/${commentId}`,
  );

  return response.data;
};

// 게시글 이미지를 업로드한다.
const uploadPostImage = async (
  postId: number,
  request: UploadPostImageRequest,
): Promise<UploadPostImageData> => {
  const formData = new FormData();

  formData.append("file", request.file);
  formData.append("sortOrder", String(request.sortOrder ?? 0));

  const response = await client.post<UploadPostImageData>(
    `/posts/${postId}/images`,
    formData,
  );

  return response.data;
};

// 댓글 본문을 수정한다.
const updateComment = async (
  postId: number,
  commentId: number,
  request: UpdateCommentRequest,
): Promise<UpdateCommentData> => {
  const response = await client.patch<UpdateCommentResponse>(
    `/posts/${postId}/comments/${commentId}`,
    request,
  );

  return response.data.data;
};

// 게시글 제목과 본문을 수정한다.
const updatePost = async (
  postId: number,
  updateData: UpdatePostRequest,
): Promise<UpdatePostResponse> => {
  const response = await client.put<UpdatePostResponse>(
    `/posts/${postId}`,
    updateData,
  );

  return response.data;
};

const postsApi = {
  getPosts,
  getMyPosts,
  getPost,
  deletePost,
  likePost,
  unlikePost,
  getComments,
  createComment,
  deleteComment,
  uploadPostImage,
  updateComment,
  updatePost,
};

export default postsApi;
