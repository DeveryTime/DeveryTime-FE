// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BackgroundLayer } from "./BackgroundActStyle";
// import { Background } from "./BackgroundAct";
// import { ContentLayer } from "./BackgroundActStyle";
// import { InputBox } from "../components";

// import {
//   FindPasswordWrapper,
//   CardBox,
//   Title,
//   Button
// } from "./FindPasswordStyle";

// export const FindPassword = () => {
//   const navigate = useNavigate();

//   const [schoolNumber, setSchoolNumber] = useState<string>("");
//   const [name, setName] = useState<string>("");
//   const [username, setUsername] = useState<string>("");

//   const handleNext = () => {
//     // 학번 검사
//     if (schoolNumber === "") {
//       alert("학번을 입력해주세요.");
//       return;
//     }

//     if (!/^\d{4}$/.test(schoolNumber)) {
//       alert("자신의 현재 4자리 학번을 입력해주세요.");
//       return;
//     }

//     // 이름 검사
//     if (name === "") {
//       alert("이름을 입력해주세요.");
//       return;
//     }

//     if (!/^[가-힣]+$/.test(name)) {
//       alert("이름은 한글로 입력해주세요.");
//       return;
//     }

//     if (name.length > 30) {
//       alert("이름은 30자 이하로 입력해주세요.");
//       return;
//     }

//     // 아이디 검사
//     if (username === "") {
//       alert("아이디를 입력해주세요.");
//       return;
//     }

//     if (username.length > 10) {
//       alert("아이디는 10자 이하로 입력해주세요.");
//       return;
//     }

//     navigate("/signup/page2");
//   };

//   return (
//     <FindPasswordWrapper>
//       <BackgroundLayer>
//         <Background />
//       </BackgroundLayer>
//       <ContentLayer>
//         <CardBox>
//           <Title>회원가입</Title>

//           <InputBox
//             placeholder="학번"
//             value={schoolNumber}
//             onChange={(e) => setSchoolNumber(e.target.value)}
//           />

//           <InputBox
//             placeholder="이름"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <InputBox
//             placeholder="아이디"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <Button onClick={handleNext}>다음</Button>

//         </CardBox>
//       </ContentLayer>
//     </FindPasswordWrapper>
//   );
// };
