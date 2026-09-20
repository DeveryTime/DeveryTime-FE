import styled from "@emotion/styled";
import { colors } from "../../designToken/colors";

export interface SearchPostResultItem {
  id: number;
  title: string;
  categoryName: string;
  createdAt: string;
}

interface SearchPostResultProps {
  posts: SearchPostResultItem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPostClick?: (postId: number) => void;
  pageSize?: number;
}

const PAGE_GROUP_SIZE = 10;

function formatDate(createdAt: string) {
  return createdAt.split("T")[0]?.replace(/-/g, ".") ?? "";
}

export function SearchPostResult({
  posts,
  currentPage,
  totalPages,
  onPageChange,
  onPostClick,
  pageSize = 20,
}: SearchPostResultProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const firstPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const lastPage = Math.min(firstPage + PAGE_GROUP_SIZE - 1, safeTotalPages);
  const pageNumbers = Array.from(
    { length: lastPage - firstPage + 1 },
    (_, index) => firstPage + index,
  );

  if (posts.length === 0) {
    return <EmptyMessage>검색 결과가 없습니다.</EmptyMessage>;
  }

  return (
    <Container>
      <TableWrapper>
        <PostTable>
          <thead>
            <tr>
              <NumberHeader>번호</NumberHeader>
              <CategoryHeader>카테고리</CategoryHeader>
              <TitleHeader>제목</TitleHeader>
              <DateHeader>작성일</DateHeader>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <TableRow key={post.id}>
                <NumberCell>{(currentPage - 1) * pageSize + index + 1}</NumberCell>
                <CategoryCell>{post.categoryName}</CategoryCell>
                <TitleCell>
                  {onPostClick ? (
                    <TitleButton type="button" onClick={() => onPostClick(post.id)}>
                      {post.title}
                    </TitleButton>
                  ) : (
                    post.title
                  )}
                </TitleCell>
                <DateCell>{formatDate(post.createdAt)}</DateCell>
              </TableRow>
            ))}
          </tbody>
        </PostTable>
      </TableWrapper>

      <Pagination aria-label="검색 결과 페이지">
        <PageButton
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="첫 페이지"
        >
          «
        </PageButton>
        <PageButton
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="이전 페이지"
        >
          ‹
        </PageButton>

        {pageNumbers.map((page) => (
          <PageButton
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            $isActive={page === currentPage}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </PageButton>
        ))}

        <PageButton
          type="button"
          onClick={() => onPageChange(Math.min(safeTotalPages, currentPage + 1))}
          disabled={currentPage === safeTotalPages}
          aria-label="다음 페이지"
        >
          ›
        </PageButton>
        <PageButton
          type="button"
          onClick={() => onPageChange(safeTotalPages)}
          disabled={currentPage === safeTotalPages}
          aria-label="마지막 페이지"
        >
          »
        </PageButton>
      </Pagination>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const PostTable = styled.table`
  width: 100%;
  min-width: 620px;
  border-collapse: collapse;
  border-top: 2px solid ${colors.blue[500]};
  color: #252525;
`;

const NumberHeader = styled.th`
  width: 72px;
`;

const CategoryHeader = styled.th`
  width: 120px;
`;

const TitleHeader = styled.th`
  text-align: left;
`;

const DateHeader = styled.th`
  width: 120px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    background-color: ${colors.blue[50]};
  }
`;

const NumberCell = styled.td`
  padding: 18px 8px;
  text-align: center;
  color: #6b7280;
`;

const CategoryCell = styled.td`
  padding: 18px 8px;
  text-align: center;
  color: #4b5563;
`;

const TitleCell = styled.td`
  padding: 18px 16px;
  font-weight: 500;
`;

const DateCell = styled.td`
  padding: 18px 8px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
`;

const TitleButton = styled.button`
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  text-align: left;

  &:hover {
    color: ${colors.blue[500]};
    text-decoration: underline;
  }
`;

const Pagination = styled.nav`
  display: flex;
  justify-content: center;
  gap: 6px;
`;

const PageButton = styled.button<{ $isActive?: boolean }>`
  min-width: 32px;
  height: 32px;
  border: 1px solid ${({ $isActive }) => ($isActive ? colors.blue[500] : "#d1d5db")};
  border-radius: 6px;
  background-color: ${({ $isActive }) => ($isActive ? colors.blue[500] : "#ffffff")};
  color: ${({ $isActive }) => ($isActive ? "#ffffff" : "#374151")};
  cursor: pointer;

  &:not(:disabled):hover {
    border-color: ${colors.blue[500]};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const EmptyMessage = styled.p`
  padding: 56px 0;
  color: #6b7280;
  text-align: center;
`;
