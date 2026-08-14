import styled from "@emotion/styled";

const PaginationContainer = styled.nav`
  width: 360px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 32px;
`;

const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;

  color: #000000;
  font-size: 14px;

  &:hover:not(:disabled) {
    color: #577aed;
  }

  &[aria-current="page"] {
    color: #ff0000;
    font-weight: 700;
  }

  /* 비활성화된 이동 버튼 */
  &:disabled {
    color: #b0b0b0;
    cursor: not-allowed;
  }
`;

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
  const pageGroupSize = 10;

  const startPage =
    Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;

  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );
  return (
    <PaginationContainer aria-label="게시글 페이지 이동">
      <PageButton
        type="button"
        onClick={() => onChange(1)}
        disabled={currentPage === 1}
        aria-label="첫 페이지로 이동"
      >
        <ChevronsLeft aria-hidden="true" />
      </PageButton>

      <PageButton
        type="button"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        <ChevronLeft aria-hidden="true" />
      </PageButton>

      {pages.map((page) => (
        <PageButton
          key={page}
          type="button"
          onClick={() => onChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        type="button"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지로 이동"
      >
        <ChevronRight aria-hidden="true" />
      </PageButton>

      <PageButton
        type="button"
        onClick={() => onChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="마지막 페이지로 이동"
      >
        <ChevronsRight aria-hidden="true" />
      </PageButton>
    </PaginationContainer>
  );
}

export default PostPagination;
