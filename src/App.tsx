import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./designToken/globalStyle";
import { SearchPage } from "./page/search-page";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <SearchPage />
    </BrowserRouter>
  );
}

export default App;
