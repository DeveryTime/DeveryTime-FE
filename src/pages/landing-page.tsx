import Background from "../components/background/background";
import PandaMotion from "../components/landing-panda/panda";
import Text from "../components/landing-text/text";

const Landing = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <div style={{ position: "relative", zIndex: 5 }}>
        <Background />
      </div>

      <div style={{ position: "absolute", inset: 0, zIndex: 6 }}>
        <PandaMotion />
        <Text />
      </div>
    </div>
  );
};

export default Landing;
