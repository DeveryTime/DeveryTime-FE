export interface PostListItemType {
  id: number;
  number: number;
  category: string;
  title: string;
  createdAt: string;
} //임시로 쓰는 데이터 타입 선언 해놓기

export type PostSort = "popular" | "latest" | "views"; //문자 리터럴 유니온 타입(String Literal Union Type)
