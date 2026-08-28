import styled from "@emotion/styled";
import { colors } from "../../designToken/colors";
import { Link } from "react-router-dom";

export const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: ${colors.blue[50]};
`;

export const CardBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 660px;
  height: 700px;
  background-color: #ffffff;
  gap: 64px;
  box-shadow: 6px 4px 12px 8px #00000040;
  border-radius: 15px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000000;
  font-family: Pretendard;
  font-style: Bold;
  font-size: 36px;
  font-weight: 700;
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 564px;
  height: 64px;
  background-color: ${colors.blue[400]};
  border-radius: 15px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  font-style: Medium;
  font-family: Pretendard;
`;

export const LinkText = styled(Link)`
  color: #000000;
  font-size: 20px;
  font-weight: 500;
  font-style: Bold;
  font-family: Pretendard;
  text-decoration: underline;
  text-underline-offset: 6px;
`;

export const Qusetion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  font-style: Medium;
  font-family: Pretendard;
`;

export const QuestionText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
