/** @jsxImportSource @emotion/react */
import { Slide } from "react-awesome-reveal";
import {
  startBtn,
  text1Css,
  text2Css,
  text3Css,
  text4Css,
  textCss,
} from "./text.style";

const Text = () => {
  return (
    <>
      <div css={textCss}>
        <div css={text1Css}>
          <Slide triggerOnce direction="right" duration={700} fraction={1}>
            <div>
              DSM 소통의 길 <br /> 데브리타임에 온걸 환영해요!{" "}
            </div>
          </Slide>
        </div>

        <div css={text2Css}>
          <Slide triggerOnce direction="right" duration={700} fraction={1}>
            <div>
              데브리타임은 DSM 학생들을 위한
              <br />
              교내 커뮤니티 서비스예요.
            </div>
          </Slide>
        </div>

        <div css={text3Css}>
          <Slide triggerOnce direction="right" duration={700} fraction={1}>
            <div>
              전공, 일상, 분실물 등 카테고리
              <br />
              별로 글을 읽고 쓸 수 있어요.
            </div>
          </Slide>
        </div>

        <div css={text4Css}>
          <Slide triggerOnce direction="right" duration={700} fraction={1}>
            <div>
              데브리타임,
              <br />
              그럼 시작해볼까요?
            </div>
          </Slide>
        </div>
      </div>

      <div css={startBtn}>시작하기</div>
    </>
  );
};

export default Text;
