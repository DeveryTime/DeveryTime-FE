import { useState } from "react";
import O from "../../../styles/MyPostsPages.styles";
import PostTable from "./PostTable";
import PostPagination from "./PostPagination";
import PostDetailModal from "./PostDetailModal";
import { mockMyPosts, mockPostDetail } from "../data/mockPosts";
import type { PostListItemType } from "../types/post";

function MyPostsPage() {
  // 내가 쓴 글 목록과 현재 페이지를 관리한다.
  const [posts, setPosts] = useState<PostListItemType[]>(mockMyPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // 선택한 게시글의 상세 데이터를 조회한다.
  const selectedPost =
    selectedPostId !== null ? mockPostDetail[selectedPostId] : null;

  // 게시글을 삭제한 뒤 목록에서 제거하고 상세 모달을 닫는다.
  function handlePostDelete(postId: number) {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId),
    );
    setSelectedPostId(null);
  }

  return (
    // 내가 쓴 글 제목, 게시글 목록, 상세 모달, 페이지네이션을 배치한다.
    <O.PageContainer>
      <O.Content>
        <O.Title>내가 쓴 글</O.Title>

        {/* 내가 쓴 글 목록 */}
        <PostTable posts={posts} onPostClick={setSelectedPostId} />

        {/* 게시글을 선택했을 때만 상세 모달을 표시한다. */}
        {selectedPost && (
          <PostDetailModal
            post={selectedPost}
            onClose={() => setSelectedPostId(null)}
            onDelete={handlePostDelete}
          />
        )}

        {/* 내가 쓴 글 페이지 이동 */}
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
