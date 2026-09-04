import styled from "@emotion/styled";

const PaginationContainer = styled.nav`
  width: 360px;
  height: 22px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  margin: 32px auto 0;

  transform: translateX(-80px);
`;

const PageButton = styled.button`
  width: 22px;
  height: 22px;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #000000;
  font-size: 16px;
  line-height: 1;

  &:hover:not(:disabled) {
    color: #577aed;
  }

  &[aria-current="page"] {
    color: #577aed;
    font-weight: 700;
  }

  &:disabled {
    color: #b0b0b0;
    cursor: not-allowed;
  }
`;

const PostPaginationStyles = {
  PaginationContainer,
  PageButton,
};

export default PostPaginationStyles;
