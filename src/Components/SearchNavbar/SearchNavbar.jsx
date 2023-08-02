import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const SearchNavbar = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-dark ps-0 pe-0 pe-md-5 ps-md-5">
        <Container fluid>
          <Navbar.Brand href="#" className="text-white fs-4 fw-bold">
            User Info
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="bg-body" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#" className="fw-bold navItem me-3 text-white">
                Home
              </Nav.Link>
              <Nav.Link href="#" className="fw-bold navItem me-3 text-white">
                Info
              </Nav.Link>
              <Nav.Link href="#" className="fw-bold navItem me-3 text-white">
                Service
              </Nav.Link>
              <Nav.Link href="#" className="fw-bold navItem me-3 text-white">
                About us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default SearchNavbar;
