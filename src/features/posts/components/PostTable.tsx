import type { PostListItemType } from "../types/post";
import styled from "@emotion/styled";

// 게시글 목록 테이블의 레이아웃과 번호·카테고리·제목·작성일 열의 너비 설정
const Table = styled.table`
  width: 1293px;
  height: 611px;
  table-layout: fixed;
  border-collapse: collapse;

  //첫번째 열: 게시글 번호
  th:nth-of-type(1),
  td:nth-of-type(1) {
    width: 12%;
  }

  //두번째 열: 카테고리
  th:nth-of-type(2),
  td:nth-of-type(2) {
    width: 20%;
  }

  //세번째 열 : 게시글 제목
  th:nth-of-type(3),
  td:nth-of-type(3) {
    width: 48%;
  }

  //네번째 열: 작성일
  th:nth-of-type(4),
  td:nth-of-type(4) {
    width: 20%;
  }
`;

interface PostTableProps {
  posts: PostListItemType[];
}

const TableHeader = styled.th`
  padding: 6px 8px;
  border-top: 1px solid #000000;
  text-align: left;
  font-weight: 500;
`;

const TableCell = styled.td`
  padding: 8px;
  border: none;
  text-align: left;
`;

function PostTable({ posts }: PostTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeader> 번호 </TableHeader>
          <TableHeader> 카테고리 </TableHeader>
          <TableHeader> 제목 </TableHeader>
          <TableHeader> 작성일</TableHeader>
        </tr>
      </thead>

      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <TableCell> {post.number} </TableCell>
            <TableCell> {post.category} </TableCell>
            <TableCell> {post.title} </TableCell>
            <TableCell> {post.createdAt} </TableCell>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default PostTable;
