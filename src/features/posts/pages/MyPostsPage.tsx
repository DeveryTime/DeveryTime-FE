import { useState } from "react";
import O from "../../../styles/MyPostsPage.styles";
import PostTable from "../components/PostTable";
import PostPagination from "../components/PostPagination";
import { mockMyPosts, mockPostDetail } from "../data/mockPosts";
import type { PostListItemType } from "../types/post";
import PostDetailModal from "../components/PostDetailModal";

function MyPostsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostListItemType[]>(mockMyPosts);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // 선택한 게시글 ID에 해당하는 상세 데이터를 조회한다.
  const selectedPost =
    selectedPostId !== null ? mockPostDetail[selectedPostId] : null;

  // 정렬 기준별로 화면 제목을 연결한다.

  // 게시글을 삭제한 뒤 목록에서 제거하고 상세 모달을 닫는다.
  function handlePostDelete(postId: number) {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId),
    );

    setSelectedPostId(null);
  }

  return (
    <O.PageContainer>
      <O.Content>
        <O.Title>내가 쓴 글</O.Title>

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
          totalPages={1}
          onChange={setCurrentPage}
        />
      </O.Content>
    </O.PageContainer>
  );
}

export default MyPostsPage;
