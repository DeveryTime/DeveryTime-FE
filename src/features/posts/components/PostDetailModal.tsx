import type { PostDetailResponse } from "../types/post";
import { useState, useRef, useEffect, type FormEvent } from "react";
import S from "../../../styles/PostDetailModal.styles";
import { X, UserRound, SendHorizontal } from "lucide-react";
import commentIcon from "../../../assets/icons/comment.svg";
import likeDefaultIcon from "../../../assets/icons/Like.svg";
import likeActiveIcon from "../../../assets/icons/Like-active.svg";
import KebabMenu from "../../../assets/icons/Kebab-menu.svg";
import type { PostComment } from "../types/post";

interface PostDetailModalProps {
  post: PostDetailResponse;
  onClose: () => void;
  onDelete: (postId: number) => void;
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

function PostDetailModal({ post, onClose, onDelete }: PostDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // 좋아요 상태와 게시글의 좋아요 개수를 관리한다.
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // 게시글 메뉴와 댓글 메뉴의 열림 상태를 관리한다.
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
  const [openCommentMenuId, setOpenCommentMenuId] = useState<number | null>(
    null,
  );

  // 댓글 목록과 댓글 입력값을 관리한다.
  const [comments, setComments] = useState<PostComment[]>([]);
  const [commentText, setCommentText] = useState("");

  // 댓글 수정 모드와 수정 중인 댓글 내용을 관리한다.
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  // 게시글 수정 모드 여부를 관리한다.
  const [isPostEditing, setIsPostEditing] = useState(false);
  const [editingPostTitle, setEditingPostTitle] = useState("");
  const [editingPostContent, setEditingPostContent] = useState("");

  // 현재 로그인한 사용자의 ID라고 가정한 값이다.
  const currentUserId = 1;

  // 좋아요 버튼을 클릭하면 좋아요 상태와 개수를 함께 변경한다.
  function handleLikeClick() {
    if (isLiked === false) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount((previous) => Math.max(0, previous - 1));
    }
    setIsLiked((previous) => !previous);
  }

  // 댓글을 삭제하고 열려 있던 댓글 메뉴를 닫는다.
  function handleCommentDelete(commentId: number) {
    setComments((currentComments) =>
      currentComments.filter((comment) => comment.id !== commentId),
    );

    setOpenCommentMenuId(null);
  }

  // 댓글 수정 모드를 시작하고 기존 댓글 내용을 입력창에 넣는다.
  function handleCommentEditStart(comment: PostComment) {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.content);

