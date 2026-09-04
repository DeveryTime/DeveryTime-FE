import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoMdLock } from "react-icons/io";
import { BackgroundLayer } from "../../BackgroundActStyle";
import { Background } from "../../BackgroundAct";
import { ContentLayer } from "../../BackgroundActStyle";

import {
  SignupWrapper,
  CardBox,
  TopArea,
  BackButton,
  Title,
  PasswordArea,
  PasswordInput,
  EyeButton,
  PasswordText,
  Button,
  QuestionText,
  Qusetion,
  LinkText,
} from "./SignupPageStyle3";

export const SignupPage3 = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);

  const handleSignup = () => {
    if (password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (password.length < 8 || password.length > 20) {
      alert("비밀번호는 8~20자리여야 합니다.");
      return;
    }

    if (passwordConfirm === "") {
      alert("비밀번호 재확인을 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 나중에 백엔드 회원가입 API 연결

    alert("회원가입이 완료되었습니다.");
    navigate("/main");
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
            <EyeButton onClick={() => setShowPassword(!showPassword)}>
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
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            >
              {showPasswordConfirm ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </EyeButton>
          </PasswordArea>
          <Button onClick={handleSignup}>회원가입</Button>
          <QuestionText>
            <Qusetion>이미 계정을 가지고 계신가요?</Qusetion>
            <LinkText to="/login">로그인</LinkText>
          </QuestionText>
        </CardBox>
      </ContentLayer>
    </SignupWrapper>
  );
};
