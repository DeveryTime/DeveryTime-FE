import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as S from "./search-page.style";

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

  const [posts, setPosts] = useState<SearchPost[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);

  useEffect(() => {
    if (!keyword.trim()) {
      setPosts([]);
      setTotalElements(0);
      return;
    }

    /* 백엔드 연동용 Axios 코드 (추후 주석 해제)
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get("/api/posts/search", {
          params: { keyword },
        });

        if (response.data.success) {
          setPosts(response.data.data.content);
          setTotalElements(response.data.data.totalElements);
        }
      } catch (error) {
        console.error("검색 결과를 불러오는 중 에러가 발생했습니다:", error);
      }
    };

    fetchSearchResults();
    */

    // 목업 데이터 필터링
    const filteredMock: SearchPost[] = MOCK_SEARCH_DATA.filter((post) =>
      post.title.includes(keyword),
    );

    setPosts(filteredMock);
    setTotalElements(filteredMock.length);
  }, [keyword]);

  const formatDate = (isoString: string) => {
    if (!isoString) return "";
    return isoString.split("T")[0].replace(/-/g, ".");
  };

  return (
    <S.PageContainer>
      <S.Title>'{keyword}' 검색 결과</S.Title>
      <S.Description>입력하신 키워드가 포함된 게시글 목록입니다.</S.Description>
      <S.CategoryMeta>검색 결과 {totalElements}개</S.CategoryMeta>

      {posts.length > 0 ? (
        <S.ListContainer>
          {posts.map((post) => (
            <S.PostCard key={post.id}>
              <S.PostTitle>{post.title}</S.PostTitle>
              <S.PostInfo>
                {post.categoryName} · {formatDate(post.createdAt)}
              </S.PostInfo>
            </S.PostCard>
          ))}
        </S.ListContainer>
      ) : (
        <S.EmptyMessage role="status">
          '{keyword}'에 대한 검색 결과가 없습니다.
        </S.EmptyMessage>
      )}
    </S.PageContainer>
  );
}

export default SearchPage;
