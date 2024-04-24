import "./App.css";
import DCASimulator from "./components/organisms/DCASimulator/DCASimulator.tsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>DCC Simulator</p>
        <DCASimulator />
      </header>
    </div>
  );
}

export default App;
