import type { PostListItemType } from "../types/post";
import G from "../../../styles/PostTable.styles";

interface PostTableProps {
  posts: PostListItemType[];
  onPostClick: (postId: number) => void;
}

function PostTable({ posts, onPostClick }: PostTableProps) {
  return (
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
