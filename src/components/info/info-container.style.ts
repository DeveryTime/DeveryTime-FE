import { css } from "@emotion/react";

export const wrContainer = css`
  position: relative;
  width: 918px;
  min-height: 300px;
  padding: 12px 20px;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
`;

export const sectionTitle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  p {
    margin: 0;

    font-size: 15px;
    font-weight: 500;
  }
`;

export const postList = css`
  display: flex;
  flex-direction: column;
`;

export const postItem = css`
  display: flex;
  align-items: center;
  min-height: 36px;
  font-size: 16px;
  font-weight: 500;
`;

export const postNumber = css`
  width: 70px;
  margin: 0;
  font-size: 17px;
  font-weight: 500;
`;

export const postCategory = css`
  width: 85px;
  margin: 0;
`;

export const postContent = css`
  flex: 1;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const postDate = css`
  width: 90px;
  margin: 0;
  text-align: right;
  font-size: 16px;
  font-weight: 500;
`;
