import { Global, css } from "@emotion/react";
import { colors } from "./colors";

// 앱 전체에 적용되는 초기화 및 공통 기본 스타일이다.
export const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: Pretendard, sans-serif;
        background-color: ${colors.gray[50]};
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      button {
        border: none;
        background: none;
        cursor: pointer;
      }
    `}
  />
);
