import NavBar from "./components/nav/nav-bar";
import "./designToken/globalStyle";
import { GlobalStyle } from "./designToken/globalStyle";
import PostMainPage from "./features/posts/pages/PostMainPage";
import Landing from "./pages/landing-page";

function App() {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <PostMainPage />
        <Landing />
    </>
  );
}

export default App;
