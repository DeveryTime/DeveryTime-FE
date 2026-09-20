import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import S from "../../../styles/PostDetailModal.styles";
import { X, UserRound } from "lucide-react";
import MarkdownEditor from "./MarkdownEditor";
import commentIcon from "../../../assets/icons/comment.svg";
import likeDefaultIcon from "../../../assets/icons/Like.svg";
import likeActiveIcon from "../../../assets/icons/Like-active.svg";
import KebabMenu from "../../../assets/icons/Kebab-menu.svg";
import type {
  PostComment,
  UpdatePostRequest,
  PostDetailResponse,
} from "../types/post";
import {
  getComments,
  likePost,
  unlikePost,
  updatePost,
} from "../../../api/postsApi";

interface PostDetailModalProps {
  post: PostDetailResponse;
  onClose: () => void;
  onDelete: (postId: number) => void;
  onUpdate?: (postId: number, title: string, content: string) => void;
  isLikeEnabled?: boolean;
}

// 게시글 작성일을 상세 모달에 표시할 형식으로 변환한다.
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

// 댓글 작성일을 짧은 날짜 형식으로 변환한다.
function CommentDate(dateString: string) {
  const setCommentDate = new Date(dateString);

  return new Intl.DateTimeFormat("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })
    .format(setCommentDate)
    .replace(/\.$/, "");
}

function PostDetailModal({
  post,
  onClose,
  onDelete,
  onUpdate,
  isLikeEnabled = true,
}: PostDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // 좋아요 상태와 게시글의 좋아요 개수를 관리한다.
  const [isLiked, setIsLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [likeError, setLikeError] = useState<string | null>(null);

  // 게시글 메뉴와 댓글 메뉴의 열림 상태를 관리한다.
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
  const [openCommentMenuId, setOpenCommentMenuId] = useState<number | null>(
    null,
  );

  // API에서 조회한 댓글 목록과 댓글 조회 상태를 관리한다.
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isCommentError, setIsCommentError] = useState<string | null>(null);

  // 게시글 수정 모드 여부를 관리한다.
  const [isPostEditing, setIsPostEditing] = useState(false);
  const [editingPostTitle, setEditingPostTitle] = useState("");
  const [editingPostContent, setEditingPostContent] = useState("");
  const [postUpdateError, setPostUpdateError] = useState<string | null>(null);

  // 현재 로그인한 사용자의 ID라고 가정한 값이다.
  const currentUserId = 1;

  // 좋아요 등록·취소 API를 호출하고 성공했을 때만 화면 상태를 변경한다.
  async function handleLikeClick() {
    if (!isLikeEnabled || isLikeLoading) {
      return;
    }

    setLikeError(null);
    setIsLikeLoading(true);

    try {
      const likeResult = isLiked
        ? await unlikePost(post.id)
        : await likePost(post.id);

      setLikeCount((previous) => {
        if (likeResult.liked === isLiked) {
          return previous;
        }

        return likeResult.liked
          ? previous + 1
          : Math.max(0, previous - 1);
      });
      setIsLiked(likeResult.liked);
    } catch {
      setLikeError("좋아요 처리에 실패했습니다.");
    } finally {
      setIsLikeLoading(false);
    }
  }

  // 게시글 수정 모드를 시작하고 게시글 메뉴를 닫는다.
  function handlePostEditStart() {
    setIsPostEditing(true);
    setIsPostMenuOpen(false);
    setEditingPostTitle(post.title);
    setEditingPostContent(post.content);
    setPostUpdateError(null);
  }

  // 모달이 처음 렌더링되면 다이얼로그를 화면에 표시한다.
  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  // post.id가 마운트 될 때 댓글 목록을 불러오는 코드
  useEffect(() => {
    async function fetchComments() {
      setIsCommentLoading(true);
      setIsCommentError(null);

      try {
        const response = await getComments(post.id);
        setComments(response.data);
      } catch {
        setIsCommentError(" 댓글을 조회하는데 실패하셨습니다. ");
      } finally {
        setIsCommentLoading(false);
      }
    }
    fetchComments();
  }, [post.id]);

  //게시글 수정 저장 함수 로직 
  async function handlePostEditSave() {
    const trimmedPostTitle = editingPostTitle.trim();
    const trimmedPostContent = editingPostContent.trim();

    setPostUpdateError(null);

    if (trimmedPostTitle === "" || trimmedPostContent === "") {
      return;
    }

    const updateData: UpdatePostRequest = {
      userId: post.writer.userId,
      title: trimmedPostTitle,
      content: trimmedPostContent,
    };
    try {
      await updatePost(post.id, updateData);

      onUpdate?.(post.id, trimmedPostTitle, trimmedPostContent);
      setIsPostEditing(false);
    } catch {
      setPostUpdateError(" 게시물을 수정하는데 실패하였습니다. ");
    }
  }


  return (
    <S.DetailDialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="post-detail-title"
    >
      {/* 모달 닫기 버튼 */}
      <S.CloseButton
        type="button"
        onClick={() => dialogRef.current?.close()}
        aria-label="게시글 상세 닫기"
      >
        <X aria-hidden="true" />
      </S.CloseButton>

      {/* 게시글 카테고리 */}
      <S.CategoryLabel> {post.category.name} </S.CategoryLabel>

      <S.ModalScrollArea>
        <S.DetailContent>
          {/* 작성자 정보와 게시글 메뉴 */}
          <S.PostHeader>
            {post.writer.profileImageUrl ? (
              <S.ProfileImage src={post.writer.profileImageUrl} alt="" />
            ) : (
              <S.DefaultProfileImage>
                <UserRound aria-hidden="true" />
              </S.DefaultProfileImage>
            )}
            <S.WriterInfo>
              <S.WriterName> {post.writer.nickname} </S.WriterName>
              <S.PostMeta>
                {formatPostDate(post.createdAt)} - {post.viewCount} 조회
              </S.PostMeta>
            </S.WriterInfo>

            <S.PostMenuArea>
              <S.PostMenuButton
                type="button"
                aria-label="게시글 메뉴"
                onClick={() => setIsPostMenuOpen((previous) => !previous)}
                aria-expanded={isPostMenuOpen}
              >
                <S.KebabIcon src={KebabMenu} alt="" />
              </S.PostMenuButton>

              {isPostMenuOpen && (
                <S.PostMenuPopover>
                  {currentUserId !== post.writer.userId && (
                    <S.ReportPopoverLink
                      href="https://docs.google.com/forms/d/e/1FAIpQLSeLaXHB-Wo9VVqcbNtGBlzQtL5rscli2KoiMpWsRs277_8Qbw/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      신고하기
                    </S.ReportPopoverLink>
                  )}

                  {currentUserId === post.writer.userId && (
                    <>
                      <S.CommentDeleteButton
                        type="button"
                        aria-label="게시글 삭제"
                        onClick={() => onDelete(post.id)}
                      >
                        삭제하기
                      </S.CommentDeleteButton>

                      <S.CommentEditButton
                        type="button"
                        aria-label="게시글 수정"
                        onClick={handlePostEditStart}
                      >
                        수정하기
                      </S.CommentEditButton>
                    </>
                  )}
                </S.PostMenuPopover>
              )}
            </S.PostMenuArea>
          </S.PostHeader>

          {/* 게시글 본문 또는 게시글 수정 화면 */}
          {isPostEditing ? (
            <S.PostEditForm>
              <S.PostTitle id="post-detail-title">게시글 수정</S.PostTitle>

              <S.PostEditTitleInput
                value={editingPostTitle}
                onChange={(event) => setEditingPostTitle(event.target.value)}
                aria-label="게시글 제목"
              />

              <MarkdownEditor
                value={editingPostContent}
                onChange={setEditingPostContent}
              />

              {postUpdateError && <p role="alert">{postUpdateError}</p>}

              <S.PostEditActions>
                <S.PostEditCancelButton
                  type="button"
                  onClick={() => {
                    setEditingPostTitle(post.title);
                    setEditingPostContent(post.content);
                    setIsPostEditing(false);
                  }}
                >
                  취소
                </S.PostEditCancelButton>

                <S.PostEditSaveButton
                  type="button"
                  onClick={handlePostEditSave}
                  disabled={
                    !editingPostTitle.trim() || !editingPostContent.trim()
                  }
                >
                  저장
                </S.PostEditSaveButton>
              </S.PostEditActions>
            </S.PostEditForm>
          ) : (
            <>
              <S.PostTitle id="post-detail-title"> {post.title} </S.PostTitle>
              <S.PostContent>
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </S.PostContent>
              {post.images.length > 0 && (
                <S.ImageList>
                  {[...post.images]
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((image) => (
                      <S.ContentImage
                        key={image.id}
                        src={image.imageUrl}
                        alt={`${post.title} 첨부된 이미지`}
                      />
                    ))}
                </S.ImageList>
              )}
            </>
          )}
        </S.DetailContent>

        {/* 좋아요와 댓글 개수 */}
        <S.ReactionBar>
          <S.LikeButton
            type="button"
            onClick={handleLikeClick}
            aria-pressed={isLiked}
            aria-label={isLiked ? "좋아요 취소" : "좋아요"}
            disabled={!isLikeEnabled || isLikeLoading}
          >
            <img src={isLiked ? likeActiveIcon : likeDefaultIcon} alt="" />
            <S.LikeCount>{likeCount}</S.LikeCount>
          </S.LikeButton>

          <S.CommentInfo>
            <S.CommentImage src={commentIcon} alt="" />
            <S.CommentCount> {comments.length} </S.CommentCount>
          </S.CommentInfo>
        </S.ReactionBar>
        {likeError && <p role="alert">{likeError}</p>}
        {/* 댓글 목록과 댓글별 메뉴 */}
        <S.CommentList>
          {isCommentLoading && <p> 댓글을 불러오는 중입니다... </p>}

          {!isCommentLoading && !isCommentError && (
            <>
              {comments.map((comment) => (
                <S.CommentItem key={comment.id}>
                  <S.CommentHeader>
                    <S.CommentAuthor>
                      {comment.profileImageUrl ? (
                        <S.CommentProfile
                          src={comment.profileImageUrl}
                          alt=""
                        />
                      ) : (
                        <S.CommentDefaultProfileImage>
                          <UserRound aria-hidden="true" />
                        </S.CommentDefaultProfileImage>
                      )}
                      {comment.authorName}
                    </S.CommentAuthor>

                    <S.CommentMenuArea>
                      <S.CommentDateCreatedAt>
                        {CommentDate(comment.createdAt)}
                      </S.CommentDateCreatedAt>

                      {currentUserId !== comment.userId && (
                        <>
                          <S.CommentButton
                            type="button"
                            aria-label="댓글 메뉴"
                            onClick={() =>
                              setOpenCommentMenuId((previous) =>
                                previous === comment.id ? null : comment.id,
                              )
                            }
                            aria-expanded={openCommentMenuId === comment.id}
                          >
                            <S.KebabIcon src={KebabMenu} alt="" />
                          </S.CommentButton>
                          {openCommentMenuId === comment.id && (
                            <S.CommentMenuPopover>
                              <S.CommentMenuPopoverLink
                                href="https://docs.google.com/forms/d/e/1FAIpQLSdZfb16smuoFx3K4JUiB-dqX5hKLywfr2FcyAI4KqWuSYdLZg/viewform"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                신고하기
                              </S.CommentMenuPopoverLink>
                            </S.CommentMenuPopover>
                          )}
                        </>
                      )}
                    </S.CommentMenuArea>
                  </S.CommentHeader>
                  <S.CommentBody> {comment.content} </S.CommentBody>
                </S.CommentItem>
              ))}
            </>
          )}
          {isCommentError && <p role="alert"> {isCommentError} </p>}
        </S.CommentList>
      </S.ModalScrollArea>
    </S.DetailDialog>
  );
}

export default PostDetailModal;
