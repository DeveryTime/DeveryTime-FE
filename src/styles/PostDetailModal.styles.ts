import styled from "@emotion/styled";
import { colors } from "../designToken/colors";

const DetailDialog = styled.dialog`
  width: 875px;
  height: calc(100vh - 48px);
  max-height: 1028px;

  margin: auto;
  padding: 0;
  border: none;
  background-color: ${colors.gray[0]};

  position: relative;
  overflow: hidden;

  &::backdrop {
    background-color: ${colors.alpha.black45};
  }

  display: grid;
  &[open] {
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
  }
`;

const ModalScrollArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
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
  color: ${colors.gray[600]};
  font-size: 14px;
`;

const DefaultProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${colors.gray[100]};

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
  top: 50px;
  left: 740px;
  font-size: 14px;
  background-color: ${colors.gray[50]};
  color: ${colors.gray[700]};
  border-radius: 10px;
  padding: 10px 16px;
`;

const ReactionBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 13px;
  border-top: 10px solid ${colors.gray[200]};
  margin-top: auto;
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
  padding-bottom: 2px;
  padding-right: 2px;
`;

const CommentCount = styled.span`
  display: inline-block;
  font-size: 20px;
  font-weight: 500;
  padding-bottom: 5px;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid ${colors.gray[200]};
`;

const CommentItem = styled.article`
  padding: 10px;
  border-bottom: 1px solid ${colors.gray[200]};
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
  background-color: ${colors.gray[100]};

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
  color: ${colors.gray[500]};
  font-weight: 500;
`;

const CommentDefaultProfileImage = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${colors.gray[100]};

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
`;

const KebabIcon = styled.img`
  width: 16px;
  height: 16px;
  display: block;
`;

const ReportPopoverLink = styled.a`
  display: block;
  position: absolute;
  z-index: 10;
  background-color: ${colors.gray[0]};
  box-shadow: 0.1px 0.1px 0.1px 1px ${colors.gray[1000]};
  border-radius: 10px;
  width: 209px;
  padding: 20px 123px 20px 16px;

  top: 75px;
  right: 45px;

  &:hover {
    background-color: ${colors.red[50]};
    color: ${colors.red[600]};
  }
`;

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  gap: 12px;

  width: 100%;
  padding: 16px 18px;
  border-top: 1px solid ${colors.gray[200]};
  box-sizing: border-box;
  background-color: ${colors.gray[0]};

  z-index: 20;
  flex-shrink: 0;
`;

const CommentInput = styled.input`
  flex: 1;
  height: 42px;
  padding: 0 16px;

  border: none;
  border-radius: 999px;
  outline: none;

  background-color: ${colors.gray[100]};
  color: ${colors.gray[950]};
  font-size: 16px;

  &::placeholder {
    color: ${colors.gray[600]};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${colors.primary[500]};
  }
`;

const CommentSubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;
  flex-shrink: 0;

  color: ${colors.gray[950]};

  &:disabled {
    color: ${colors.gray[400]};
    cursor: not-allowed;
  }
`;

const CommentMenuArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const CommentButton = styled.button`
  display: flex;
  align-items: center;
  padding-top: 2px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const CommentMenuPopover = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 20;

  display: flex;
  flex-direction: column;

  width: 209px;
  padding: 6px;

  background-color: ${colors.gray[0]};
  border: 1px solid ${colors.gray[200]};
  border-radius: 10px;
  box-shadow: 0 4px 12px ${colors.alpha.black12};
`;

const CommentMenuPopoverLink = styled.a`
  display: block;
  width: 100%;
  padding: 12px 16px;

  color: ${colors.gray[950]};
  text-align: left;
  white-space: nowrap;
  border-radius: 6px;

  &:hover {
    color: ${colors.red[600]};
    background-color: ${colors.red[50]};
  }
`;

const CommentDeleteButton = styled.button`
  width: 100%;
  padding: 12px 16px;

  border: none;
  border-radius: 6px;
  background-color: transparent;

  color: ${colors.gray[950]};
  font: inherit;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: ${colors.red[600]};
    background-color: ${colors.red[50]};
  }
`;

const CommentEditButton = styled.button`
  width: 100%;
  padding: 12px 16px;

  border: none;
  border-radius: 6px;
  background-color: transparent;

  color: ${colors.gray[950]};
  font: inherit;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: ${colors.blue[50]};
    color: ${colors.blue[600]};
  }
`;

const CommentEditArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
`;

const CommentEditTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: 1px solid ${colors.gray[200]};
  box-sizing: border-box;
  border-radius: 8px;
  font: inherit;
  resize: none;
  &:focus {
    border-color: ${colors.primary[500]};
    outline: none;
  }
`;

const CommentEditActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
  width: 100%;
`;

const CommentEditCancelButton = styled.button`
  padding: 8px 14px;
  border: 1px solid ${colors.gray[200]};
  background-color: ${colors.gray[0]};
  color: ${colors.gray[700]};
  font: inherit;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray[50]};
  }
`;

const CommentEditSaveButton = styled.button`
  padding: 8px 14px;
  border: none;
  background-color: ${colors.primary[500]};
  color: ${colors.gray[0]};
  border-radius: 12px;
  font: inherit;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${colors.primary[600]};
  }

  &:disabled {
    background-color: ${colors.primary[300]};
    cursor: not-allowed;
  }
`;

const PostMenuPopover = styled.div`
  position: absolute;
  z-index: 20;
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 6px;
  background-color: ${colors.gray[0]};
  border: 1px solid ${colors.gray[200]};
  border-radius: 10px;
  box-shadow: 0px 4px 12px ${colors.alpha.black12};
  top: calc(100% + 8px);
  right: 5px;
`;

const PostMenuArea = styled.div`
  position: relative;
  margin-left: auto;

  display: flex;
  align-items: center;
`;

const PostDetailModalStyles = {
  DetailDialog,
  CloseButton,
  PostHeader,
  ProfileImage,
  PostTitle,
  PostContent,
  ContentImage,
  DetailContent,
  WriterInfo,
  WriterName,
  PostMeta,
  DefaultProfileImage,
  ImageList,
  CategoryLabel,
  ReactionBar,
  LikeCount,
  LikeButton,
  CommentInfo,
  CommentImage,
  CommentCount,
  CommentList,
  CommentItem,
  CommentHeader,
  CommentProfile,
  CommentAuthor,
  CommentBody,
  CommentDateCreatedAt,
  CommentDefaultProfileImage,
  PostMenuButton,
  KebabIcon,
  ReportPopoverLink,
  CommentSubmitButton,
  CommentInput,
  CommentForm,
  CommentMenuArea,
  CommentButton,
  CommentMenuPopover,
  CommentMenuPopoverLink,
  CommentDeleteButton,
  CommentEditButton,
  CommentEditArea,
  CommentEditTextarea,
  CommentEditActions,
  CommentEditCancelButton,
  CommentEditSaveButton,
  PostMenuPopover,
  PostMenuArea,
  ModalScrollArea,
};

export default PostDetailModalStyles;
