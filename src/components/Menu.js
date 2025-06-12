import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Menu(props) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">TWRL by React</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/booking">Booking</Nav.Link>
            <Nav.Link href="/mybooking">My Booking</Nav.Link>

            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item href="/management/rooms/">Room Management</NavDropdown.Item>
              <NavDropdown.Item href="/management/reservations">Reservations Management</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/management/users/">User Management</NavDropdown.Item>
              <NavDropdown.Item href="/logout/">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}

export default Menu;