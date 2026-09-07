import { useState } from "react";
import PostSortMenu from "../components/PostSortMenu";
import PostTable from "../components/PostTable";
import PostPagination from "../components/PostPagination";
import { mockPosts } from "../data/mockPosts";
import type { PostListItemType, PostSort } from "../types/post";
import styled from "@emotion/styled";
import PostDetailModal from "../components/PostDetailModal";
import { mockPostDetail } from "../data/mockPosts";

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

function PostMainPage() {
  // 현재 선택된 정렬 기준, 페이지, 게시글 목록, 상세 게시글을 관리한다.
  const [selectedSort, setSelectedSort] = useState<PostSort>("likes");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostListItemType[]>(mockPosts);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // 선택한 게시글 ID에 해당하는 상세 데이터를 조회한다.
  const selectedPost =
    selectedPostId !== null ? mockPostDetail[selectedPostId] : null;

  // 정렬 기준별로 화면 제목을 연결한다.
  const sortTitles: Record<PostSort, string> = {
    likes: "인기순",
    latest: "최신순",
    views: "조회순",
  };

  // 게시글을 삭제한 뒤 목록에서 제거하고 상세 모달을 닫는다.
  function handlePostDelete(postId: number) {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId),
    );

    setSelectedPostId(null);
  }

  return (
    // 정렬 메뉴, 게시글 목록, 상세 모달, 페이지네이션을 배치한다.
    <PageContainer>
      <SortMenuArea>
        <PostSortMenu selectedSort={selectedSort} onChange={setSelectedSort} />
      </SortMenuArea>

      <Content>
        {/* 현재 정렬 기준에 따른 게시글 목록 제목 */}
        <Title>{sortTitles[selectedSort]}</Title>

        {/* 게시글 목록 */}
        <PostTable posts={posts} onPostClick={setSelectedPostId} />

        {/* 게시글을 선택했을 때만 상세 모달을 표시한다. */}
        {selectedPost && (
          <PostDetailModal
            post={selectedPost}
            onClose={() => setSelectedPostId(null)}
            onDelete={handlePostDelete}
          />
        )}

        {/* 게시글 페이지 이동 */}
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
