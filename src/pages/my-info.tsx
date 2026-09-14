/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import NavBar from "../components/nav/nav-bar";
import InfoContainer from "../components/info/info-container";
import {
  infoContainer,
  infoLayout,
  infoTitle,
  menu,
  profileImage,
  rightContainer,
  userIdEmail,
  userInfo,
  userName,
} from "./my-info.style";
import axios from "axios";

type User = {
  profileImageUrl: string;
  name: string;
  schoolNumber: number;
  userName: string;
  email: string;
};

const Info = () => {
  const [user, setUser] = useState<User | null>({
    name: "홍길동",
    schoolNumber: 1206,
    userName: "dkfjslej",
    email: "hong@example.com",
    profileImageUrl: "",
  });

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const response = await axios.get("백엔드 API");

  //       setUser(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getUser();
  // }, []);

  return (
    <>
      <NavBar />

      <div css={infoLayout}>
        <div css={menu}>
          <p className="active">내 정보</p>
          <p>내가 쓴 글</p>
          <p>프로필 수정</p>
          <p>로그아웃</p>
        </div>

        <div css={rightContainer}>
          <div css={infoContainer}>
            <p css={infoTitle}>내 정보</p>

            {user && (
              <div css={userInfo}>
                <img css={profileImage} src={user.profileImageUrl} />

                <div>
                  <p css={userName}>
                    {user.name} | {user.schoolNumber}
                  </p>
                  <p css={userIdEmail}>{user.userName}</p>
                  <p css={userIdEmail}>{user.email}</p>
                </div>
              </div>
            )}
          </div>
          <InfoContainer />
        </div>
      </div>
    </>
  );
};

export default Info;