    setOpenCommentMenuId(null);
  }

  // 댓글 수정 모드를 취소하고 수정 관련 상태를 초기화한다.
  function handleCommentEditCancel() {
    setEditingCommentId(null);
    setEditingCommentText("");
  }

  function handlePostEditCancel() {
    setEditingPostTitle(post.title);
    setEditingPostContent(post.content);
    setIsPostEditing(false);
  }

  // 수정된 댓글 내용을 목록에 반영한다.
  function handleCommentEditSave(commentId: number) {
    const trimmedEditComment = editingCommentText.trim();

    if (trimmedEditComment === "") {
      return;
    }

    setComments((editComments) =>
      editComments.map((editComment) =>
        editComment.id === commentId
          ? { ...editComment, content: trimmedEditComment }
          : editComment,
      ),
    );
    handleCommentEditCancel();
  }

  // 게시글 수정 모드를 시작하고 게시글 메뉴를 닫는다.
  function handlePostEditStart() {
    setEditingPostTitle(post.title);
    setEditingPostContent(post.content);
    setIsPostEditing(true);
    setIsPostMenuOpen(false);
  }

  // 모달이 처음 렌더링되면 다이얼로그를 화면에 표시한다.
  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  // 댓글 작성 폼을 제출해 새 댓글을 목록에 추가한다.
  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedComment = commentText.trim();
    if (trimmedComment === "") {
      return;
    }

    const nowComment: PostComment = {
      id: Date.now(),
      userId: 1,
      authorName: "엉뚱한 너굴이",
      profileImageUrl: null,
      content: trimmedComment,
      createdAt: new Date().toISOString(),
    };

    setComments((previous) => [...previous, nowComment]);

    setCommentText("");
  };

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
              <S.PostTitle id="post-detail-title"> 게시글 수정 중 </S.PostTitle>

              <S.PostEditTitleInput
                value={editingPostTitle}
                onChange={(e) => setEditingPostTitle(e.target.value)}
                aria-label="게시글 제목"
              />

              <S.PostEditActions>
                <S.PostEditCancelButton
                  type="button"
                  onClick={handlePostEditCancel}
                >
                  취소
                </S.PostEditCancelButton>
              </S.PostEditActions>
            </S.PostEditForm>
          ) : (
            <>
              <S.PostTitle id="post-detail-title"> {post.title} </S.PostTitle>
              <S.PostContent> {post.content} </S.PostContent>
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
          >
            <img src={isLiked ? likeActiveIcon : likeDefaultIcon} alt="" />
            <S.LikeCount>{likeCount}</S.LikeCount>
          </S.LikeButton>

          <S.CommentInfo>
            <S.CommentImage src={commentIcon} alt="" />
            <S.CommentCount> {comments.length} </S.CommentCount>
          </S.CommentInfo>
        </S.ReactionBar>
        {/* 댓글 목록과 댓글별 메뉴 */}
        <S.CommentList>
          {comments.map((comment) => (
            <S.CommentItem key={comment.id}>
              <S.CommentHeader>
                <S.CommentAuthor>
                  {comment.profileImageUrl ? (
                    <S.CommentProfile src={comment.profileImageUrl} alt="" />
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
                      {currentUserId !== comment.userId && (
                        <S.CommentMenuPopoverLink
                          href="https://docs.google.com/forms/d/e/1FAIpQLSdZfb16smuoFx3K4JUiB-dqX5hKLywfr2FcyAI4KqWuSYdLZg/viewform"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          신고하기
                        </S.CommentMenuPopoverLink>
                      )}
                      {currentUserId === comment.userId && (
                        <>
                          <S.CommentDeleteButton
                            type="button"
                            onClick={() => handleCommentDelete(comment.id)}
                            aria-label="댓글 삭제"
                          >
                            삭제하기
                          </S.CommentDeleteButton>
                          <S.CommentEditButton
                            type="button"
                            onClick={() => handleCommentEditStart(comment)}
                          >
                            {" "}
                            수정하기{" "}
                          </S.CommentEditButton>
                        </>
                      )}
                    </S.CommentMenuPopover>
                  )}
                </S.CommentMenuArea>
              </S.CommentHeader>
              {editingCommentId === comment.id ? (
                <S.CommentEditArea>
                  <S.CommentEditTextarea
                    autoFocus
                    placeholder="댓글 수정"
                    value={editingCommentText}
                    onChange={(e) => setEditingCommentText(e.target.value)}
                    aria-label="댓글 수정 내용"
                  />

                  <S.CommentEditActions>
                    <S.CommentEditCancelButton
                      type="button"
                      onClick={handleCommentEditCancel}
                    >
                      {" "}
                      취소
                    </S.CommentEditCancelButton>
                    <S.CommentEditSaveButton
                      type="button"
                      onClick={() => handleCommentEditSave(comment.id)}
                      disabled={!editingCommentText.trim()}
                    >
                      {" "}
                      저장{" "}
                    </S.CommentEditSaveButton>
                  </S.CommentEditActions>
                </S.CommentEditArea>
              ) : (
                <S.CommentBody> {comment.content} </S.CommentBody>
              )}
            </S.CommentItem>
          ))}
        </S.CommentList>
      </S.ModalScrollArea>
      {/* 댓글 입력 폼 */}
      <S.CommentForm onSubmit={handleCommentSubmit}>
        <S.CommentInput
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="댓글"
          type="text"
          aria-label="댓글 내용"
        />

        <S.CommentSubmitButton
          type="submit"
          disabled={!commentText.trim()}
          aria-label="댓글 등록"
        >
          <SendHorizontal size={28} aria-hidden="true" />
        </S.CommentSubmitButton>
      </S.CommentForm>
    </S.DetailDialog>
  );
}

export default PostDetailModal;
