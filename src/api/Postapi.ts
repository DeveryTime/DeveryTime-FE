import clientApi from "./Clientapi";

/**
 * 게시글 상태
 */
export type PostStatus = "PUBLISHED";

/**
 * 게시글 작성 요청
 */
export interface CreatePostRequest {
  categoryId: number;
  title: string;
  content: string;
  status: PostStatus;
}

/**
 * 게시글 작성 성공 Response
 */
export interface CreatePostResponse {
  id: number;
  title: string;
  status: PostStatus;
  createdAt: string;
}

/**
 * 게시글 작성 에러 코드
 */
export type CreatePostErrorCode =
  "VALIDATION_ERROR" | "USER_NOT_FOUND" | "CATEGORY_NOT_FOUND";

/**
 * Validation Error 상세 정보
 */
export interface PostValidationErrorDetail {
  field: string;
  message: string;
}

/**
 * 게시글 작성 에러 Response
 */
export interface CreatePostErrorResponse {
  success: boolean;
  status: number;
  error: {
    code: CreatePostErrorCode;
    message: string;
    details?: PostValidationErrorDetail[];
  };
}

/**
 * 게시글 작성 API
 */
export const createPostApi = async (
  data: CreatePostRequest,
): Promise<CreatePostResponse> => {
  const response = await clientApi.post<CreatePostResponse>("/api/posts", data);

  return response.data;
};
