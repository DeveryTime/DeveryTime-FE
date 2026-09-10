import type { PostSort } from "../types/post";
import M from  "../../../styles/PostSortMenu.styles"

// PostSortMenu 컴포넌트가 부모 컴포넌트한테 받아야하는 값의 타입 정의.
interface PostSortMenuProps {
  selectedSort: PostSort;

  onChange: (sort: PostSort) => void;
}


interface SortOption {
  value: PostSort;
  label: string;
} // 정렬 메뉴 한 개의 형태

// 화면에 표시할 게시글 정렬 옵션 목록이다.
const sortOptions: SortOption[] = [
  { value: "likes", label: "인기순" },
  { value: "latest", label: "최신순" },
  { value: "views", label: "조회순" },
];

function PostSortMenu({ selectedSort, onChange }: PostSortMenuProps) {
  return (
    // 선택된 정렬 기준을 부모 컴포넌트에 전달하는 메뉴다.
    <M.SortNav aria-label="게시글 정렬">
      <M.SortList>
        {sortOptions.map((option) => {
          // 현재 선택된 정렬 기준인지 확인해 스타일과 접근성 상태에 반영한다.
          const isSelected = selectedSort === option.value;
          return (
            <li key={option.value}>
              <M.SortButton
                type="button"
                onClick={() => onChange(option.value)}
                $isSelected={isSelected}
                aria-pressed={isSelected} //스크린 리더, true, false를 확인.
              >
                {option.label}
              </M.SortButton>
            </li>
          );
        })}
      </M.SortList>
    </M.SortNav>
  );
}
export default PostSortMenu;
