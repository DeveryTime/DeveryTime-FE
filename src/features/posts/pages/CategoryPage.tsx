import { useState } from "react";
import I from "../../../styles/CategoryPage.styles";

import PostSortMenu from "../components/PostSortMenu";
import PostTable from "../components/PostTable";
import PostPagination from "../components/PostPagination";
import PostDetailModal from "../components/PostDetailModal";

import { mockPosts, mockPostDetail } from "../data/mockPosts";
import type { PostSort } from "../types/post";

interface CategoryPageProps {
  categoryId: number;
  categoryName: string;
}

const postsPerPage = 10;

function parseMockDate(dateString: string) {
  const [year, month, day] = dateString.split(".").map(Number);
  return new Date(year, month - 1, day).getTime();
}

function CategoryPage({ categoryId, categoryName }: CategoryPageProps) {
  const [selectedSort, setSelectedSort] = useState<PostSort>("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(mockPosts);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // 현재 카테고리에 해당하는 게시글만 남긴다.
  const filteredPosts = posts.filter((post) => post.categoryId === categoryId);

  // sort는 원본 배열을 바꾸므로 복사본을 만든 뒤 정렬한다.
  const sortedPosts = [...filteredPosts];

  if (selectedSort === "likes") {
    sortedPosts.sort((firstPost, secondPost) =>
      secondPost.likeCount - firstPost.likeCount,
    );
  } else if (selectedSort === "views") {
    sortedPosts.sort((firstPost, secondPost) =>
      secondPost.viewCount - firstPost.viewCount,
    );
  } else {
    sortedPosts.sort(
      (firstPost, secondPost) =>
        parseMockDate(secondPost.createdAt) -
        parseMockDate(firstPost.createdAt),
    );
  }

  const totalPages = Math.max(
    1,
    Math.ceil(sortedPosts.length / postsPerPage),
  );

  const pageToRender = Math.min(currentPage, totalPages);

  const visiblePosts = sortedPosts.slice(
    (pageToRender - 1) * postsPerPage,
    pageToRender * postsPerPage,
  );

  const selectedPost =
    selectedPostId !== null &&
    filteredPosts.some((post) => post.id === selectedPostId)
      ? mockPostDetail[selectedPostId]
      : null;

  function handlePostDelete(postId: number) {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId),
    );
    setSelectedPostId(null);
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
        <I.CategoryMeta>게시글 {filteredPosts.length}개</I.CategoryMeta>

        {visiblePosts.length > 0 ? (
          <PostTable posts={visiblePosts} onPostClick={setSelectedPostId} />
        ) : (
          <I.EmptyMessage role="status">
            아직 등록된 게시글이 없습니다.
          </I.EmptyMessage>
        )}

        {selectedPost && (
          <PostDetailModal
            post={selectedPost}
            onClose={() => setSelectedPostId(null)}
            onDelete={handlePostDelete}
          />
        )}

        {sortedPosts.length > 0 && (
          <PostPagination
            currentPage={pageToRender}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        )}
      </I.Content>
    </I.PageContainer>
  );
}

export default CategoryPage;
