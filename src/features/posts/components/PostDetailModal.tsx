import type { PostDetailResponse } from "../types/post";
import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { X, UserRound } from "lucide-react";
import { mockPostComments } from "../data/mockPosts";
import commentIcon from "../../../assets/icons/comment.svg";
import likeDefaultIcon from "../../../assets/icons/Like.svg";
import likeActiveIcon from "../../../assets/icons/Like-active.svg";
import KebabMenu from "../../../assets/icons/Kebab-menu.svg";

interface PostDetailModalProps {
  post: PostDetailResponse;
  onClose: () => void;
}

const DetailDialog = styled.dialog`
  width: 875px;
  min-height: 1028px;

  margin: auto;
  padding: 0;
  border: none;
  background-color: #ffffff;

  position: relative;
  overflow-y: auto;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.45);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;

  border-radius: 50%;
  object-fit: cover;
`;

const PostTitle = styled.h2`
  margin-top: 35px;
  font-size: 32px;
  font-weight: 700;
  word-break: break-word;
`;

const PostContent = styled.p`
  margin-top: 40px;
  line-height: 1.6;

  white-space: pre-wrap;

  overflow-wrap: anywhere;
`;

const ContentImage = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;

const DetailContent = styled.div`
  padding: 40px;
`;

const WriterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const WriterName = styled.strong`
  font-weight: 600;
`;

const PostMeta = styled.span`
  color: #777777;
  font-size: 14px;
`;

const DefaultProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #eeeeee;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ImageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

const CategoryLabel = styled.span`
  display: inline-block;
  position: absolute;
  top: 45px;
  left: 740px;
  font-size: 14px;
  background-color: #f5f5f5;
  color: #555555;
  border-radius: 10px;
  padding: 10px 16px;
`;

const ReactionBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 13px;
  border-top: 10px solid #e5e5e5;
  padding-top: 9px;
  padding-left: 8px;
  padding-bottom: 8px;
`;

const LikeCount = styled.span`
  font-size: 20px;
  font-weight: 500;
  padding-top: 3px;
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 13px;
  padding-top: 4px;
`;

const CommentImage = styled.img`
  padding-bottom: 4px;
`;

const CommentCount = styled.span`
  font-size: 20px;
  font-weight: 500;
  padding-bottom: 2px;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid #e5e5e5;
`;

const CommentItem = styled.article`
  padding: 10px;
  border-bottom: 1px solid #e5e5e5;
  flex-direction: column;
  display: flex;
  gap: 4px;
`;

const CommentHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
`;

const CommentProfile = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #eeeeee;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  font-size: 16px;
  font-weight: 700;
`;

const CommentBody = styled.p`
  padding-top: 7px;
  padding-left: 13px;
  font-size: 18px;
`;

const CommentDateCreatedAt = styled.p`
  font-size: 18px;
  color: #999999;
  font-weight: 500;
`;

const CommentDefaultProfileImage = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #eeeeee;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const PostMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 58px;
  right: 35px;
`;

const KebabIcon = styled.img`
  width: 16px;
  height: 16px;
  display: block;
`;

const ReportPopover = styled.div`
  position: absolute;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0.1px 0.1px 0.1px 1px #000000;
  border-radius: 10px;
  width: 209px;
  padding: 20px 123px 20px 16px;

  top: 75px;
  right: 43px;
`;



function formatPostDate(dateString: string) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function CommentDate(dateString: string) {
  const setCommentDate = new Date(dateString);

  return new Intl.DateTimeFormat("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })
    .format(setCommentDate)
    .replace(/\.$/, "")
    .replace(/\.$/, "");
}

function PostDetailModal({ post, onClose }: PostDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);

  function handleLikeClick() {
    if (isLiked === false) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount((previous) => Math.max(0, previous - 1));
    }
    setIsLiked((previous) => !previous);
  }

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  return (
    <DetailDialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="post-detail-title"
    >
      <CloseButton
        type="button"
        onClick={() => dialogRef.current?.close()}
        aria-label="게시글 상세 닫기"
      >
        <X aria-hidden="true" />
      </CloseButton>

      <CategoryLabel> {post.category.name} </CategoryLabel>

      <DetailContent>
        <PostHeader>
          {post.writer.profileImageUrl ? (
            <ProfileImage src={post.writer.profileImageUrl} alt="" />
          ) : (
            <DefaultProfileImage>
              <UserRound aria-hidden="true" />
            </DefaultProfileImage>
          )}
          <WriterInfo>
            <WriterName> {post.writer.nickname} </WriterName>
            <PostMeta>
              {formatPostDate(post.createdAt)} - {post.viewCount} 조회
            </PostMeta>
          </WriterInfo>
          <PostMenuButton
            type="button"
            aria-label="게시글 메뉴"
            onClick={() => setIsPostMenuOpen((previous) => !previous)}
            aria-expanded="true"
          >
            <KebabIcon src={KebabMenu} alt="" />
          </PostMenuButton>
          {isPostMenuOpen && (
            <ReportPopover>
              <a href="#"> 신고하기 </a>
            </ReportPopover>
          )}
        </PostHeader>

        <PostTitle id="post-detail-title"> {post.title} </PostTitle>
        <PostContent> {post.content} </PostContent>
        {post.images.length > 0 && (
          <ImageList>
            {[...post.images]
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((image) => (
                <ContentImage
                  key={image.id}
                  src={image.imageUrl}
                  alt={`${post.title} 첨부된 이미지`}
                />
              ))}
          </ImageList>
        )}
      </DetailContent>
      <ReactionBar>
        <LikeButton
          type="button"
          onClick={handleLikeClick}
          aria-pressed={isLiked}
          aria-label={isLiked ? "좋아요 취소" : "좋아요"}
        >
          <img src={isLiked ? likeActiveIcon : likeDefaultIcon} alt="" />
          <LikeCount>{likeCount}</LikeCount>
        </LikeButton>

        <CommentInfo>
          <CommentImage src={commentIcon} alt="" />
          <CommentCount> {mockPostComments.length} </CommentCount>
        </CommentInfo>
      </ReactionBar>
      <CommentList>
        {mockPostComments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentHeader>
              <CommentAuthor>
                {comment.profileImageUrl ? (
                  <CommentProfile src={comment.profileImageUrl} alt="" />
                ) : (
                  <CommentDefaultProfileImage>
                    <UserRound aria-hidden="true" />
                  </CommentDefaultProfileImage>
                )}
                {comment.authorName}
              </CommentAuthor>
              <CommentDateCreatedAt>
                {CommentDate(comment.createdAt)}
              </CommentDateCreatedAt>
            </CommentHeader>
            <CommentBody> {comment.content}</CommentBody>
          </CommentItem>
        ))}
      </CommentList>
    </DetailDialog>
  );
}

export default PostDetailModal;
