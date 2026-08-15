import { useState } from "react";
import PostSortMenu from "../components/PostSortMenu";
import PostTable from "../components/PostTable";
import PostPagination from "../components/PostPagination";
import { mockPosts } from "../data/mockPosts";
import type { PostSort } from "../types/post";
import styled from "@emotion/styled";

const PageContainer = styled.main`
  display: grid;
  grid-template-columns: 130px 1293px;
  column-gap: 56px;
  align-items: start;

  width: 1479px;
  margin: 108px auto 0;
`;

// 정렬 메뉴를 테이블 시작 높이에 맞춤
const SortMenuArea = styled.aside`
  margin-top: 78px;
`;

const Content = styled.section`
  width: 1293px;
`;

const Title = styled.h1`
  margin: 0 0 16px;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.3;
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
