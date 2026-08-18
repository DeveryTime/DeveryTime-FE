import { css } from "@emotion/react";

export const navStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 28px;
  box-sizing: border-box;
  background-color: #b0c5fd;
  border: none;
  box-shadow: 0px 1px 4px -1px rgba(0, 0, 0, 0.1);
`;

export const navGap = css`
  display: flex;
  align-items: center;
  gap: 36px;
`;

export const logo = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 48px;
  background-color: #000;
  color: #fff;
  font-weight: 700;
`;

export const search = css`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 450px;
  height: 42px;
  background-color: #ffffff;
  border-radius: 100px;
  padding: 0 16px;
  box-sizing: border-box;
`;

export const searchInput = css`
  width: 674px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  padding: 0;
  margin: 0;
`;

export const searchIcon = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

export const cateGory = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 27px;
  color: #fff;
  font-weight: 700;
  padding: 0 0 0 58px;
`;

export const login = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 23px 10px 22px;
  color: black;
  font-weight: 500;
  border: none;
  background-color: #fff;
  border-radius: 16px;
  cursor: pointer;
`;
