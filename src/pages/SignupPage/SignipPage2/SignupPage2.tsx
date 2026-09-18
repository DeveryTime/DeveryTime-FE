import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BackgroundLayer } from "../../BackgroundActStyle";
import { Background } from "../../BackgroundAct";
import { ContentLayer } from "../../BackgroundActStyle";
import { sendEmailVerificationApi, verifyEmailApi } from "../../../api/Authapi";
import type {
  SendEmailVerificationErrorResponse,
  VerifyEmailErrorResponse,
} from "../../../api/Authapi";

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

interface SignupPage2Data {
  schoolNumber: string;
  name: string;
  username: string;
}

export const SignupPage2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevData = location.state as SignupPage2Data | null;
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [cooldown, setCooldown] = useState<number>(0);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  //이메일 변경

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);

    setVerificationCode("");
    setIsVerified(false);
    setTime(0);
  };

  //인증번호 발송
  
  const handleSendCode = async (): Promise<void> => {
    if (email.trim() === "") {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (cooldown > 0) {
      return;
    }

    try {
      setIsSending(true);

      const res = await sendEmailVerificationApi({
        email: email.trim(),
      });

      setTime(300);
      setCooldown(60);

      setVerificationCode("");
      setIsVerified(false);

      alert(res.message);
    } catch (error: unknown) {
      if (axios.isAxiosError<SendEmailVerificationErrorResponse>(error)) {
        const errorResponse = error.response?.data;

        if (!errorResponse) {
          alert("서버와 통신할 수 없습니다.");
          return;
        }

        const errorCode = errorResponse.error.code;

        if (errorCode === "EMAIL_ALREADY_EXISTS") {
          alert("이미 가입된 이메일입니다.");
        } else if (errorCode === "TOO_MANY_REQUESTS") {
          alert("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
        } else if (errorCode === "SERVICE_UNAVAILABLE") {
          alert("이메일 인증 서비스를 사용할 수 없습니다.");
        } else if (errorCode === "VALIDATION_ERROR") {
          alert("이메일 형식이 올바르지 않습니다.");
        } else {
          alert(errorResponse.error.message);
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsSending(false);
    }
  };

  //쿨다운

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setCooldown((prev: number) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [cooldown]);

  //인증번호 유효시간

  useEffect(() => {
    if (time <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTime((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer);
          setVerificationCode("");
          setIsVerified(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  //인증번호 입력

  const handleVerificationCode = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      return;
    }

    if (value.length > 6) {
      return;
    }

    setVerificationCode(value);
    setIsVerified(false);
  };

  //인증번호 확인

  const handleVerifyCode = async (): Promise<void> => {
    if (email.trim() === "") {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (verificationCode.length !== 6) {
      alert("인증번호 6자리를 입력해주세요.");
      return;
    }

    try {
      setIsVerifying(true);

      const res = await verifyEmailApi({
        email: email.trim(),
        code: verificationCode,
      });

      setIsVerified(true);

      alert(res.message);
    } catch (error: unknown) {
      setIsVerified(false);

      if (axios.isAxiosError<VerifyEmailErrorResponse>(error)) {
        const errorResponse = error.response?.data;

        if (!errorResponse) {
          alert("서버와 통신할 수 없습니다.");
          return;
        }

        const errorCode = errorResponse.error.code;

        if (errorCode === "EMAIL_ALREADY_VERIFIED") {
          setIsVerified(true);

          alert("이미 인증된 이메일입니다.");
        } else if (errorCode === "VERIFICATION_CODE_EXPIRED") {
          alert("인증번호가 만료되었습니다. 다시 요청해주세요.");
        } else if (errorCode === "INVALID_VERIFICATION_CODE") {
          alert("인증번호가 올바르지 않습니다.");
        } else if (errorCode === "VERIFICATION_ATTEMPT_EXCEEDED") {
          alert("인증 시도 횟수를 초과했습니다.");
        } else if (errorCode === "INTERNAL_SERVER_ERROR") {
          alert("서버 내부 오류가 발생했습니다.");
        } else {
          alert(errorResponse.error.message);
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleNext = (): void => {
    if (!isVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    if (!prevData) {
      alert("회원가입 정보를 찾을 수 없습니다.");
      navigate("/signup/1");
      return;
    }

    navigate("/signup/3", {
      state: {
        schoolNumber: prevData.schoolNumber,
        name: prevData.name,
        username: prevData.username,
        email: email.trim(),
      },
    });
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;

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
              onChange={handleEmailChange}
            />

            <VerifyButton
              onClick={handleSendCode}
              disabled={cooldown > 0 || isSending}
            >
              {isSending
                ? "전송 중..."
                : cooldown > 0
                  ? `${cooldown}초 후 재전송`
                  : "인증번호 받기"}
            </VerifyButton>
          </EmailArea>

          <VerificationArea>
            <VerificationInput
              placeholder="인증번호 입력"
              value={verificationCode}
              onChange={handleVerificationCode}
            />

            <Timer>{formattedTime}</Timer>
          </VerificationArea>

          <VerificationText>
            {isVerified
              ? "이메일 인증이 완료되었습니다."
              : "인증번호 6자리를 입력하세요"}
          </VerificationText>

          {!isVerified && (
            <Button onClick={handleVerifyCode}>
              {isVerifying ? "인증 중..." : "인증번호 확인"}
            </Button>
          )}

          {isVerified && <Button onClick={handleNext}>다음</Button>}

          <QuestionText>
            <Qusetion>이미 계정을 가지고 계신가요?</Qusetion>

            <LinkText to="/login">로그인</LinkText>
          </QuestionText>
        </CardBox>
      </ContentLayer>
    </SignupWrapper>
  );
};
