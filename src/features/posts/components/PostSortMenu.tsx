import type { PostSort } from "../types/post";
import styled from "@emotion/styled";

const SortNav = styled.nav`
  position: relative;
  left: 10px
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

const SortButton = styled.button<SortButtonProps>`
  width: 100%;
  padding: 0;

  text-align: left;
  font-size: 22px;
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 400)};
`;

// PostSortMenu 컴포넌트가 부모 컴포넌트한테 받아야하는 값의 타입 정의.
interface PostSortMenuProps {
  selectedSort: PostSort;

  onChange: (sort: PostSort) => void;
}

// 정렬 버튼의 선택 여부
interface SortButtonProps {
  isSelected: boolean;
}

interface SortOption {
  value: PostSort;
  label: string;
} // 정렬 메뉴 한 개의 형태

const sortOptions: SortOption[] = [
  { value: "popular", label: "인기순" },
  { value: "latest", label: "최신순" },
  { value: "views", label: "조회순" },
]; // 실제 정렬 메뉴의 데이터

function PostSortMenu({ selectedSort, onChange }: PostSortMenuProps) {
  return (
    <SortNav aria-label="게시글 정렬">
      <SortList>
        {sortOptions.map((option) => {
          const isSelected = selectedSort === option.value;
          return (
            <li key={option.value}>
              <SortButton
                type="button"
                onClick={() => onChange(option.value)}
                isSelected={isSelected}
                aria-pressed={isSelected} //스크린 리더, true, false를 확인.
              >
                {option.label}
              </SortButton>
            </li>
          );
        })}
      </SortList>
    </SortNav>
  );
}
export default PostSortMenu;
