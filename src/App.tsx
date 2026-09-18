import "./designToken/globalStyle";
import { GlobalStyle } from "./designToken/globalStyle";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router.tsx";

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
