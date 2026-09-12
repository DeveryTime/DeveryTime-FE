/** @jsxImportSource @emotion/react */
import { Zoom } from "react-awesome-reveal";
import {
  backgroundCss,
  starCss,
  panda1Css,
  panda2Css,
  glitterCss,
  panda3Css,
  starCss2,
  panda4Css,
} from "./panda.style";

import panda1 from "../../icons/panda1.svg";
import panda2 from "../../icons/panda2.svg";
import panda3 from "../../icons/panda3.svg";
import panda4 from "../../icons/panda4.svg";
import glitter from "../../icons/glitter.svg";
import star from "../../icons/Star.svg";

const PandaMotion = () => {
  return (
    <div css={backgroundCss}>
      <Zoom triggerOnce duration={600} fraction={1} css={starCss}>
        <img src={star} alt="star" />
      </Zoom>

      <Zoom triggerOnce duration={600} fraction={1} delay={600} css={panda1Css}>
        <img src={panda1} alt="panda" />
      </Zoom>

      <Zoom triggerOnce duration={600} fraction={1} css={panda2Css}>
        <img src={panda2} alt="panda" />
      </Zoom>
      <Zoom triggerOnce duration={600} fraction={1} css={panda3Css}>
        <img src={panda3} alt="panda" />
      </Zoom>

      <Zoom
        triggerOnce
        duration={600}
        fraction={1}
        delay={700}
        css={glitterCss}
      >
        <img src={glitter} alt="glitter" />
      </Zoom>
      <Zoom triggerOnce duration={600} fraction={1} css={starCss2}>
        <img src={star} alt="star" />
      </Zoom>

      <Zoom triggerOnce duration={600} fraction={1} delay={600} css={panda4Css}>
        <img src={panda4} alt="panda" />
      </Zoom>
    </div>
  );
};

export default PandaMotion;
