import styled from "@emotion/styled";

const PageContainer = styled.main`
  display: grid;
  grid-template-columns: 130px 1293px;
  column-gap: 56px;
  align-items: start;

  width: 1479px;
  margin: 108px auto 0;
`;

// 정렬 메뉴를 테이블 시작 높이에 맞춤
const SortMenuArea = styled.aside`
  margin-top: 78px;
`;

const Content = styled.section`
  width: 1293px;
`;

const Title = styled.h1`
  margin: 0 0 16px;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.3;
`;

const PostMainPage = {
  PageContainer,
  Content,
  SortMenuArea,
  Title,
};

export default PostMainPage;
