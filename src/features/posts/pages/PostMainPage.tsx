import { useEffect, useState } from "react";
import PostSortMenu from "../components/PostSortMenu";
import PostTable from "../components/PostTable";
import PostPagination from "../components/PostPagination";
import type { PostDetailResponse, PostSort, PostTableItem } from "../types/post";
import D from "../../../styles/PostMainPage.styles";
import PostDetailModal from "../components/PostDetailModal";
import { PAGE_SIZE } from "../../../constants/pagination";
import { deletePost, getPost, getPosts } from "../../../api/postsApi";

function PostMainPage() {
  // 현재 선택된 정렬 기준, 페이지, 게시글 목록, 상세 게시글을 관리한다.
  const [selectedSort, setSelectedSort] = useState<PostSort>("likes");
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
  const [reloadKey, setReloadKey] = useState(0);

  // 정렬 기준별로 화면 제목을 연결한다.
  const sortTitles: Record<PostSort, string> = {
    likes: "인기순",
    latest: "최신순",
    views: "조회순",
  };

  // 정렬 기준과 페이지가 바뀌면 서버에서 해당 목록을 다시 조회한다.
  useEffect(() => {
    let isActive = true;

    async function fetchPosts() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getPosts({
          page: currentPage - 1,
          size: PAGE_SIZE,
          sort: selectedSort,
        });

        if (!isActive) {
          return;
        }

        setPosts(
          response.content.map((post, index) => ({
            id: post.id,
            number: response.page * response.size + index + 1,
            category: post.category,
            title: post.title,
            createdAt: post.createdAt,
          })),
        );
        setTotalPages(Math.max(1, response.totalPages));
      } catch {
        if (isActive) {
          setError("게시글을 불러오지 못했습니다.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void fetchPosts();

    return () => {
      isActive = false;
    };
  }, [currentPage, reloadKey, selectedSort]);

  // 표의 게시글을 선택하면 상세 정보를 조회한다.
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

  // 삭제 성공 후 현재 목록을 갱신하고 상세 모달을 닫는다.
  async function handlePostDelete(postId: number) {
    try {
      await deletePost(postId);
      setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== postId),
      );
      setSelectedPost(null);
      setReloadKey((current) => current + 1);
    } catch {
      setDetailError("게시글을 삭제하지 못했습니다.");
    }
  }

  // 수정 성공 후 목록 제목과 열린 상세 게시글을 함께 갱신한다.
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
    // 정렬 메뉴, 게시글 목록, 상세 모달, 페이지네이션을 배치한다.
      <D.PageContainer>
      <D.SortMenuArea>
        <PostSortMenu
          selectedSort={selectedSort}
          onChange={(sort) => {
            setSelectedSort(sort);
            setCurrentPage(1);
          }}
        />
      </D.SortMenuArea>

      <D.Content>
        {/* 현재 정렬 기준에 따른 게시글 목록 제목 */}
        <D.Title>{sortTitles[selectedSort]}</D.Title>

        {isLoading && <p>게시글을 불러오는 중입니다...</p>}
        {error && <p role="alert">{error}</p>}

        {!isLoading && !error && (
          <PostTable posts={posts} onPostClick={handlePostClick} />
        )}

        {isDetailLoading && <p>게시글 상세 정보를 불러오는 중입니다...</p>}
        {detailError && <p role="alert">{detailError}</p>}

        {/* 게시글을 선택했을 때만 상세 모달을 표시한다. */}
        {selectedPost && (
          <PostDetailModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            onDelete={handlePostDelete}
            onUpdate={handlePostUpdate}
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
