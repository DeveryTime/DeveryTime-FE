import { useEffect, useState } from "react";
import { getMyPosts, getPost, deletePost } from "../../../api/postsApi";
import { PAGE_SIZE } from "../../../constants/pagination";
import O from "../../../styles/MyPostsPage.styles";
import PostDetailModal from "../components/PostDetailModal";
import PostPagination from "../components/PostPagination";
import PostTable from "../components/PostTable";
import type { PostDetailResponse, PostTableItem } from "../types/post";

function MyPostsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostTableItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostDetailResponse | null>(
    null,
  );
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  // 현재 페이지의 내가 쓴 글을 API에서 조회한다.
  useEffect(() => {
    let isActive = true;

    async function fetchMyPosts() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getMyPosts({
          page: currentPage - 1,
          size: PAGE_SIZE,
        });

        if (!isActive) {
          return;
        }

        const tablePosts = response.content.map((post, index) => ({
          id: post.id,
          number: response.page * response.size + index + 1,
          category: post.category,
          title: post.title,
          createdAt: post.createdAt,
        }));

        setPosts(tablePosts);
        setTotalPages(Math.max(1, response.totalPages));
      } catch {
        if (isActive) {
          setError("내가 쓴 글을 불러오지 못했습니다.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void fetchMyPosts();

    return () => {
      isActive = false;
    };
  }, [currentPage]);

  // 표에서 게시글을 선택하면 상세 API를 조회해 기존 모달을 연다.
  async function handlePostClick(postId: number) {
    setIsDetailLoading(true);
    setDetailError(null);

    try {
      const postDetail = await getPost(postId);
      setSelectedPost(postDetail);
    } catch {
      setDetailError("게시글 상세 정보를 불러오지 못했습니다.");
    } finally {
      setIsDetailLoading(false);
    }
  }

  // 게시글 삭제 API 성공 후 현재 목록에서도 해당 게시글을 제거한다.
  async function handlePostDelete(postId: number) {
    try {
      await deletePost(postId);
      setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== postId),
      );
      setSelectedPost(null);
    } catch {
      setDetailError("게시글을 삭제하지 못했습니다.");
    }
  }

  // 수정 성공 후 목록의 제목과 열린 상세 게시글을 함께 갱신한다.
  function handlePostUpdate(postId: number, title: string, content: string) {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, title } : post,
      ),
    );
    setSelectedPost((currentPost) =>
      currentPost && currentPost.id === postId
        ? { ...currentPost, title, content }
        : currentPost,
    );
  }

  return (
    <O.PageContainer>
      <O.Content>
        <O.Title>내가 쓴 글</O.Title>

        {isLoading && <p>내가 쓴 글을 불러오는 중입니다...</p>}
        {error && <p role="alert">{error}</p>}

        {!isLoading && !error && (
          <>
            <PostTable posts={posts} onPostClick={handlePostClick} />

            <PostPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={setCurrentPage}
            />
          </>
        )}

        {isDetailLoading && <p>게시글 상세 정보를 불러오는 중입니다...</p>}
        {detailError && <p role="alert">{detailError}</p>}

        {selectedPost && (
          <PostDetailModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            onDelete={handlePostDelete}
            onUpdate={handlePostUpdate}
            isLikeEnabled={false}
          />
        )}
      </O.Content>
    </O.PageContainer>
  );
}

export default MyPostsPage;
