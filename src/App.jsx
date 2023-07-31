import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "react-bootstrap";
import SearchNavbar from "./Components/SearchNavbar/SearchNavbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <SearchNavbar />
      </div>
    </>
  );
}

export default App;
