import { ClientApi } from "./ClientApi";
import type {
  PostComment,
  PostCommentListResponse,
  PostDetailResponse,
  PostLikeData,
  PostLikeResponse,
  PostListParams,
  PostListResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from "../features/posts/types/post";

// 전체 게시글 목록을 조회한다.
export async function getPosts(
  params: PostListParams,
): Promise<PostListResponse> {
  const response = await ClientApi.get<PostListResponse>("/posts", {
    params,
  });

  return response.data;
}

// 현재 로그인한 사용자가 작성한 게시글 목록을 조회한다.
export async function getMyPosts(params: {
  page: number;
  size: number;
}): Promise<PostListResponse> {
  const response = await ClientApi.get<PostListResponse>("/users/me/posts", {
    params,
  });

  return response.data;
}

// 게시글 상세 정보를 조회한다.
export async function getPost(postId: number): Promise<PostDetailResponse> {
  const response = await ClientApi.get<PostDetailResponse>(`/posts/${postId}`);

  return response.data;
}

// 게시글을 삭제한다.
export async function deletePost(postId: number): Promise<void> {
  await ClientApi.delete(`/posts/${postId}`);
}

// 게시글에 좋아요를 등록한다.
export async function likePost(postId: number): Promise<PostLikeData> {
  const response = await ClientApi.post<PostLikeResponse>(
    `/posts/${postId}/likes`,
  );

  return response.data.data;
}

// 게시글의 좋아요를 취소한다.
export async function unlikePost(postId: number): Promise<PostLikeData> {
  const response = await ClientApi.delete<PostLikeResponse>(
    `/posts/${postId}/likes`,
  );

  return response.data.data;
}

// 게시글의 댓글 목록을 조회한다.
export async function getComments(
  postId: number,
): Promise<PostCommentListResponse> {
  const response = await ClientApi.get<PostCommentListResponse>(
    `/posts/${postId}/comments`,
  );

  return response.data;
}

// 댓글을 작성한다.
export async function createComment(
  postId: number,
  content: string,
): Promise<PostComment> {
  const response = await ClientApi.post<PostComment>(
    `/posts/${postId}/comments`,
    { content },
  );

  return response.data;
}

// 댓글을 삭제한다.
export async function deleteComment(
  postId: number,
  commentId: number,
): Promise<void> {
  await ClientApi.delete(`/posts/${postId}/comments/${commentId}`);
}

// 댓글 본문을 수정한다.
export async function patchComment(
  postId: number,
  commentId: number,
  content: string,
): Promise<void> {
  await ClientApi.patch(`/posts/${postId}/comments/${commentId}`, { content });
}

// 게시글 제목과 본문을 수정한다.
export async function updatePost(
  postId: number,
  updateData: UpdatePostRequest,
): Promise<UpdatePostResponse> {
  const response = await ClientApi.put<UpdatePostResponse>(
    `/posts/${postId}`,
    updateData,
  );

  return response.data;
}
