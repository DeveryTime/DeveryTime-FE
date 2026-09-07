import D from "../../../styles/PostPagination.styles";

import {
  ChevronsLeft,
  ChevronLeft,
  ChevronsRight,
  ChevronRight,
} from "lucide-react";

//페이지네이션이 부모에게 받을 값 타입 정의.
interface PostPaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function PostPagination({
  currentPage,
  totalPages,
  onChange,
}: PostPaginationProps) {
  // 한 번에 보여줄 페이지 번호 개수다.
  const pageGroupSize = 10;

  // 현재 페이지가 속한 페이지 그룹의 시작·마지막 번호를 계산한다.
  const startPage =
    Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;

  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  // 시작 번호부터 마지막 번호까지 화면에 표시할 페이지 목록을 만든다.
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    // 첫 페이지, 이전 페이지, 페이지 번호, 다음 페이지, 마지막 페이지를 제공한다.
    <D.PaginationContainer aria-label="게시글 페이지 이동">
      <D.PageButton
        type="button"
        onClick={() => onChange(1)}
        disabled={currentPage === 1}
        aria-label="첫 페이지로 이동"
      >
        <ChevronsLeft aria-hidden="true" />
      </D.PageButton>

      <D.PageButton
        type="button"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        <ChevronLeft aria-hidden="true" />
      </D.PageButton>

      {pages.map((page) => (
        <D.PageButton
          key={page}
          type="button"
          onClick={() => onChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </D.PageButton>
      ))}

      <D.PageButton
        type="button"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지로 이동"
      >
        <ChevronRight aria-hidden="true" />
      </D.PageButton>

      <D.PageButton
       type="button"
        onClick={() => onChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="마지막 페이지로 이동"
      >
        <ChevronsRight aria-hidden="true" />
      </D.PageButton>
    </D.PaginationContainer>
  );
}

export default PostPagination;
