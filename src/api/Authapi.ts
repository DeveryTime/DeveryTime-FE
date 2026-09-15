import client from "./Clientapi";

//공통

export interface ValidationErrorDetail {
  field: string;
  message: string;
}

//로그인

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  success: boolean;
  data: LoginData;
  message: string;
}

export type LoginErrorCode =
  "INVALID_CREDENTIALS" | "VALIDATION_ERROR" | "INTERNAL_SERVER_ERROR";

export interface LoginErrorResponse {
  success: boolean;
  status: number;
  error: {
    code: LoginErrorCode;
    message: string;
    details?: ValidationErrorDetail[];
  };
}

//아이디 중복 확인 GET /api/auth/check-username

export interface CheckUsernameResponse {
  success: boolean;
  data: null;
  message: string;
}

export type CheckUsernameErrorCode =
  "USERNAME_ALREADY_EXISTS" | "VALIDATION_ERROR" | "INTERNAL_SERVER_ERROR";

export interface CheckUsernameErrorResponse {
  success: boolean;
  status: number;
  error: {
    code: CheckUsernameErrorCode;
    message: string;
    details?: ValidationErrorDetail[];
  };
}

//이메일 인증번호 발송 POST /api/auth/email-verifications

export interface SendEmailVerificationRequest {
  email: string;
}

export interface SendEmailVerificationResponse {
  success: boolean;
  data: null;
  message: string;
}

export type SendEmailVerificationErrorCode =
  | "EMAIL_ALREADY_EXISTS"
  | "TOO_MANY_REQUESTS"
  | "SERVICE_UNAVAILABLE"
  | "VALIDATION_ERROR";

export interface SendEmailVerificationErrorResponse {
  success: boolean;
  status: number;
  error: {
    code: SendEmailVerificationErrorCode;
    message: string;
    details?: ValidationErrorDetail[];
  };
}

//이메일 인증번호 확인 /POST /api/auth/email-verifications/verify

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  data: null;
  message: string;
}

export type VerifyEmailErrorCode =
  | "INTERNAL_SERVER_ERROR"
  | "EMAIL_ALREADY_VERIFIED"
  | "VERIFICATION_CODE_EXPIRED"
  | "INVALID_VERIFICATION_CODE"
  | "VERIFICATION_ATTEMPT_EXCEEDED";

export interface VerifyEmailErrorResponse {
  success: boolean;
  status: number;
  error: {
    code: VerifyEmailErrorCode;
    message: string;
  };
}

//회원가입 POST /api/auth/signup

export interface SignupRequest {
  schoolNumber: string;
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface SignupResponse {
  success: boolean;
  data: null;
  message: string;
}

export type SignupErrorCode =
  | "EMAIL_NOT_VERIFIED"
  | "EMAIL_ALREADY_EXISTS"
  | "USERNAME_ALREADY_EXISTS"
  | "VALIDATION_ERROR"
  | "INTERNAL_SERVER_ERROR"
  | "PASSWORD_MISMATCH"
  | "SCHOOL_NUMBER_ALREADY_EXISTS";

export interface SignupErrorResponse {
  success: boolean;
  status: number;
  error: {
    code: SignupErrorCode;
    message: string;
    details?: ValidationErrorDetail[];
  };
}

//API 함수

//로그인
export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await client.post<LoginResponse>("/api/auth/login", data);

  return response.data;
};

//아이디 중복 확인  GET /api/auth/check-username?username=아이디

export const checkUsernameApi = async (
  username: string,
): Promise<CheckUsernameResponse> => {
  const response = await client.get<CheckUsernameResponse>(
    "/api/auth/check-username",
    {
      params: {
        username,
      },
    },
  );

  return response.data;
};

//이메일 인증번호 발송

export const sendEmailVerificationApi = async (
  data: SendEmailVerificationRequest,
): Promise<SendEmailVerificationResponse> => {
  const response = await client.post<SendEmailVerificationResponse>(
    "/api/auth/email-verifications",
    data,
  );

  return response.data;
};

//이메일 인증번호 확인

export const verifyEmailApi = async (
  data: VerifyEmailRequest,
): Promise<VerifyEmailResponse> => {
  const response = await client.post<VerifyEmailResponse>(
    "/api/auth/email-verifications/verify",
    data,
  );

  return response.data;
};

//회원가입
export const signupApi = async (
  data: SignupRequest,
): Promise<SignupResponse> => {
  const response = await client.post<SignupResponse>("/api/auth/signup", data);

  return response.data;
};
