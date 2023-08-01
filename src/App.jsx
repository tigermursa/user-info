import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "react-bootstrap";
import SearchNavbar from "./Components/SearchNavbar/SearchNavbar";
import UserList from "./Components/SearchNavbar/UserList/UserList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <SearchNavbar />
        <UserList/>
      </div>
    </>
  );
}

export default App;
