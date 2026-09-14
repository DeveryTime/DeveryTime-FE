import "./designToken/globalStyle";
import { GlobalStyle } from "./designToken/globalStyle";
import { Toaster } from "react-hot-toast";
import Info from "./pages/my-info";

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
      <Info />
    </>
  );
}

export default App;
