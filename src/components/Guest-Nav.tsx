import { navStyle } from "./guest-nav.styles";
import { cateGory } from "./guest-nav.styles";
import { login } from "./guest-nav.styles";
import { logo } from "./guest-nav.styles";

const GuestNav = () => {
  return (
    <nav css={navStyle}>
      <div css={logo}>로고</div>
      <div css={cateGory}>
        <div>전공</div>
        <div>일상</div>
        <div>교과</div>
        <div>급식</div>
        <div>프로젝트</div>
        <div>기숙사</div>
        <div>분실물</div>
        <div css={login}>로그인</div>
      </div>
    </nav>
  );
};

export default GuestNav;
