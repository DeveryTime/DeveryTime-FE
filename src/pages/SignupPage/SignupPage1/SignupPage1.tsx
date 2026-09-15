import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BackgroundLayer, ContentLayer } from "../../BackgroundActStyle";
import { Background } from "../../BackgroundAct";
import { InputBox } from "../../../components";

import {
  SignupWrapper,
  CardBox,
  Title,
  Button,
  Qusetion,
  LinkText,
  QuestionText,
} from "./SignupPageStyle1";

interface SignupPage1Data {
  schoolNumber?: string;
  name?: string;
  username?: string;
}

export const SignupPage1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevData = location.state as SignupPage1Data | null;
  const [schoolNumber, setSchoolNumber] = useState<string>(
    prevData?.schoolNumber ?? "",
  );
  const [name, setName] = useState<string>(prevData?.name ?? "");
  const [username, setUsername] = useState<string>(prevData?.username ?? "");
  const handleNext = (): void => {
    if (schoolNumber.trim() === "") {
      alert("학번을 입력해주세요.");
      return;
    }

    if (name.trim() === "") {
      alert("이름을 입력해주세요.");
      return;
    }

    if (username.trim() === "") {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (username.trim().length > 10) {
      alert("아이디는 10자 이하로 입력해주세요.");
      return;
    }

    navigate("/signup/2", {
      state: {
        schoolNumber: schoolNumber.trim(),
        name: name.trim(),
        username: username.trim(),
      },
    });
  };

  return (
    <SignupWrapper>
      <BackgroundLayer>
        <Background />
      </BackgroundLayer>
      <ContentLayer>
        <CardBox>
          <Title>회원가입</Title>
          <InputBox
            placeholder="학번"
            value={schoolNumber}
            onChange={(e) => setSchoolNumber(e.target.value)}
          />
          <InputBox
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputBox
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button onClick={handleNext}>다음</Button>
          <QuestionText>
            <Qusetion>이미 계정을 가지고 계신가요?</Qusetion>
            <LinkText to="/login">로그인</LinkText>
          </QuestionText>
        </CardBox>
      </ContentLayer>
    </SignupWrapper>
  );
};
