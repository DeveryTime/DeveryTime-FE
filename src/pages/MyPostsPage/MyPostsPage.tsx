import { useEffect, useState } from "react";
import postsApi from "../../api/posts.api";
import PAGE_SIZE from "../../constants/pagination";
import S from "./MyPostsPage.styles";
import PostDetailModal from "../../components/posts/PostDetailModal/PostDetailModal";
import PostPagination from "../../components/posts/PostPagination/PostPagination";
import PostTable from "../../components/posts/PostTable/PostTable";
import type { PostDetailData, PostTableItem } from "../../types/posts.types";

const MyPostsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostTableItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostDetailData | null>(
    null,
  );
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  // 현재 페이지의 내가 쓴 글을 API에서 조회한다.
  useEffect(() => {
    let isActive = true;

    const fetchMyPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await postsApi.getMyPosts({
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
    };

    void fetchMyPosts();

    return () => {
      isActive = false;
    };
  }, [currentPage]);

  // 표에서 게시글을 선택하면 상세 API를 조회해 기존 모달을 연다.
  const handlePostClick = async (postId: number) => {
    setIsDetailLoading(true);
    setDetailError(null);

    try {
      const postDetail = await postsApi.getPost(postId);
      setSelectedPost(postDetail);
    } catch {
      setDetailError("게시글 상세 정보를 불러오지 못했습니다.");
    } finally {
      setIsDetailLoading(false);
    }
  };

  // 게시글 삭제 API 성공 후 현재 목록에서도 해당 게시글을 제거한다.
  const handlePostDelete = async (postId: number, userId: number) => {
    try {
      await postsApi.deletePost(postId, userId);
      setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== postId),
      );
      setSelectedPost(null);
    } catch {
      setDetailError("게시글을 삭제하지 못했습니다.");
    }
  };

  // 수정 성공 후 목록의 제목과 열린 상세 게시글을 함께 갱신한다.
  const handlePostUpdate = (
    postId: number,
    title: string,
    content: string,
  ) => {
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
  };

  return (
    <S.PageContainer>
      <S.Content>
        <S.Title>내가 쓴 글</S.Title>

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
            isMyPost
          />
        )}
      </S.Content>
    </S.PageContainer>
  );
}

export default MyPostsPage;
