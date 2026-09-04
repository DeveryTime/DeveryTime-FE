import styled from "@emotion/styled";

interface SortButtonStyleProps {
  $isSelected: boolean;
}

const SortNav = styled.nav`
  position: relative;
  left: 10px;
  width: 80px;
  padding-top: 8px;
  border-top: 3px solid #222222;
`;

const SortList = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SortButton = styled.button<SortButtonStyleProps>`
  width: 100%;
  padding: 0;

  text-align: left;
  font-size: 22px;
  font-weight: ${({ $isSelected }) => ($isSelected ? 700 : 500)};
`;

const PostSortMenuStyles = {
  SortNav,
  SortList,
  SortButton,
};

export default PostSortMenuStyles;
