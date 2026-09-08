import { useState } from "react";
import PostSortMenu from "../components/PostSortMenu";
import PostTable from "../components/PostTable";
import PostPagination from "../components/PostPagination";
import { mockPosts } from "../data/mockPosts";
import type { PostListItemType, PostSort } from "../types/post";
import D from "../../../styles/PostMainPage.styles";
import PostDetailModal from "../components/PostDetailModal";
import { mockPostDetail } from "../data/mockPosts";
import { PAGE_SIZE } from "../../../constants/pagination";

function PostMainPage() {
  // 현재 선택된 정렬 기준, 페이지, 게시글 목록, 상세 게시글을 관리한다.
  const [selectedSort, setSelectedSort] = useState<PostSort>("likes");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostListItemType[]>(mockPosts);

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));

  const paginatedPosts = posts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
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
    <D.PageContainer>
      <D.SortMenuArea>
        <PostSortMenu selectedSort={selectedSort} onChange={setSelectedSort} />
      </D.SortMenuArea>

      <D.Content>
        {/* 현재 정렬 기준에 따른 게시글 목록 제목 */}
        <D.Title>{sortTitles[selectedSort]}</D.Title>

        {/* 게시글 목록 */}
        <PostTable posts={paginatedPosts} onPostClick={setSelectedPostId} />

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
          totalPages={totalPages}
          onChange={setCurrentPage}
        />
      </D.Content>
    </D.PageContainer>
  );
}

export default PostMainPage;
