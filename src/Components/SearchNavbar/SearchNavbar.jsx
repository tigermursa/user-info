import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./SearchNavbar.css";
import { NavLink } from "react-bootstrap";
const SearchNavbar = () => {
  return (
    <div>
      <Navbar expand="lg" className=" bg-dark ps-0 pe-0 pe-md-5 ps-md-5">
        <Container fluid>
          <Navbar.Brand href="#" className="text-white fs-4 fw-bold">
            User Info
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="bg-body" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <li className="fw-bold navItem me-3 ms-4">Home </li>
              <li href="#" className="fw-bold navItem ">
                About
              </li>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default SearchNavbar;
