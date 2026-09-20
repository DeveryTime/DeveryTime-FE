import { useEffect, useState } from "react";
import I from "../../../styles/CategoryPage.styles";

import PostSortMenu from "../components/PostSortMenu";
import PostTable from "../components/PostTable";
import PostPagination from "../components/PostPagination";
import PostDetailModal from "../components/PostDetailModal";

import type {
  PostDetailResponse,
  PostSort,
  PostTableItem,
} from "../types/post";
import { PAGE_SIZE } from "../../../constants/pagination";
import { deletePost, getPost, getPosts } from "../../../api/postsApi";

interface CategoryPageProps {
  categoryId: number;
  categoryName: string;
}

function CategoryPage({ categoryId, categoryName }: CategoryPageProps) {
  const [selectedSort, setSelectedSort] = useState<PostSort>("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostTableItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] =
    useState<PostDetailResponse | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  // 카테고리, 정렬 기준, 페이지가 바뀌면 서버 목록을 다시 조회한다.
  useEffect(() => {
    let isActive = true;

    async function fetchCategoryPosts() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getPosts({
          page: currentPage - 1,
          size: PAGE_SIZE,
          sort: selectedSort,
          categoryId,
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
          setError("카테고리 게시글을 불러오지 못했습니다.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void fetchCategoryPosts();

    return () => {
      isActive = false;
    };
  }, [categoryId, currentPage, reloadKey, selectedSort]);

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

  //게시글 삭제 함수
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

  //수정 성공한 후에 상태 갱신하는 로직
  function handlePostUpdate(postId: number, title: string, content: string) {
    setPosts((currentPage) =>
      currentPage.map((currentPost) =>
        currentPost.id === postId ? { ...currentPost, title } : currentPost,
      ),
    );

    setSelectedPost((currentPost) =>
        currentPost && currentPost.id === postId
        ? { ...currentPost, title, content }
        : currentPost,
    );
  }

  return (
    <I.PageContainer>
      <I.SortMenuArea>
        <PostSortMenu
          selectedSort={selectedSort}
          onChange={(sort) => {
            setSelectedSort(sort);
            setCurrentPage(1);
          }}
        />
      </I.SortMenuArea>

      <I.Content>
        <I.Title>{categoryName}</I.Title>
        <I.Description>{categoryName} 전공 게시판입니다.</I.Description>
        <I.CategoryMeta>게시글 {posts.length}개</I.CategoryMeta>

        {isLoading && <p>카테고리 게시글을 불러오는 중입니다...</p>}
        {error && <p role="alert">{error}</p>}

        {!isLoading && !error && posts.length > 0 ? (
          <PostTable posts={posts} onPostClick={handlePostClick} />
        ) : (
          !isLoading &&
          !error && (
            <I.EmptyMessage role="status">
              아직 등록된 게시글이 없습니다.
            </I.EmptyMessage>
          )
        )}

        {isDetailLoading && <p>게시글 상세 정보를 불러오는 중입니다...</p>}
        {detailError && <p role="alert">{detailError}</p>}

        {selectedPost && (
          <PostDetailModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            onDelete={handlePostDelete}
            onUpdate={handlePostUpdate}
          />
        )}

        {!isLoading && !error && (
          <PostPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        )}
      </I.Content>
    </I.PageContainer>
  );
}

export default CategoryPage;
