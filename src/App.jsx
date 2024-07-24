import Calendar from "./components/Calendar";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <img src="/Logo.svg" />
      </header>
      <main>
        <Calendar />
      </main>
      <footer>
        <span>Made by </span>
        <a target="_blank" href="https://github.com/rubenolander">
          Ruben Olander
        </a>
      </footer>
    </>
  );
}

export default App;
