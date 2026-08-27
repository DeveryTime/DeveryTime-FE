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

export const TopArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  background-color: transparent;
  font-size: 40px;
  cursor: pointer;
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

export const EmailArea = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 564px;
  height: 64px;
  transform: translateY(30px);

  border-bottom: 2px solid #6f6f6f;
`;

export const EmailInput = styled.input`
  width: 100%;
  height: 64px;
  padding: 0;
  border: none;
  outline: none;
  color: #333333;
  font-family: Pretendard;
  font-size: 24px;

  &::placeholder {
    color: #6f6f6f;
  }
`;

export const VerifyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 0;
  width: 126px;
  height: 44px;
  border: none;
  border-radius: 12px;
  background-color: ${colors.blue[200]};
  color: #ffffff;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

export const VerificationArea = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 564px;
  height: 64px;
  border-bottom: 2px solid #6f6f6f;
  transform: translateY(30px);
`;

export const VerificationInput = styled.input`
  width: 100%;
  height: 64px;
  padding: 0;
  border: none;
  outline: none;
  color: #333333;
  font-family: Pretendard;
  font-size: 24px;

  &::placeholder {
    color: #6f6f6f;
  }
`;

export const Timer = styled.div`
  position: absolute;
  right: 8px;
  color: #000000;
  font-family: Pretendard;
  font-size: 20px;
`;

export const VerificationText = styled.div`
  width: 564px;
  color: #000000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: 500;
  transform: translateY(-30px);
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
