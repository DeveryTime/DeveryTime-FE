import NavBar from "./components/nav/nav-bar";
import "./designToken/globalStyle";
import { GlobalStyle } from "./designToken/globalStyle";
import PostMainPage from "./features/posts/pages/PostMainPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <PostMainPage />
    </>
  );
}

export default App;
