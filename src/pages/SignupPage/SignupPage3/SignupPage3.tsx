import { useState } from "react";
import { IoIosArrowBack, IoMdLock } from "react-icons/io";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BackgroundLayer, ContentLayer } from "../../BackgroundActStyle";
import { Background } from "../../BackgroundAct";
import type { SignupErrorResponse } from "../../../api/Authapi";
import { signupApi } from "../../../api/Authapi";

import {
  BackButton,
  Button,
  CardBox,
  EyeButton,
  LinkText,
  PasswordArea,
  PasswordInput,
  PasswordText,
  QuestionText,
  Qusetion,
  SignupWrapper,
  Title,
  TopArea
} from "./SignupPageStyle3";

interface SignupPage3Data {
  schoolNumber: string;
  name: string;
  username: string;
  email: string;
}

export const SignupPage3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevData = location.state as SignupPage3Data | null;
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  //회원가입
  const handleSignup = async (): Promise<void> => {
    if (!prevData) {
      alert("회원가입 정보를 찾을 수 없습니다.");
      navigate("/signup/1");
      return;
    }

    if (password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (passwordConfirm === "") {
      alert("비밀번호 재확인을 입력해주세요.");
      return;
    }

    if (password.length < 8) {
      alert("비밀번호는 8자 이상 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await signupApi({
        schoolNumber: prevData.schoolNumber,
        name: prevData.name,
        username: prevData.username,
        email: prevData.email,
        password,
        passwordConfirm,
      });

      alert(res.message);
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError<SignupErrorResponse>(error)) {
        const errorResponse = error.response?.data;

        if (!errorResponse) {
          alert("서버와 통신할 수 없습니다.");
          return;
        }

        const errorCode = errorResponse.error.code;

        if (errorCode === "EMAIL_NOT_VERIFIED") {
          alert("이메일 인증을 완료해주세요.");
        } else if (errorCode === "EMAIL_ALREADY_EXISTS") {
          alert("이미 가입된 이메일입니다.");
        } else if (errorCode === "USERNAME_ALREADY_EXISTS") {
          alert("이미 사용 중인 아이디입니다.");
        } else if (errorCode === "PASSWORD_MISMATCH") {
          alert("비밀번호가 일치하지 않습니다.");
        } else if (errorCode === "SCHOOL_NUMBER_ALREADY_EXISTS") {
          alert("이미 가입된 학번입니다.");
        } else if (errorCode === "VALIDATION_ERROR") {
          alert("입력 형식이 올바르지 않습니다.");
        } else if (errorCode === "INTERNAL_SERVER_ERROR") {
          alert("서버 내부 오류가 발생했습니다.");
        } else {
          alert(errorResponse.error.message);
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SignupWrapper>
      <BackgroundLayer>
        <Background />
      </BackgroundLayer>
      <ContentLayer>
        <CardBox>
          <TopArea>
            <BackButton onClick={() => navigate(-1)}>
              <IoIosArrowBack />
            </BackButton>
            <Title>회원가입</Title>
          </TopArea>
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
          <PasswordText>
            <IoMdLock />
            비밀번호는 최소 8자리 이상이어야 합니다.
          </PasswordText>
          <PasswordArea>
            <PasswordInput
              type={showPasswordConfirm ? "text" : "password"}
              placeholder="비밀번호 재확인"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />

            <EyeButton
              type="button"
              onClick={() => setShowPasswordConfirm((prev: boolean) => !prev)}
            >
              {showPasswordConfirm ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </EyeButton>
          </PasswordArea>

          <Button onClick={handleSignup} disabled={isSubmitting}>
            {isSubmitting ? "회원가입 중..." : "회원가입"}
          </Button>
          <QuestionText>
            <Qusetion>이미 계정을 가지고 계신가요?</Qusetion>
            <LinkText to="/login">로그인</LinkText>
          </QuestionText>
        </CardBox>
      </ContentLayer>
    </SignupWrapper>
  );
};