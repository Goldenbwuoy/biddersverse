import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import Footer from "./core/Footer";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="app_body">
          <ThemeProvider theme={theme}>
            <MainRouter />
          </ThemeProvider>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
