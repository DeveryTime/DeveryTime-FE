/** @jsxImportSource @emotion/react */

import {
  postCategory,
  postContent,
  postDate,
  postItem,
  postList,
  postNumber,
  sectionTitle,
  wrContainer,
} from "./info-container.style";

import arrowIcon from "../../icons/arrowIcon.svg";
import { useState } from "react";

type Post = {
  id: number;
  category: string;
  title: string;
  createdAt: string;
};

const InfoContainer = () => {
  const [posts] = useState<Post[]>([
    {
      id: 1,
      category: "일상",
      title: "오늘 학교 급식 맛있었나요?",
      createdAt: "2026-09-09",
    },
    {
      id: 2,
      category: "교과",
      title: "이번 주 시험 일정 정리",
      createdAt: "2026-09-08",
    },
    {
      id: 3,
      category: "전공",
      title: "프론트엔드 공부 어떻게 시작하나요?",
      createdAt: "2026-09-07",
    },
    {
      id: 4,
      category: "일상",
      title: "동아리 활동 같이 하실 분!",
      createdAt: "2026-09-06",
    },
    {
      id: 5,
      category: "일상",
      title: "학교 행사 일정 알려드립니다",
      createdAt: "2026-09-05",
    },
  ]);

  const recentPosts = [...posts]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div css={wrContainer}>
      <div css={sectionTitle}>
        <p>내가 쓴 글</p> <img src={arrowIcon} alt="이동" />{" "}
      </div>
      <div css={postList}>
        {recentPosts.map((post, index) => (
          <div css={postItem} key={post.id}>
            <p css={postNumber}>{index + 1}</p>
            <p css={postCategory}>{post.category}</p>
            <p css={postContent}>{post.title}</p>
            <p css={postDate}>{post.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoContainer;
