/** @jsxImportSource @emotion/react */
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

import logoIcon from "../../icons/logoIcon.svg";
import profile from "../../icons/profile.svg";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [signUp, setSignUp] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setSignUp(true);
    }
  }, []);

  // 백엔드가 아직 없으므로 일단 주석 처리
  /*
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch("백엔드 주소");

        const data = await response.json();

        setProfileImage(data.data.profileImage);
      } catch (error) {
        console.error("프로필 정보를 불러오지 못했습니다.", error);
      }
    };

    if (signUp) {
      getProfile(); 
    }
  }, [signUp]);
  */

  const handleSearch = () => {
    if (!searchValue.trim()) return;

    navigate(`/search?keyword=${encodeURIComponent(searchValue)}`);
  };

  return (
    <nav css={navStyle}>
      <div css={navGap}>
        <div css={logo}>
          <img src={logoIcon} alt="Devery time 로고" />
          <div css={logoName}>Devery time</div>
        </div>

        <div css={search}>
          <input
            css={searchInput}
            type="text"
            placeholder="키워드로 게시글을 검색해보세요"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
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
            aria-hidden="true"
            onClick={handleSearch}
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

        <div>
          {signUp ? (
            <img src={profileImage || profile} alt="프로필" />
          ) : (
            <button css={login}>로그인</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
