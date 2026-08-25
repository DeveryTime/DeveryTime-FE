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
  width: 100%;
`;

export const navGap = css`
  display: flex;
  align-items: center;
  gap: 36px;
  flex: 1;
  min-width: 0;
`;

export const navCatalog = css`
  gap: 58px;
  display: flex;
`;

export const logo = css`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
`;
export const logoName = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
  font-weight: 700;
  flex-shrink: 0;
  white-space: nowrap;
`;

export const search = css`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  min-width: 200px;
  height: 42px;
  background-color: #fff;
  border-radius: 100px;
  padding: 0 16px;
  box-sizing: border-box;
  flex: 1;
`;

export const searchInput = css`
  flex: 1;
  width: 100%;
  min-width: 0;
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
  flex-shrink: 0;
`;

export const cateGory = css`
  display: flex;
  align-items: center;
  gap: 27px;
  padding: 0 0 0 58px;
  color: #fff;
  font-weight: 700;
  flex-shrink: 0;
  white-space: nowrap;
  & > div {
    cursor: pointer;

    &:hover {
      color: #000;
    }
  }
`;

export const login = css`
  align-items: center;
  justify-content: center;
  padding: 9px 23px 10px 22px;
  color: black;
  font-weight: 500;x
  border: none;
  background-color: #fff;
  border-radius: 16px;
  cursor: pointer;
  flex-shrink: 0;
`;
