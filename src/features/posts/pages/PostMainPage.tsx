import { useState, useEffect } from "react";
import PostSortMenu from "../components/PostSortMenu";
import PostTable from "../components/PostTable";
import PostPagination from "../components/PostPagination";
import type {
  PostTableItem,
  PostSort,
  PostDetailResponse,
} from "../types/post";
import styled from "@emotion/styled";
import PostDetailModal from "../components/PostDetailModal";
import { deletePost, getPosts, getPost } from "../../../api/postsApi";
import { PAGE_SIZE } from "../../../constants/pagination";

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
  const [posts, setPosts] = useState<PostTableItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  // 선택한 게시글 ID에 해당하는 상세 데이터를 조회한다.
  const [selectedPost, setSelectedPost] = useState<PostDetailResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  // 정렬 기준별로 화면 제목을 연결한다.
  const sortTitles: Record<PostSort, string> = {
    likes: "인기순",
    latest: "최신순",
    views: "조회순",
  };

  // 게시글을 삭제한 뒤 목록에서 제거하고 상세 모달을 닫는다.
  async function handlePostDelete(postId: number) {
    try {
      await deletePost(postId);

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== postId),
      );
    } catch {
      setError("게시글을 삭제하지 못했습니다.");
    }

    setSelectedPostId(null);
  }

  async function handlePostUpdate(
    postId: number,
    title: string,
    content: string,
  ) {
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
  function handleSortChange(sort: PostSort) {
    setSelectedSort(sort);
    setCurrentPage(1);
  }

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getPosts({
          page: currentPage - 1,
          size: PAGE_SIZE,
          sort: selectedSort,
        });

        const tablePosts = response.content.map((post, index) => ({
          id: post.id,
          number: response.page * response.size + index + 1,
          category: post.category,
          title: post.title,
          createdAt: post.createdAt,
        }));

        setPosts(tablePosts);
        setTotalPages(response.totalPages);
      } catch {
        setError("게시글을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [currentPage, selectedSort, setError]);

  useEffect(() => {
    if (selectedPostId === null) {
      return;
    }

    const postId = selectedPostId;

    async function fetchDetailPost() {
      setIsDetailLoading(true);
      setDetailError(null);
      try {
        const postDetail = await getPost(postId);
        setSelectedPost(postDetail);
      } catch {
        setDetailError("게시글을 조회하지 못했습니다.");
      } finally {
        setIsDetailLoading(false);
      }
    }
    fetchDetailPost();
  }, [selectedPostId]);
  return (
    // 정렬 메뉴, 게시글 목록, 상세 모달, 페이지네이션을 배치한다.
    <PageContainer>
      <SortMenuArea>
        <PostSortMenu selectedSort={selectedSort} onChange={handleSortChange} />
      </SortMenuArea>

      <Content>
        {/* 현재 정렬 기준에 따른 게시글 목록 제목 */}
        <Title>{sortTitles[selectedSort]}</Title>

        {/* 게시글 목록 */}
        {isLoading && <p>게시글을 불러오는 중입니다 </p>}

        {!isLoading && error && <p role="alert"> {error} </p>}

        {!isLoading && !error && (
          <PostTable posts={posts} onPostClick={setSelectedPostId} />
        )}

        {isDetailLoading && <p> 게시글을 불러오는 중입니다.</p>}

        {!isDetailLoading && detailError && <p role="alert">{detailError}</p>}

        {/* 게시글을 선택했을 때만 상세 모달을 표시한다. */}
        {!isDetailLoading &&
          !detailError &&
          selectedPostId !== null &&
          selectedPost && (
            <PostDetailModal
              post={selectedPost}
              onClose={() => setSelectedPostId(null)}
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
      </Content>
    </PageContainer>
  );
}

export default PostMainPage;
