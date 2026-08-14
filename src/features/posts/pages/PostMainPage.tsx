import { useState } from "react";
import PostSortMenu from "../components/PostSortMenu";
import PostTable from "../components/PostTable";
import PostPagination from "../components/PostPagination";
import { mockPosts } from "../data/mockPosts";
import type { PostSort } from "../types/post";
import styled from "@emotion/styled";

const PageContainer = styled.main`
  position: relative;

  width: 720px;
  margin: 40px auto;
`;

// 정렬 메뉴를 게시글 콘텐츠 왼쪽에 배치
const SortMenuArea = styled.aside`
  position: absolute;
  top: 48px;
  right: calc(100% + 24px);

  width: 80px;
`;

// 제목, 게시글 표, 페이지네이션 영역
const Content = styled.section`
  width: 100%;
  min-width: 0;
`;

// 현재 선택된 정렬 제목
const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
`;
function PostMainPage() {
  const [selectedSort, setSelectedSort] = useState<PostSort>("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const sortTitles: Record<PostSort, string> = {
    popular: "인기순",
    latest: "최신순",
    views: "조회순",
  };

  return (
    <PageContainer>
      <SortMenuArea>
        <PostSortMenu selectedSort={selectedSort} onChange={setSelectedSort} />
      </SortMenuArea>

      <Content>
        <Title>{sortTitles[selectedSort]}</Title>

        <PostTable posts={mockPosts} />

        <PostPagination
          currentPage={currentPage}
          totalPages={10}
          onChange={setCurrentPage}
        />
      </Content>
    </PageContainer>
  );
}

export default PostMainPage;
