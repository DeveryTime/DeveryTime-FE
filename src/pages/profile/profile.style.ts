import { css } from "@emotion/react";

export const profileLayout = css`
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

export const profileContainer = css`
  position: relative;
  width: 918px;
  min-height: 700px;
  padding: 12px 20px;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
`;

export const profileTitle = css`
  font-size: 24px;
  font-weight: 500;
`;

export const userInfo = css`
  display: flex;
  gap: 26px;
  padding: 62px 0 32px 0;
  align-items: center;
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

export const profileImage = css`
  width: 143px;
  height: 143px;
  border-radius: 50%;
  background-color: #b0c5fd;
`;

export const nameInput = css`
  width: 100%;
  padding: 12px;
  box-sizing: border-box;

  border: 1px solid #999999;
  border-radius: 14px;

  font-size: 14px;
  font-weight: 500;
  color: #999999;

  &:focus {
    outline: none;
    border-color: #111;
  }
`;

export const Id = css`
  font-size: 17px;
  font-weight: 500;
  padding: 0 0 8px 0;
  color: #999999;
`;

export const saveBtn = css`
  position: absolute;

  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);

  width: 210px;
  padding: 11px 55px;
  box-sizing: border-box;

  border: none;
  border-radius: 25px;

  background: #3469f9;
  color: #fff;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  &:hover {
    background: #2855d9;
  }
`;

export const nsaveBtn = css`
  position: absolute;

  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);

  width: 210px;
  padding: 11px 55px;
  box-sizing: border-box;

  border: none;
  border-radius: 25px;

  background: #999;
  color: #fff;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  &:hover {
    background: #888;
  }
`;

export const toastStyle = {
  background: "#ffffff",
  color: "#555555",
  border: "1px solid #dddddd",
  borderRadius: "10px",
  padding: "14px 18px",
  fontSize: "14px",
  fontWeight: "500",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
};
