import GuestNav from "./components/Guest-Nav";
import LoginNav from "./components/Login-Nav";
import "./designToken/globalStyle";
import { GlobalStyle } from "./designToken/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <LoginNav />
    </>
  );
}

export default App;
