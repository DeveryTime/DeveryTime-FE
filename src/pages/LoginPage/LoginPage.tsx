import { useState } from "react";
import { InputBox } from "../../components";
import { useNavigate } from "react-router-dom";
import { BackgroundLayer, ContentLayer } from "../BackgroundActStyle";
import { Background } from "../BackgroundAct";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import axios from "axios";

import { loginApi } from "../../api/Authapi";
import type { LoginErrorResponse } from "../../api/Authapi";

import {
  SignupWrapper,
  CardBox,
  Title,
  Button,
  Qusetion,
  LinkText,
  QuestionText,
  PasswordArea,
  EyeButton,
  PasswordInput,
  PasswordWrapper,
} from "./LoginPageStyle";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleNext = async (): Promise<void> => {
    // 입력값 확인
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 로그인 API 호출
      const res = await loginApi({
        email,
        password,
      });

      // 토큰 가져오기
      const accessToken: string = res.data.accessToken;

      const refreshToken: string = res.data.refreshToken;

      // 토큰 저장
      localStorage.setItem("accessToken", accessToken);

      localStorage.setItem("refreshToken", refreshToken);

      // 로그인 성공 메시지
      alert(res.message);

      // 메인 페이지 이동
      navigate("/main");
    } catch (error: unknown) {
      // Axios 에러 확인
      if (axios.isAxiosError<LoginErrorResponse>(error)) {
        const errorResponse = error.response?.data;

        // 서버에서 에러 응답을 받은 경우
        if (errorResponse) {
          const errorCode = errorResponse.error.code;

          if (errorCode === "INVALID_CREDENTIALS") {
            alert("이메일 또는 비밀번호가 올바르지 않습니다.");
          } else if (errorCode === "VALIDATION_ERROR") {
            alert("입력 형식이 올바르지 않습니다.");
          } else if (errorCode === "INTERNAL_SERVER_ERROR") {
            alert("서버 내부 오류가 발생했습니다.");
          } else {
            alert(errorResponse.error.message);
          }
        } else {
          alert("서버와 통신할 수 없습니다.");
        }
      } else {
        alert("알 수 없는 에러가 발생했습니다.");
      }
    }
  };

  return (
    <SignupWrapper>
      <BackgroundLayer>
        <Background />
      </BackgroundLayer>

      <ContentLayer>
        <CardBox>
          <Title>로그인</Title>

          <InputBox
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordWrapper>
            <PasswordArea>
              <PasswordInput
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <EyeButton
                type="button"
                onClick={() => setShowPassword((prev: boolean) => !prev)}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </EyeButton>
            </PasswordArea>

            {/* 비밀번호 찾기 페이지 → 나중에 유지보수
            <QuestionPasswordText>
              <Qusetion>
                비밀번호를 잊으셨나요?
              </Qusetion>
              <LinkText to="/FindPassword">
                여기
              </LinkText>
            </QuestionPasswordText>
            */}
          </PasswordWrapper>

          <Button onClick={handleNext}>다음</Button>

          <QuestionText>
            <Qusetion>계정이 없으신가요?</Qusetion>

            <LinkText to="/signup/1">회원가입</LinkText>
          </QuestionText>
        </CardBox>
      </ContentLayer>
    </SignupWrapper>
  );
};
