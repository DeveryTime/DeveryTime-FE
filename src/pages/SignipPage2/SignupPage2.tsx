import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BackgroundLayer } from "../BackgroundActStyle";
import { Background } from "../BackgroundAct";
import { ContentLayer } from "../BackgroundActStyle";

import {
  SignupWrapper,
  CardBox,
  TopArea,
  BackButton,
  Title,
  EmailArea,
  EmailInput,
  VerifyButton,
  VerificationArea,
  VerificationInput,
  Timer,
  VerificationText,
  Button,
  QuestionText,
  Qusetion,
  LinkText,
} from "./SignupPageStyle2";

export const SignupPage2 = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [time, setTime] = useState<number>(0);

  // 인증번호 받기
  const handleSendCode = () => {
    if (email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (!email.endsWith("@dsm.hs.kr")) {
      alert("학교 이메일(@dsm.hs.kr)을 입력해주세요.");
      return;
    }

    setTime(300);

    // 기존 인증번호 삭제
    setVerificationCode("");

    // 나중에 백엔드 인증번호 API 연결
    alert("인증번호가 전송되었습니다.");
  };

  // 타이머
  useEffect(() => {
    if (time <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setVerificationCode("");
          alert("인증번호가 만료되었습니다. 이메일 인증을 다시 해주세요.");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;

  // 인증번호 입력
  const handleVerificationCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 6) {
      return;
    }

    setVerificationCode(value);
  };

  // 회원가입 버튼
  const handleSignup = () => {
    if (email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (!email.endsWith("@dsm.hs.kr")) {
      alert("학교 이메일(@dsm.hs.kr)을 입력해주세요.");
      return;
    }

    if (verificationCode === "") {
      alert("인증번호를 입력해주세요.");
      return;
    }

    if (verificationCode.length !== 6) {
      alert("인증번호 6자리를 입력해주세요.");
      return;
    }

    if (time === 0) {
      alert("인증번호가 만료되었습니다. 이메일 인증을 다시 해주세요.");
      return;
    }

    navigate("/signup/3");
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
          <EmailArea>
            <EmailInput
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <VerifyButton onClick={handleSendCode}>인증번호 받기</VerifyButton>
          </EmailArea>
          <VerificationArea>
            <VerificationInput
              placeholder="인증번호 입력"
              value={verificationCode}
              onChange={handleVerificationCode}
            />
            <Timer>{formattedTime}</Timer>
          </VerificationArea>
          <VerificationText>인증번호 6자리를 입력하세요</VerificationText>
          <Button
            onClick={
              verificationCode.length === 6 ? handleSignup : handleSendCode
            }
          >
            {verificationCode.length === 6
              ? "회원가입"
              : "이메일 인증 다시하기"}
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
