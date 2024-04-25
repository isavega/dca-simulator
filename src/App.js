import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import DCASimulator from "./components/organisms/DCASimulator/DCASimulator.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <p>DCC Simulator</p>
          <DCASimulator />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
