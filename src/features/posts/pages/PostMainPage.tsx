import { useState } from "react";
import PostSortMenu from "../components/PostSortMenu";
import PostTable from "../components/PostTable";
import PostPagination from "../components/PostPagination";
import { mockPosts } from "../data/mockPosts";
import type { PostSort } from "../types/post";
import styled from "@emotion/styled";

const PageContainer = styled.main`
  position: relative;
  right: 170px;
  top: 200px;
  width: 720px;
  margin: 40px auto;
`;

// 정렬 메뉴를 게시글 콘텐츠 왼쪽에 배치
const SortMenuArea = styled.aside`
  position: absolute;
  top: 41px;

  right: calc(100% + 60px);

  width: 80px;

  padding: 20px;
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
// Record<PostSort, string>: PostSort를 키로, string을 값으로 갖는 객체 타입
function PostMainPage() {
  const [selectedSort, setSelectedSort] = useState<PostSort>("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const sortTitles: Record<PostSort, string> = {
    popular: "인기순",
    latest: "최신순",
    views: "조회순",
  };

  return (
    <body>
      <PageContainer>
        <SortMenuArea>
          <PostSortMenu
            selectedSort={selectedSort}
            onChange={setSelectedSort}
          />
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
    </body>
  );
}

export default PostMainPage;
