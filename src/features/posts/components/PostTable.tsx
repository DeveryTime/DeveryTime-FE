import type { PostListItemType } from "../types/post";
import G from "../../../styles/PostTable.styles";

interface PostTableProps {
  posts: PostListItemType[];
  onPostClick: (postId: number) => void;
}

function PostTable({ posts, onPostClick }: PostTableProps) {
  return (
    // 게시글 번호, 카테고리, 제목, 작성일을 표 형태로 표시한다.
    <G.Table>
      <thead>
        <tr>
          <G.TableHeader> 번호 </G.TableHeader>
          <G.TableHeader> 카테고리 </G.TableHeader>
          <G.TableHeader> 제목 </G.TableHeader>
          <G.TableHeader> 작성일</G.TableHeader>
        </tr>
      </thead>

      <tbody>
        {posts.map((post) => (
          // 행을 클릭하면 선택한 게시글의 ID를 부모 컴포넌트에 전달한다.
          <G.TableRow key={post.id} onClick={() => onPostClick(post.id)}>
            <G.TableCell> {post.number} </G.TableCell>
            <G.TableCell> {post.category} </G.TableCell>
            <G.TableCell> {post.title} </G.TableCell>
            <G.TableCell> {post.createdAt} </G.TableCell>
          </G.TableRow>
        ))}
      </tbody>
    </G.Table>
  );
}

export default PostTable;
