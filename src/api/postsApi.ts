
import { ClientApi } from "./ClientApi";
import {
  type PostDetailResponse,
  type PostLikeData,
} from "../features/posts/types/post";
import type {
  PostListParams,
  PostListResponse,
  PostCommentListResponse,
  PostComment,
  PostLikeResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from "../features/posts/types/post";

export async function getPosts(
  params: PostListParams,
): Promise<PostListResponse> {
  const response = await ClientApi.get<PostListResponse>("/posts", {
    params,
  });

  return response.data;
}

export async function getPost(postId: number): Promise<PostDetailResponse> {
  const response = await ClientApi.get<PostDetailResponse>(`/posts/${postId}`);

  return response.data;
}

export async function deletePost(postId: number): Promise<void> {
  await ClientApi.delete(`/posts/${postId}`);
}

export async function likePost(postId: number): Promise<PostLikeData> {
  const response = await ClientApi.post<PostLikeResponse>(
    `/posts/${postId}/likes`,
  );

  return response.data.data;
}

export async function unlikePost(postId: number): Promise<PostLikeData> {
  const response = await ClientApi.delete<PostLikeResponse>(
    `/posts/${postId}/likes`,
  );

  return response.data.data;
}

export async function getComments(
  postId: number,
): Promise<PostCommentListResponse> {
  const response = await ClientApi.get<PostCommentListResponse>(
    `/posts/${postId}/comments`,
  );

  return response.data;
}

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

export async function deleteComment(
  postId: number,
  commentId: number,
): Promise<void> {
  await ClientApi.delete(`/posts/${postId}/comments/${commentId}`);
}

export async function patchComment(
  postId: number,
  commentId: number,
  content: string,
): Promise<void> {
  await ClientApi.patch(`/posts/${postId}/comments/${commentId}`, { content });
}

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
