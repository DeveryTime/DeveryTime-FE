import {
  logoName,
  logo,
  navStyle,
  navGap,
  search,
  searchIcon,
  searchInput,
  login,
  cateGory,
  navCatalog,
} from "./nav-bar.styles";
import logoIcon from "../icons/logoIcon.svg";
import profile from "../icons/profile.svg";

import { useState } from "react";

const NavBar = () => {
  const [signUp, setSignUp] = useState(ture);
  return (
    <nav css={navStyle}>
      <div css={navGap}>
        <div css={logo}>
          <img src={logoIcon} alt="Devery time 로고"></img>
          <div css={logoName}>Devery time</div>
        </div>
        <div css={search}>
          <input
            css={searchInput}
            type="text"
            placeholder="키워드로 게시글을 검색해보세요"
          />
          <svg
            css={searchIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search-icon lucide-search"
            aria-hidden="true"
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
        </div>
      </div>
      <div css={navCatalog}>
        <div css={cateGory}>
          <div>전공</div>
          <div>일상</div>
          <div>교과</div>
          <div>급식</div>
          <div>프로젝트</div>
          <div>기숙사</div>
          <div>분실물</div>
        </div>

        <div css={login}>
          {signUp ? "로그인" : <img src={profile} alt="프로필"></img>}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
