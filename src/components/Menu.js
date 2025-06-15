import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Fragment, useState} from "react";

function Menu(props) {
    const [token] = useState(localStorage.getItem('token'));
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">TWRL by React</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {token &&
                            <Fragment>
                                <Nav.Link href="/booking">Booking</Nav.Link>
                                <Nav.Link href="/reservations">My Booking</Nav.Link>

                                <NavDropdown title="Admin" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/management/rooms/">Room Management</NavDropdown.Item>
                                    <NavDropdown.Item href="/management/reservations">Reservations
                                        Management</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="/management/users/">User Management</NavDropdown.Item>
                                    <NavDropdown.Item href="/logout/">Logout</NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Link href="/logout">Logout</Nav.Link>
                            </Fragment>}

                        {!token && <Nav.Link href="/register">Register</Nav.Link>}
                        {!token && <Nav.Link href="/login">Login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;