import "./App.css";
import SearchNavbar from "./Components/SearchNavbar/SearchNavbar";
import UserList from "./Components/SearchNavbar/UserList/UserList";

function App() {
  return (
    <>
      <div>
        {/* Navbar to look good only */}
        <SearchNavbar />
        {/* main component */}
        <UserList />
      </div>
    </>
  );
}

export default App;
