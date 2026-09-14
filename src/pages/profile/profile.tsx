/** @jsxImportSource @emotion/react */

import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

import NavBar from "../../components/nav/nav-bar";

import {
  Id,
  menu,
  nameInput,
  profileContainer,
  profileImage,
  profileLayout,
  profileTitle,
  saveBtn,
  userIdEmail,
  userInfo,
  userName,
} from "./profile.style";

type User = {
  name: string;
  schoolNumber: string;
  username: string;
  email: string;
  profileImageUrl: string;
};

const Profile = () => {
  const navigate = useNavigate();
  // 로그아웃
  const Logout = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");

    toast.success("로그아웃되었습니다.");
    navigate("/login");
  };
  // 백엔드 연결 전 사용할 임시 사용자 데이터
  const [user, setUser] = useState<User | null>({
    name: "정우영",
    schoolNumber: "20241234",
    username: "hong123",
    email: "[hong@example.com](mailto:hong@example.com)",
    profileImageUrl: "https://via.placeholder.com/150",
  });

  // 수정할 아이디
  const [username, setUsername] = useState("hong123");

  //아이디 변경 판단 기능
  const canSave = username.trim() !==user?.username && Boolean(user) && username.trim().length <= 10 && username.trim().length > 0;

  

  // 새로 선택한 프로필 이미지
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  // 숨겨진 파일 input을 직접 클릭하기 위한 ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 이미지 변경
  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 사용자가 선택한 첫 번째 파일 가져오기
    const file = e.target.files?.[0];
    // 파일이 존재하면 새 프로필 이미지로 저장
    if (file) {
      setNewProfileImage(file);
    }
  };

  // 저장하기
  const handleSave = () => {
    // 백엔드 연결 전에는 일단 저장 성공 메시지만 표시
    const trimmedUsername = username.trim();

    if (!trimmedUsername||trimmedUsername.length === 0) {
      toast.error("아이디를 입력해주세요");

      return;
    } else if (trimmedUsername.length > 10) {
      toast.error("아이디는 1 ~ 10글자 이내로 입력해주세요");

      return;
    }

    if(!user) return;


    setUser((prevUser) => {
    if (!prevUser) return prevUser;

    return {
      ...prevUser,
      username: trimmedUsername,
    };
  });

  setUsername(trimmedUsername);
  toast.success("변경사항이 저장되었습니다.");




    /*
    // 나중에 백엔드 연결 시 사용할 코드

    try {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("deleteProfileImage", "false");

      if (newProfileImage) {
        formData.append("profileImage", newProfileImage);
      }

      await axios.patch("백엔드 API", formData);

      alert("변경사항이 저장되었습니다.");
    } catch (error) {
      console.log(error);
    }
    */
  };

  return (
    <>
      <NavBar />
      <div css={profileLayout}>
        {/* 왼쪽 메뉴 */}
        <div css={menu}>
          <p>내 정보</p>
          <p>내가 쓴 글</p>
          <p className="active">프로필 수정</p>
          <p onClick={Logout}>로그아웃</p>
        </div>

        {/* 프로필 수정 영역 */}
        <div css={profileContainer}>
          <p css={profileTitle}>프로필 수정</p>

          {/* 사용자 정보 */}
          {user && (
            <div css={userInfo}>
              {/* 프로필 이미지 */}
              <img
                css={profileImage}
                src={
                  newProfileImage
                    ? URL.createObjectURL(newProfileImage)
                    : user.profileImageUrl
                }
                onClick={() => fileInputRef.current?.click()}
                alt=" "
              />

              {/* 숨겨진 이미지 선택 input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={imageChange}
              />

              <div>
                <p css={userName}>
                  {user.name} | {user.schoolNumber}
                </p>
                <p css={userIdEmail}>{user.username}</p>
                <p css={userIdEmail}>{user.email}</p>
              </div>
            </div>
          )}

          {/* 아이디 수정 */}
          <div>
            <p css={Id}>아이디</p>

            <input
              css={nameInput}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="10글자 이내로 입력해 주세요"
            />
          </div>

          {/* 저장 버튼 */}
          <button css={saveBtn} onClick={handleSave} disabled={!canSave}>
            변경사항 저장
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
