import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { IoClose, IoImageOutline, IoLinkOutline } from "react-icons/io5";
import axios from "axios";
import { createPostApi } from "../../api/Postapi";
import type { CreatePostErrorResponse } from "../../api/Postapi";

import {
  ModalOverlay,
  EditorWrapper,
  Header,
  Title,
  CloseButton,
  Toolbar,
  ToolButton,
  Divider,
  TitleInput,
  ContentArea,
  Footer,
  ImageButton,
  SubmitButton,
} from "./PostEditorStyle";

interface PostEditorProps {
  onClose: () => void;
  categoryId: number;
}

export const PostEditor = ({ onClose, categoryId }: PostEditorProps) => {
  const [title, setTitle] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,

      Link.configure({
        openOnClick: false,
        autolink: true,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Image,
    ],

    content: "",

    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  });

  if (!editor) {
    return null;
  }

  //링크추가
  const handleLink = (): void => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt(
      "링크를 입력해주세요.",
      previousUrl || "https://",
    );

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().unsetLink().run();

      return;
    }

    editor
      .chain()
      .focus()
      .setLink({
        href: url,
      })
      .run();
  };

  //이미지 추가, 현재는 이미지 URL을 입력하는 방식

  const handleImage = (): void => {
    const url = window.prompt("이미지 URL을 입력해주세요.");

    if (!url) {
      return;
    }

    editor
      .chain()
      .focus()
      .setImage({
        src: url,
      })
      .run();
  };

  //게시글작성
  const handleSubmit = async (): Promise<void> => {
    if (title.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    if (editor.isEmpty) {
      alert("게시글 내용을 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      //Tiptap HTML을 문자열로 변환

      const content: string = editor.getHTML();

      //게시글 작성 API

      const res = await createPostApi({
        categoryId,
        title: title.trim(),
        content,
        status: "PUBLISHED",
      });

      console.log("게시글 작성 결과:", res);

      alert("게시글이 작성되었습니다.");

      onClose();
    } catch (error: unknown) {
      console.error(error);

      if (axios.isAxiosError<CreatePostErrorResponse>(error)) {
        const errorResponse = error.response?.data;

        if (errorResponse) {
          const errorCode = errorResponse.error.code;

          if (errorCode === "VALIDATION_ERROR") {
            alert("게시글 입력 형식이 올바르지 않습니다.");
          } else if (errorCode === "USER_NOT_FOUND") {
            alert("사용자를 찾을 수 없습니다.");
          } else if (errorCode === "CATEGORY_NOT_FOUND") {
            alert("게시판을 찾을 수 없습니다.");
          } else {
            alert(errorResponse.error.message);
          }
        } else {
          alert("서버와 통신할 수 없습니다.");
        }
      } else {
        alert("게시글 작성 중 알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay onMouseDown={onClose}>
      <EditorWrapper onMouseDown={(e) => e.stopPropagation()}>
        {/* 상단 */}
        <Header>
          <Title>글쓰기</Title>

          <CloseButton type="button" onClick={onClose}>
            <IoClose />
          </CloseButton>
        </Header>

        {/* 제목 */}
        <TitleInput
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 툴바 */}
        <Toolbar>
          {/* 굵게 */}
          <ToolButton
            type="button"
            $active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <strong>B</strong>
          </ToolButton>

          {/* 기울임 */}
          <ToolButton
            type="button"
            $active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <em>I</em>
          </ToolButton>

          {/* 밑줄 */}
          <ToolButton
            type="button"
            $active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <u>U</u>
          </ToolButton>

          {/* 취소선 */}
          <ToolButton
            type="button"
            $active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <s>S</s>
          </ToolButton>

          <Divider />

          {/* 왼쪽 정렬 */}
          <ToolButton
            type="button"
            $active={editor.isActive({
              textAlign: "left",
            })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            ≡
          </ToolButton>

          {/* 가운데 정렬 */}
          <ToolButton
            type="button"
            $active={editor.isActive({
              textAlign: "center",
            })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            ≡
          </ToolButton>

          {/* 오른쪽 정렬 */}
          <ToolButton
            type="button"
            $active={editor.isActive({
              textAlign: "right",
            })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            ≡
          </ToolButton>

          <Divider />

          {/* 순서 없는 목록 */}
          <ToolButton
            type="button"
            $active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            •
          </ToolButton>

          {/* 순서 있는 목록 */}
          <ToolButton
            type="button"
            $active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            1.
          </ToolButton>

          {/* 인용 */}
          <ToolButton
            type="button"
            $active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            ❝
          </ToolButton>

          {/* 링크 */}
          <ToolButton
            type="button"
            $active={editor.isActive("link")}
            onClick={handleLink}
          >
            <IoLinkOutline />
          </ToolButton>
        </Toolbar>

        {/* 본문 */}
        <ContentArea>
          <EditorContent editor={editor} />
        </ContentArea>

        {/* 하단 */}
        <Footer>
          <ImageButton type="button" onClick={handleImage}>
            <IoImageOutline />
          </ImageButton>

          <SubmitButton
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "게시 중..." : "게시"}
          </SubmitButton>
        </Footer>
      </EditorWrapper>
    </ModalOverlay>
  );
};
