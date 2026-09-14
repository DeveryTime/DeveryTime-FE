import "./designToken/globalStyle";
import { GlobalStyle } from "./designToken/globalStyle";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/profile/profile";

function App() {
  return (
    <>
      <GlobalStyle />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
        }}
      />
      <Profile />
    </>
  );
}

export default App;
