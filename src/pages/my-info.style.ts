import { css } from "@emotion/react";

export const infoLayout = css`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 26px;
`;

export const menu = css`
  border: 1px solid #cbcbcb;
  padding: 7px 5px 10px 8px;
  width: 168px;
  height: 200px;

  p {
    margin: 0;
    padding: 11px 5px;

    font-size: 16px;
    font-weight: 500;
    border-bottom: 2px solid #dddddd;

    &:hover {
      color: #666;
    }

    &.active {
      color: #555;
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const infoContainer = css`
  position: relative;
  width: 918px;
  min-height: 300px;
  padding: 12px 20px;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
`;

export const infoTitle = css`
  font-size: 24px;
  font-weight: 500;
`;

export const userInfo = css`
  display: flex;
  gap: 26px;
  padding: 62px 0 32px 0;
  align-items: center;
`;

export const profileImage = css`
  width: 143px;
  height: 143px;
  border-radius: 50%;
  background-color: #b0c5fd;
`;

export const userName = css`
  font-size: 16px;
  font-weight: 500;
`;

export const userIdEmail = css`
  font-size: 13px;
  font-weight: 500;
  color: #999999;
`;

export const rightContainer = css`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;
