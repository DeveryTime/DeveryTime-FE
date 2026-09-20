import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as S from "./search-page.style";
import { SearchPostResult } from "../features/components/SearchPostResult";

interface SearchPost {
  id: number;
  title: string;
  categoryName: string;
  createdAt: string;
}

// 목업 데이터
const MOCK_SEARCH_DATA: SearchPost[] = [
  {
    id: 1,
    title: "체육대회 관련 공지",
    categoryName: "전공",
    createdAt: "2026-08-26T10:00:00",
  },
  {
    id: 2,
    title: "체육대회 같이 나갈 팀원 구합니다",
    categoryName: "프로젝트",
    createdAt: "2026-08-27T14:30:00",
  },
];

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const posts: SearchPost[] = keyword.trim()
    ? MOCK_SEARCH_DATA.filter((post) => post.title.includes(keyword))
    : [];
  const totalElements = posts.length;
  const totalPages = 1;

  return (
    <S.PageContainer>
      <S.Title>'{keyword}' 검색 결과</S.Title>
      <S.Description>입력하신 키워드가 포함된 게시글 목록입니다.</S.Description>
      <S.CategoryMeta>검색 결과 {totalElements}개</S.CategoryMeta>

      {posts.length > 0 ? (
        <SearchPostResult
          posts={posts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : (
        <S.EmptyMessage role="status">
          '{keyword}'에 대한 검색 결과가 없습니다.
        </S.EmptyMessage>
      )}
    </S.PageContainer>
  );
}

export default SearchPage;
