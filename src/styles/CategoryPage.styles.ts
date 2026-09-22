import styled from "@emotion/styled";
import { colors } from "../designToken/colors";

const PageContainer = styled.main`
  display: grid;
  grid-template-columns: 130px minmax(0, 1fr);
  column-gap: 56px;

  width: min(1479px, calc(100% - 48px));
  margin: 108px auto 0;
`;

const SortMenuArea = styled.aside`
  margin-top: 78px;
`;

const Content = styled.section`
  min-width: 0;
  overflow-x: auto;
`;

const Title = styled.h1`
  margin-bottom: 8px;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 600;
  line-height: 1.3;
`;

const Description = styled.p`
  margin-bottom: 8px;
  color: ${colors.gray[600]};
  font-size: 16px;
`;

const CategoryMeta = styled.p`
  margin-bottom: 24px;
  color: ${colors.gray[600]};
  font-size: 14px;
`;

const EmptyMessage = styled.div`
  padding: 100px 0;
  background: ${colors.gray[0]};
  color: ${colors.gray[600]};
  text-align: center;
`;

const CategoryPageStyles = {
  EmptyMessage,
  CategoryMeta,
  Description,
  Title,
  Content,
  SortMenuArea,
  PageContainer,
};

export default CategoryPageStyles;
